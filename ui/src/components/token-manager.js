class TokenManager {
  /**
   * class constuctor
   * @param {Array} tokens
   * @param {TokenManager} oldTM
   */
  constructor(tokens, oldTM) { // manage the recreation from an old TM or with an array of tokens
    if (arguments.length == 1) { // new token manager
      this.currentID = 0; // univocal identifier
      this.tokens = tokens.map((t) => ({
        type: "token",
        start: t[0],
        end: t[1],
        text: t[2],
      }));
      this.initialTokens = this.tokens.slice(); // SHALLOW COPY
    } else { // in case an oldTM is available
      this.currentID = oldTM.currentID;
      this.tokens = oldTM.tokens
      this.initialTokens = oldTM.initialTokens;
    }
    this.latestAddedToken = null;
  }

  /**
   * Creates a new token block with the tokens whose indexes match the input
   * parameters
   *
   * @param {Number} start 'start' value of the token forming the start of the token block
   * @param {Number} end 'start' value of the token forming the end of the token block
   * @param {Number} _class the class to highlight
   * @param {Number} attrs array of attributes to set for the block that is going to be added
   * 
   * @returns {Object} the added token or null if indexes were invalid
   */
  addNewBlock(_start, _end, _class, attrs = null) {
    let start = _end < _start ? _end : _start;
    let end = _end > _start ? _end : _start;

    this.recursiveAddNewBlock(start, end, _class, this.tokens, attrs);

    return this.latestAddedToken;
  }
  recursiveAddNewBlock(start, end, _class, _tokens, attrs) {
    let selectedTokens = null;

    // livello 0: ci entra solo e sempre per _tokens=this.tokens
    if (Array.isArray(_tokens)) {
      selectedTokens = []
      // pusha tutti i TOKEN e TOKEN-BLOCK di livello 0 selezionati in selectedTokens con chiamate ricorsive sui figli
      for (let child of _tokens) {
        let selected = this.recursiveAddNewBlock(start, end, _class, child, attrs);
        if (selected !== null)
          selectedTokens.push(selected);
      }
      // se qualche TOKEN o TOKEN-BLOCK e' stato selezionato -->
      if (selectedTokens.length) {
        // prende start del primo token selezionato e trova l'indice a cui corrisponde tra i _tokens
        let first_token_start = selectedTokens[0].start;
        let first_index = _tokens.map(t => t.start).indexOf(first_token_start);

        // costruisce nuovo TOKEN-BLOCK coi selectedTokens
        let newTokenBlock = {
          type: "token-block",
          start: selectedTokens[0].start,
          end: selectedTokens[selectedTokens.length - 1].end,
          tokens: selectedTokens,
          label: _class.name,
          id: this.currentID,
          attrs: {},
          graph: _class.graph,
          relations: _class.relations,
          backgroundColor: _class.color,
          text: selectedTokens.map(tk => tk.text).join(' ').replace(/<br\/>/g, "")
        }
        for (const key of _class.attributes) {
          if (attrs && Object.keys(attrs).includes(key.name)) {
            newTokenBlock.attrs[key.name] = {
              'type': key.type,
              'value': [attrs[key.name]],
              'options': key.options
            };
            if (key.type === "multi") {
              newTokenBlock.attrs[key.name]['value'] = attrs[key.name].split(" ")
            }
          } else if (key.name === 'ID') {
            newTokenBlock.attrs[key.name] = {
              'type': key.type,
              'value': [_class.name + this.currentID.toString()],
              'options': []
            };
          } else {
            newTokenBlock.attrs[key.name] = {
              'type': key.type,
              'value': [""],
              'options': key.options
            };
          }
        }
        this.currentID += 1;
        // rimpiazzo ogni token selezionato col nuovo TOKEN-BLOCK (che li contiene)
        _tokens.splice(first_index, selectedTokens.length, newTokenBlock);
        this.latestAddedToken = newTokenBlock;
      }
    }
    // selezione INTERO TOKEN-BLOCK, se e' token-block non interamente selezionato entrera' nel 4o elseif
    else if (_tokens.type === "token-block" && _tokens.start >= start && _tokens.tokens.at(-1).start <= end) {
      return _tokens;
    }
    // selezione TOKEN
    else if (_tokens.type === "token" && _tokens.start + _tokens.text.length >= start && _tokens.start <= end) {
      return _tokens;
    }
    // scansione TOKEN dentro un TOKEN-BLOCK non interamente selezionato
    else if (Array.isArray(_tokens.tokens)) {
      // e' come al livello 0 ma applicato a _tokens.tokens
      selectedTokens = []
      for (let child of _tokens.tokens) {
        let selected = this.recursiveAddNewBlock(start, end, _class, child, attrs);
        if (selected !== null)
          selectedTokens.push(selected);
      }
      if (selectedTokens.length) {
        let first_token_start = selectedTokens[0].start;
        let first_index = _tokens.tokens.map(t => t.start).indexOf(first_token_start);

        let newTokenBlock = {
          type: "token-block",
          start: selectedTokens[0].start,
          end: selectedTokens[selectedTokens.length - 1].end,
          tokens: selectedTokens,
          label: _class.name,
          id: this.currentID,
          graph: _class.graph,
          relations: _class.relations,
          attrs: {},
          backgroundColor: _class.color,
          text: selectedTokens.map(tk => tk.text).join(' ').replace(/<br\/>/g, "")
        }
        for (const key of _class.attributes) {
          if (attrs && Object.keys(attrs).includes(key.name)) {
            newTokenBlock.attrs[key.name] = {
              'type': key.type,
              'value': [attrs[key.name]],
              'options': key.options
            };
            if (key.type === "multi") {
              newTokenBlock.attrs[key.name]['value'] = attrs[key.name].split(" ")
            }
          } else if (key.name === 'ID')
            newTokenBlock.attrs[key.name] = {
              'type': key.type,
              'value': [_class.name + this.currentID.toString()],
              'options': []
            };
          else
            newTokenBlock.attrs[key.name] = {
              'type': key.type,
              'value': [""],
              'options': key.options
            };
        }
        this.currentID += 1;
        _tokens.tokens.splice(first_index, selectedTokens.length, newTokenBlock);
        this.latestAddedToken = newTokenBlock;
      }
      // per evitare di far aggiungere TOKEN-BLOCK a livelli ricorsivi precedenti, comunico che i tokens sono stati
      // trasformati in token-blocks settando selectedTokens a null
      selectedTokens = null
    }
    // fin qua si puo' arrivare se:
    // 1) TOKEN non selezionato -> return null
    // 2) TOKEN-BLOCK non interamente selezionato  -> return null
    // 3) e' la chiamata di livello 0 (this.tokens) -> return [] ma viene ignorato
    return selectedTokens
  }

  /**
   * Removes a token block and puts back all the tokens in their original position
   *
   * @param {Number} blockId id of the token block to be removed
   */
  removeBlock(blockId) {
    this.recursiveRemoveBlock(blockId, this.tokens)
  }
  recursiveRemoveBlock(blockId, _tokens) {
    let selectedBlock = null;

    // LIVELLO 0
    if (Array.isArray(_tokens)) {
      for (let child of _tokens) {
        if (child.type === "token-block") { // per performance: verifica se sia 
          // un blocco da rimuovere o se ne 
          // contenga da rimuovere solo se e' un TOKEN-BLOCK
          let selected = this.recursiveRemoveBlock(blockId, child);
          if (selected !== null) {
            selectedBlock = selected;
            break; // si ferma se ha individuato il token-block da rimuovere
          }
        }
      }
      // se ha trovato a questo livello il BLOCK da rimuovere 
      if (selectedBlock !== null) {
        // ottiene inici per la rimozione
        let block_start = selectedBlock.start;
        let block_index = _tokens.map(t => t.start).indexOf(block_start);
        // salva i TOKENS e TOKEN-BLOCK contenuti in modo da aggiungerli singolarmente
        let tokens = selectedBlock.tokens;

        // rimuove il token block
        _tokens.splice(block_index, 1);
        // aggiunge i tokens interni, a livello 0 (quidni sovrascive tranquillamente this.tokens, visto che _tokens e' passato per valore)
        this.tokens = _tokens.slice(0, block_index).concat(tokens, _tokens.slice(block_index)); //(per performance)
        // ritorna null... verra' ignorato
        selectedBlock = null;
      }
    }
    // rimozione di questo TOKEN-BLOCK ad un certo livello innestato (>0) --> ritorna il BLOCK 
    // cosi' ai livelli richiamanti questo blocco puo' essere sostituito dai tokens interni se necessario
    else if (_tokens.type === "token-block" && _tokens.id == blockId) {
      return _tokens;
    }
    // se TOKEN-BLOCK non e' da rimuovere allora chiamata ricorsiva, come per LIVELLO 0 ma agendo sui .tokens
    else if (Array.isArray(_tokens.tokens)) {
      for (let child of _tokens.tokens) {
        if (child.type === "token-block") { //(per performance)
          let selected = this.recursiveRemoveBlock(blockId, child);
          if (selected !== null) {
            selectedBlock = selected;
            break;
          }
        }
      }
      if (selectedBlock !== null) {
        let block_start = selectedBlock.start;
        let block_index = _tokens.tokens.map(t => t.start).indexOf(block_start);
        let tokens = selectedBlock.tokens;

        //rimuovo il token block
        _tokens.tokens.splice(block_index, 1);
        //aggiungo i tokens
        _tokens.tokens = _tokens.tokens.slice(0, block_index).concat(tokens, _tokens.tokens.slice(block_index)); //(per performance)
        selectedBlock = null;
      }
    }
    // LIVELLO 0 ritorna null
    // LIVELLI innestati non da rimuovere ritornano null
    // su TOKEN non viene mai avviata la chiamata ricorsiva
    // TOCKEN-BLOCK da rimuovere ritorna prima di questa riga, nell'elseif di riga 182
    // e' importante ritornare null in modo che funzionino i controlli su selected
    return selectedBlock
  }

  /**
   * Removes all the token-blocks and leaves only tokens
   */
  resetBlocks() {
    this.tokens = this.initialTokens.slice();
  }


  findTokenBlock(token) {
    return this.recursiveFindTokenBlock(token, this.tokens);
  }
  recursiveFindTokenBlock(token, _tokens) {
    if (Array.isArray(_tokens)) {
      for (let t of _tokens) {
        if (t.type == "token-block") {
          if (t.id == token.id) {
            return t;
          } else if (Array.isArray(t.tokens)) {
            return this.recursiveFindTokenBlock(token, t.tokens);
          }
        }
      }
    }
    return null;
  }

  /**
   * 
   * @param {Object} token to update the attributes to
   * @returns true if updated corretly (token was present in the tm), false otherwise
   */
  updateBlockAttrs(token) {
    return this.recursiveReplaceTokenBlock(token, this.tokens);
  }
  recursiveReplaceTokenBlock(token, _tokens) {
    if (Array.isArray(_tokens)) {
      for (let t of _tokens) {
        if (t.type == "token-block") {
          if (t.id == token.id) {
            let token_start = t.start;
            let index = _tokens.map(t => t.start).indexOf(token_start);
            _tokens.splice(index, 1, token);
            return true;
          } else if (Array.isArray(t.tokens)) {
            return this.recursiveReplaceTokenBlock(token, t.tokens);
          }
        }
      }
    }
    return false;
  }

}

export default TokenManager;