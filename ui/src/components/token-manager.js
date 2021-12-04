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
      this.nextIdPerClass = {};
    } else { // in case an oldTM is available
      this.currentID = oldTM.currentID;
      this.tokens = oldTM.tokens
      this.initialTokens = oldTM.initialTokens;
      this.nextIdPerClass = oldTM.nextIdPerClass;
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
        if (child.start <= end && child.end >= start) {
          let selected = this.recursiveAddNewBlock(start, end, _class, child, attrs);
          if (selected !== null)
            selectedTokens.push(selected);
        }
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
          // use the attributes from parameter if available
          if (attrs && Object.keys(attrs).includes(key.name)) {
            if (key.name === 'ID')
              this.getNextIdPerClass(_class.name) // advance the counter and throw away
            newTokenBlock.attrs[key.name] = {
              'type': key.type,
              'value': [attrs[key.name].replace(/ +|,|\|/g, " ")],
              'options': key.options
            };
            if (key.type === "multi") {
              newTokenBlock.attrs[key.name]['value'] = attrs[key.name].split(/ +|,|\|/); //split by spaces or comma or pipe
            }
          }
          // in case this is a general attribute, it has to be specialized
          else if (attrs &&
            Object.keys(attrs).some((a) => key.name.includes(a + "_") &&
              attrs[key.name.charAt(0)].toLowerCase().includes(key.name.substr(2).toLowerCase()))) {
            // console.log(key.name + " -> ")
            // make sure this is the attribute key referring to the content of the attrs
            newTokenBlock.attrs[key.name] = {
              'type': key.type,
              'value': [attrs[key.name.charAt(0)].replace(/ +|,|\|/g, " ")],
              'options': key.options
            };
            if (key.type === "multi") {
              newTokenBlock.attrs[key.name]['value'] = attrs[key.name].split(/ +|,|\|/); //split by spaces or comma or pipe
            }
          }
          // otherwise initialize by hand
          else if (key.name === 'ID') {
            let tokenId = this.getNextIdPerClass(_class.name);
            newTokenBlock.attrs[key.name] = {
              'type': key.type,
              'value': [_class.name.charAt(0).toUpperCase() + _class.name.slice(1) + tokenId.toString()],
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
    else if (_tokens.type === "token-block" && _tokens.start >= start && _tokens.tokens.at(-1).start <= end &&
      !(_tokens.start == start && _tokens.tokens.at(-1).start == end)) {
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
        if (child.start <= end && child.end >= start) {
          let selected = this.recursiveAddNewBlock(start, end, _class, child, attrs);
          if (selected !== null)
            selectedTokens.push(selected);
        }
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
          // use the attributes from parameter if available
          if (attrs && Object.keys(attrs).includes(key.name)) {
            if (key.name === 'ID')
              this.getNextIdPerClass(_class.name) // advance the counter and throw away
            newTokenBlock.attrs[key.name] = {
              'type': key.type,
              'value': [attrs[key.name].replace(/ +|,|\|/g, " ")],
              'options': key.options
            };
            if (key.type === "multi") {
              newTokenBlock.attrs[key.name]['value'] = attrs[key.name].split(/ +|,|\|/); //split by spaces or comma or pipe
            }
          }
          // in case this is a general attribute, it has to be specialized
          else if (attrs &&
            Object.keys(attrs).some((a) => key.name.includes(a + "_") &&
              attrs[key.name.charAt(0)].toLowerCase().includes(key.name.substr(2).toLowerCase()))) {
            // console.log(key.name + " -> ")
            // make sure this is the attribute key referring to the content of the attrs
            newTokenBlock.attrs[key.name] = {
              'type': key.type,
              'value': [attrs[key.name.charAt(0)].replace(/ +|,|\|/g, " ")],
              'options': key.options
            };
            if (key.type === "multi") {
              newTokenBlock.attrs[key.name]['value'] = attrs[key.name].split(/ +|,|\|/); //split by spaces or comma or pipe
            }
          }
          // otherwise initialize by hand
          else if (key.name === 'ID') {
            let tokenId = this.getNextIdPerClass(_class.name);
            newTokenBlock.attrs[key.name] = {
              'type': key.type,
              'value': [_class.name.charAt(0).toUpperCase() + _class.name.slice(1) + tokenId.toString()],
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
  removeBlock(blockId, start, end) {
    this.recursiveRemoveBlock(blockId, start, end, this.tokens)
  }
  recursiveRemoveBlock(blockId, start, end, _tokens) {
    let selectedBlock = null;

    // LIVELLO 0
    if (Array.isArray(_tokens)) {
      for (let child of _tokens) {
        if (child.type === "token-block") { // per performance: verifica se sia 
          // un blocco da rimuovere o se ne 
          // contenga da rimuovere solo se e' un TOKEN-BLOCK
          if (child.start <= end && child.end >= start) {
            let selected = this.recursiveRemoveBlock(blockId, start, end, child);
            if (selected !== null) {
              selectedBlock = selected;
              break; // si ferma se ha individuato il token-block da rimuovere
            }
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
        // also remove the id from nextIdPerClass
        if (selectedBlock.attrs['ID']) {
          let id = -1;
          try {
            id = parseInt(selectedBlock.attrs['ID']['value'][0].match(/\d+$/)[0])
          } catch (e) {
            id = selectedBlock.attrs['ID']['value'][0].slice(-1).charCodeAt(0) - 64;
          }
          this.removeIdPerClass(selectedBlock.label, id);
        }
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
          if (child.start <= end && child.end >= start) {
            let selected = this.recursiveRemoveBlock(blockId, start, end, child);
            if (selected !== null) {
              selectedBlock = selected;
              break;
            }
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
        // also remove the id from nextIdPerClass
        if (selectedBlock.attrs['ID']) {
          let id = -1;
          try {
            id = parseInt(selectedBlock.attrs['ID']['value'][0].match(/\d+$/)[0])
          } catch (e) {
            id = selectedBlock.attrs['ID']['value'][0].slice(-1).charCodeAt(0) - 64;
          }
          this.removeIdPerClass(selectedBlock.label, id);
        }
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
    this.nextIdPerClass = {};
  }

  /**
   * 
   * @param {*} token 
   * @returns 
   */
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
          if (t.id.toString() == token.id.toString()) {
            let token_start = t.start;
            let index = _tokens.map(t => t.start).indexOf(token_start);
            _tokens.splice(index, 1, token);
            return true;
          } else if (Array.isArray(t.tokens)) {
            if (this.recursiveReplaceTokenBlock(token, t.tokens))
              return true
          }
        }
      }
    }
    return false;
  }

  /**
   * 
   * @param {*} _class 
   * @returns 
   */
  getNextIdPerClass(_class) {
    let ids = this.nextIdPerClass[_class]
    if (ids && ids.length) {
      let next = 0;
      for (; next < ids.length; next++) {
        if (ids[next] !== next + 1) { // if there's a hole (an id was removed)
          this.nextIdPerClass[_class].splice(next, 0, next + 1); // update the array
          return next + 1;
        } else if (next === ids.length - 1) {
          this.nextIdPerClass[_class].splice(next + 1, 0, next + 2); // update the array
          return next + 2;
        }
      }
    } else {
      this.nextIdPerClass[_class] = [1]; // initialize the array
      return 1;
    }
  }

  /**
   * 
   * @param {*} _class 
   * @param {*} id 
   */
  removeIdPerClass(_class, id) {
    let index = this.nextIdPerClass[_class].indexOf(id);
    if (index !== -1) {
      this.nextIdPerClass[_class].splice(index, 1);
    }
  }

  /**
   * 
   */
  adjustIDs() {
    // obtain list of all token-blocks
    let stack = [...this.tokens];
    let allTokens = [];
    while (stack.length) {
      let t = stack.pop()
      if (t.type === "token-block") {
        allTokens.push(t)
        stack.push(...t.tokens)
      }
    }

    // for each token-block
    for (let token of allTokens) {
      // for each attribute
      for (let attr_key of Object.keys(token.attrs)) {
        if (attr_key != "ID" && token.attrs[attr_key]["type"] == "string") {
          // for each value of the attribute (like "Claim1", "Claim2", ...)
          for (let value_attrs of token.attrs[attr_key]["value"][0].split(" ")) {
            // find the token with that ID
            let pointed_token = allTokens.find((a) => a.id != token.id && a.attrs["ID"] && a.attrs["ID"]["value"][0] == value_attrs);
            // and add the id to the attribute with the usual convention ID ID | id id
            if (pointed_token) {
              if (token.attrs[attr_key]["value"][0].includes(" | ")) {
                token.attrs[attr_key]["value"][0] = token.attrs[attr_key]["value"][0] + " " + pointed_token.id.toString();
              } else {
                token.attrs[attr_key]["value"][0] = token.attrs[attr_key]["value"][0] + " | " + pointed_token.id.toString();
              }
            }
          }
        }
      }
    }

  }

}

export default TokenManager;