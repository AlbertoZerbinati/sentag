class TokenManager {
  /**
   *
   * @param {Array} tokens
   */
  constructor(tokens) {
    this.tokens = tokens.map((t) => ({
      type: "token",
      start: t[0],
      end: t[1],
      text: t[2],
    }));
    this.words = tokens.map(t => t[2]);
    this.initialTokens = this.tokens.slice(); //SHALLOW COPY
  }

  /**
   * Creates a new token block with the tokens whose starts match the input
   * parameters
   *
   * @param {Number} start 'start' value of the token forming the start of the token block
   * @param {Number} end 'start' value of the token forming the end of the token block
   * @param {Number} _class the id of the class to highlight
   */
  addNewBlock(_start, _end, _class) {
    let start = _end < _start ? _end : _start;
    let end = _end > _start ? _end : _start;
    //console.log(start);
    //console.log(end);
    this.recursiveAddNewBlock(start, end, _class, this.tokens);
    //console.log(this.tokens)
  }
  recursiveAddNewBlock(start, end, _class, _tokens) {
    let selectedTokens = null;

    //livello 0: ci entra solo e sempre per _tokens=this.tokens
    if (Array.isArray(_tokens)) {
      selectedTokens = []
      //pusha tutti i TOKEN e TOKEN-BLOCK di livello 0 selezionati in selectedTokens con chiamate ricorsive sui figli
      for (let child of _tokens) {
        let selected = this.recursiveAddNewBlock(start, end, _class, child);
        if (selected !== null)
        selectedTokens.push(selected);
      }
      //se qualche TOKEN o TOKEN-BLOCK è stato selezionato -->
      if (selectedTokens.length) {
        //prendo start del primo token selezionato e trovo l'indice a cui corrisponde tra i _tokens
        let first_token_start = selectedTokens[0].start;
        let first_index = _tokens.map(t => t.start).indexOf(first_token_start);
        
        //costruisco nuovo TOKEN-BLOCK coi selectedTokens
        let newTokenBlock = {
          type: "token-block",
          start: selectedTokens[0].start,
          end: selectedTokens[selectedTokens.length - 1].end,
          tokens: selectedTokens,
          label: _class && _class.name ? _class.name : "Unlabelled",
          classId: _class && _class.id ? _class.id : 0,
          backgroundColor: _class && _class.color ? _class.color : null,
        }
        //rimpiazzo ogni token selezionato col nuovo TOKEN-BLOCK (che li contiene)
        _tokens.splice(first_index, selectedTokens.length, newTokenBlock);
      }
    } 
    // selezione INTERO TOKEN-BLOCK, se è token-block non interamente selezionato entrerà nel 4o elseif
    else if (_tokens.type === "token-block" && _tokens.start >= start && _tokens.end <= end) {
      //console.log(_tokens.start + " " + _tokens.end + " " + start + " " + end)
      if (start <= _tokens.start && end >= _tokens.end)
      return _tokens;
        //console.log("tokenblock")
    } 
    // selezione TOKEN
    else if (_tokens.type === "token" && _tokens.start >= start && _tokens.start <= end) {
      //console.log(_tokens.start + " " + _tokens.end + " " + start + " " + end)
      //console.log("token")
      return _tokens;
    } 
    // scansione TOKEN dentro un TOKEN-BLOCK non interamente selezionato
    else if (Array.isArray(_tokens.tokens)) {
      //è come al livello 0 ma applicato a _tokens.tokens
      selectedTokens = []
      for (let child of _tokens.tokens) {
        let selected = this.recursiveAddNewBlock(start, end, _class, child);
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
          label: _class && _class.name ? _class.name : "Unlabelled",
          classId: _class && _class.id ? _class.id : 0,
          backgroundColor: _class && _class.color ? _class.color : null,
        }
        _tokens.tokens.splice(first_index, selectedTokens.length, newTokenBlock);
        //per evitare di far aggiungere TOKEN-BLOCK a livelli ricorsivi precedenti, comunico che i tokens sono stati
        //trasformati in token-blocks settando selectedTokens a null
        selectedTokens = null
      }
    }
    //se selectedTokens = [] --> ritorna null (possibile con livelli successivi allo 0 se TOKEN-BLOCK senza TOKEN selezionati)
    if (selectedTokens !== null && !selectedTokens.length)
    selectedTokens = null

    // se TOKEN non selezionato --> return null 
    // se TOKEN-BLOCK non interamente selezionato e senza TOKEN interni selezionati
    // il valore ritornato da livello 0 (this.tokens) viene ignorato
    return selectedTokens
  }
  /**
   * Removes a token block and puts back all the tokens in their original position
   * problema performance RISOLTO
   *
   * @param {Number} blockStart 'start' value of the token block to remove
   * @param {Number} blockEnd 'end' value of the token block to remove
   */
  removeBlock(blockStart, blockEnd) {
    this.recursiveRemoveBlock(blockStart, blockEnd, this.tokens)
  }
  recursiveRemoveBlock(blockStart, blockEnd, _tokens) {
    let selectedBlock = null;

    // LIVELLO 0
    if (Array.isArray(_tokens)) {
      for (let child of _tokens) {
        if (child.type === "token-block") { //per performance: verifico se sia un blocco da rimuovere o se ne contenga solo se è un TOKEN-BLOCK
          let selected = this.recursiveRemoveBlock(blockStart, blockEnd, child);
          if (selected !== null) {
            selectedBlock = selected;
            break; //mi fermo se ho indiviuato il token-block da rimuovere
          }
        }
      }
      //se ho trovato a questo livello il BLOCK da rimuovere 
      if (selectedBlock !== null) {
        //ottengo inici per la rimozione
        let block_start = selectedBlock.start;
        let block_index = _tokens.map(t => t.start).indexOf(block_start);
        //mi salvo i TOKENS e TOKEN-BLOCK contenuti in modo da aggiungeri singolarmente
        let tokens = selectedBlock.tokens;

        //rimuovo il token block
        _tokens.splice(block_index, 1);
        //aggiungo i tokens interni, a livello 0 (quidni sovrascivo tranquillamente this.tokens, visto che _tokens è passato per valore)
        this.tokens = _tokens.slice(0, block_index).concat(tokens, _tokens.slice(block_index)); //(per performance)
        //ritorno null... verrà ignorato
        selectedBlock = null;
      }
    } 
    //rimozione di questo TOCKEN-BLOCK ad un certo livello innestato >0 --> ritorno il BLOCK così ai livelli richiamanti mi sostituiscono coi miei .tokens
    else if (_tokens.type === "token-block" && _tokens.start === blockStart && _tokens.end === blockEnd) {
      return _tokens;
    } 
    //se TOCKEN-BLOCK non è da rimuovere allora mi comporto ricorsivamente, come per LIVELLO 0 ma agendo sui .tokens
    else if (Array.isArray(_tokens.tokens)) {
      for (let child of _tokens.tokens) {
        if (child.type === "token-block") { //(per performance)
          let selected = this.recursiveRemoveBlock(blockStart, blockEnd, child);
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
    //LIVELLO 0 ritorna null
    //LIVELLI innestati non da rimuovere ritornano null
    //su TOCKEN non viene mai avviata la chiamata ricorsiva
    //TOCKEN-BLOCK selezionati ritornano prima di questa riga, nel loro elseif
    //è importante ritornare null in modo che funzionino i controlli su selected
    return selectedBlock
  }

  /**
   * Removes all the tag blocks and leaves only tokens
   */
  resetBlocks() {
    this.tokens = this.initialTokens.slice(); //SHALLOW COPY
  }

  /**
   * Exports the tokens and the token blocks as annotations
   */
  exportAsAnnotation() {
    let entities = [];
    for (let i = 0; i < this.tokens.length; i++) {
      if (this.tokens[i].type === "token-block") {
        let b = this.tokens[i];
        entities.push([b.start, b.end, b.label]);
      }
    }
    return entities;
  }
}

export default TokenManager;