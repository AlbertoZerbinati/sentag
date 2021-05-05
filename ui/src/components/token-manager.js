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
    console.log(start);
    console.log(end);
    this.recursiveAddNewBlock(start, end, _class, this.tokens);
    //console.log(this.tokens)
  }
  recursiveAddNewBlock(start, end, _class, _tokens) {
    let selectedTokens = null;

    if (Array.isArray(_tokens)) {
      selectedTokens = []
      for (let child of _tokens) {
        let selected = this.recursiveAddNewBlock(start, end, _class, child);
        if (selected !== null)
          selectedTokens.push(selected);
      }
      if (selectedTokens.length) {
        let first_token_start = selectedTokens[0].start;
        //let last_token_start = selectedTokens[selectedTokens.length - 1].start;
        //console.log(first_token_start);

        let first_index = _tokens.map(t => t.start).indexOf(first_token_start);
        //let last_index = selectedTokens.map(t => t.start).indexOf(last_token_start);
        //console.log(first_index);

        let newTokenBlock = {
          type: "token-block",
          start: selectedTokens[0].start,
          end: selectedTokens[selectedTokens.length - 1].end,
          tokens: selectedTokens,
          label: _class && _class.name ? _class.name : "Unlabelled",
          classId: _class && _class.id ? _class.id : 0,
          backgroundColor: _class && _class.color ? _class.color : null,
        }
        //console.log("da array")
        //console.log(selectedTokens);
        _tokens.splice(first_index, selectedTokens.length, newTokenBlock);
      }
    } else if (_tokens.type === "token-block" && _tokens.start >= start && _tokens.end <= end) {
      console.log(_tokens.start + " " + _tokens.end + " " + start + " " + end)
      if (start <= _tokens.start && end >= _tokens.end)
        console.log("tokenblock")
      return _tokens;
    } else if (_tokens.type === "token" && _tokens.start >= start && _tokens.start <= end) {
      console.log(_tokens.start + " " + _tokens.end + " " + start + " " + end)
      console.log("token")
      return _tokens;
    } else if (Array.isArray(_tokens.tokens)) {
      selectedTokens = []
      for (let child of _tokens.tokens) {
        let selected = this.recursiveAddNewBlock(start, end, _class, child);
        if (selected !== null)
          selectedTokens.push(selected);
      }
      if (selectedTokens.length) {
        let first_token_start = selectedTokens[0].start;
        //let last_token_start = selectedTokens[selectedTokens.length - 1].start;
        //console.log(first_token_start);

        let first_index = _tokens.tokens.map(t => t.start).indexOf(first_token_start);
        //let last_index = selectedTokens.map(t => t.start).indexOf(last_token_start);
        //console.log(first_index);

        let newTokenBlock = {
          type: "token-block",
          start: selectedTokens[0].start,
          end: selectedTokens[selectedTokens.length - 1].end,
          tokens: selectedTokens,
          label: _class && _class.name ? _class.name : "Unlabelled",
          classId: _class && _class.id ? _class.id : 0,
          backgroundColor: _class && _class.color ? _class.color : null,
        }
        console.log("da token block")
        console.log(selectedTokens);
        _tokens.tokens.splice(first_index, selectedTokens.length, newTokenBlock);
        selectedTokens = null
      }
    }
    if (selectedTokens !== null && !selectedTokens.length)
      selectedTokens = null
    return selectedTokens
  }
  /**
   * Removes a token block and puts back all the tokens in their original position
   *
   * @param {Number} blockStart 'start' value of the token block to remove
   * @param {Number} blockEnd 'end' value of the token block to remove
   */
  removeBlock(blockStart, blockEnd) {
    this.recursiveRemoveBlock(blockStart, blockEnd, this.tokens)
  }
  recursiveRemoveBlock(blockStart, blockEnd, _tokens) {
    let selectedBlock = null;

    if (Array.isArray(_tokens)) {
      console.log("array")
      for (let child of _tokens) {
        let selected = this.recursiveRemoveBlock(blockStart, blockEnd, child);
        if (selected !== null) {
          selectedBlock = selected;
          break;
        }
      }
      if (selectedBlock !== null) {
        let block_start = selectedBlock.start;
        //let last_token_start = selectedTokens[selectedTokens.length - 1].start;
        //console.log(first_token_start);

        let block_index = _tokens.map(t => t.start).indexOf(block_start);
        //let last_index = selectedTokens.map(t => t.start).indexOf(last_token_start);
        //console.log(first_index);
        let l = selectedBlock.tokens.length;
        let tokens = selectedBlock.tokens;

        //rimuovo il token block
        _tokens.splice(block_index, 1);
        //   //aggiungo i tokens (partendo dall'ultimo)
        for (let j = l - 1; j >= 0; j--) {
          _tokens.splice(block_index, 0, tokens[j]);
        }
        selectedBlock = null;
        console.log("da array")
        //console.log(_tokens);
      }
    } else if (_tokens.type === "token-block" && _tokens.start === blockStart && _tokens.end === blockEnd) {
      console.log("t")
      return _tokens;
    } else if (Array.isArray(_tokens.tokens)) {
      console.log("token-block")
      for (let child of _tokens.tokens) {
        let selected = this.recursiveRemoveBlock(blockStart, blockEnd, child);
        if (selected !== null) {
          selectedBlock = selected;
          break;
        }
      }
      if (selectedBlock !== null) {
        let block_start = selectedBlock.start;
        //let last_token_start = selectedTokens[selectedTokens.length - 1].start;
        //console.log(first_token_start);

        let block_index = _tokens.tokens.map(t => t.start).indexOf(block_start);
        //let last_index = selectedTokens.map(t => t.start).indexOf(last_token_start);
        //console.log(first_index);
        let l = selectedBlock.tokens.length;
        let tokens = selectedBlock.tokens;

        //rimuovo il token block
        _tokens.tokens.splice(block_index, 1);
        //   //aggiungo i tokens (partendo dall'ultimo)
        for (let j = l - 1; j >= 0; j--) {
          _tokens.tokens.splice(block_index, 0, tokens[j]);
        }
        selectedBlock = null;
        console.log("da token block")
        //console.log(_tokens);
      }
    }

    return selectedBlock
  }

  /**
   * Removes all the tag blocks and leaves only tokens
   */
  resetBlocks() {
    let newTokens = [];
    for (let i = 0; i < this.tokens.length; i++) {
      if (this.tokens[i].type === "token") {
        newTokens.push(this.tokens[i]);
      } else {
        newTokens.push(...this.tokens[i].tokens);
      }
    }
    this.tokens = newTokens;
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