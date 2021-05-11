webpackHotUpdate("app",{

/***/ "./src/components/token-manager.js":
/*!*****************************************!*\
  !*** ./src/components/token-manager.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.concat */ \"./node_modules/core-js/modules/es.array.concat.js\");\n/* harmony import */ var core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var core_js_modules_es_array_index_of__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.index-of */ \"./node_modules/core-js/modules/es.array.index-of.js\");\n/* harmony import */ var core_js_modules_es_array_index_of__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_index_of__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var core_js_modules_es_array_map__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.map */ \"./node_modules/core-js/modules/es.array.map.js\");\n/* harmony import */ var core_js_modules_es_array_map__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_map__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var core_js_modules_es_array_slice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.slice */ \"./node_modules/core-js/modules/es.array.slice.js\");\n/* harmony import */ var core_js_modules_es_array_slice__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_slice__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var core_js_modules_es_array_splice__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.array.splice */ \"./node_modules/core-js/modules/es.array.splice.js\");\n/* harmony import */ var core_js_modules_es_array_splice__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_splice__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.function.name */ \"./node_modules/core-js/modules/es.function.name.js\");\n/* harmony import */ var core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _home_zerbi_Documents_III_anno_tesi_sentag_ui_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper */ \"./node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper.js\");\n/* harmony import */ var _home_zerbi_Documents_III_anno_tesi_sentag_ui_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/classCallCheck */ \"./node_modules/@babel/runtime/helpers/esm/classCallCheck.js\");\n/* harmony import */ var _home_zerbi_Documents_III_anno_tesi_sentag_ui_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createClass */ \"./node_modules/@babel/runtime/helpers/esm/createClass.js\");\n\n\n\n\n\n\n\n\n\n\nvar TokenManager = /*#__PURE__*/function () {\n  /**\n   *\n   * @param {Array} tokens\n   */\n  function TokenManager(tokens) {\n    Object(_home_zerbi_Documents_III_anno_tesi_sentag_ui_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_7__[\"default\"])(this, TokenManager);\n\n    this.currentID = 0;\n    this.tokens = tokens.map(function (t) {\n      return {\n        type: \"token\",\n        start: t[0],\n        end: t[1],\n        text: t[2]\n      };\n    });\n    this.words = tokens.map(function (t) {\n      return t[2];\n    });\n    this.initialTokens = this.tokens.slice(); //SHALLOW COPY\n  }\n  /**\n   * Creates a new token block with the tokens whose starts match the input\n   * parameters\n   *\n   * @param {Number} start 'start' value of the token forming the start of the token block\n   * @param {Number} end 'start' value of the token forming the end of the token block\n   * @param {Number} _class the id of the class to highlight\n   */\n\n\n  Object(_home_zerbi_Documents_III_anno_tesi_sentag_ui_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_8__[\"default\"])(TokenManager, [{\n    key: \"addNewBlock\",\n    value: function addNewBlock(_start, _end, _class) {\n      var start = _end < _start ? _end : _start;\n      var end = _end > _start ? _end : _start; //console.log(start);\n      //console.log(end);\n\n      this.recursiveAddNewBlock(start, end, _class, this.tokens); //console.log(this.tokens)\n    }\n  }, {\n    key: \"recursiveAddNewBlock\",\n    value: function recursiveAddNewBlock(start, end, _class, _tokens) {\n      var selectedTokens = null; //livello 0: ci entra solo e sempre per _tokens=this.tokens\n\n      if (Array.isArray(_tokens)) {\n        selectedTokens = []; //pusha tutti i TOKEN e TOKEN-BLOCK di livello 0 selezionati in selectedTokens con chiamate ricorsive sui figli\n\n        var _iterator = Object(_home_zerbi_Documents_III_anno_tesi_sentag_ui_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(_tokens),\n            _step;\n\n        try {\n          for (_iterator.s(); !(_step = _iterator.n()).done;) {\n            var child = _step.value;\n            var selected = this.recursiveAddNewBlock(start, end, _class, child);\n            if (selected !== null) selectedTokens.push(selected);\n          } //se qualche TOKEN o TOKEN-BLOCK è stato selezionato -->\n\n        } catch (err) {\n          _iterator.e(err);\n        } finally {\n          _iterator.f();\n        }\n\n        if (selectedTokens.length) {\n          //prendo start del primo token selezionato e trovo l'indice a cui corrisponde tra i _tokens\n          var first_token_start = selectedTokens[0].start;\n\n          var first_index = _tokens.map(function (t) {\n            return t.start;\n          }).indexOf(first_token_start); //costruisco nuovo TOKEN-BLOCK coi selectedTokens\n\n\n          var newTokenBlock = {\n            type: \"token-block\",\n            start: selectedTokens[0].start,\n            end: selectedTokens[selectedTokens.length - 1].end,\n            tokens: selectedTokens,\n            label: _class && _class.name ? _class.name : \"Unlabelled\",\n            classId: _class && _class.id ? _class.id : 0,\n            id: this.currentID,\n            backgroundColor: _class && _class.color ? _class.color : null\n          };\n          this.currentID += 1; //rimpiazzo ogni token selezionato col nuovo TOKEN-BLOCK (che li contiene)\n\n          _tokens.splice(first_index, selectedTokens.length, newTokenBlock);\n        }\n      } // selezione INTERO TOKEN-BLOCK, se è token-block non interamente selezionato entrerà nel 4o elseif\n      else if (_tokens.type === \"token-block\" && _tokens.start >= start && _tokens.end <= end) {\n          //console.log(_tokens.start + \" \" + _tokens.end + \" \" + start + \" \" + end)\n          if (start <= _tokens.start && end >= _tokens.end) return _tokens; //console.log(\"tokenblock\")\n        } // selezione TOKEN\n        else if (_tokens.type === \"token\" && _tokens.start >= start && _tokens.start <= end) {\n            //console.log(_tokens.start + \" \" + _tokens.end + \" \" + start + \" \" + end)\n            //console.log(\"token\")\n            return _tokens;\n          } // scansione TOKEN dentro un TOKEN-BLOCK non interamente selezionato\n          else if (Array.isArray(_tokens.tokens)) {\n              //è come al livello 0 ma applicato a _tokens.tokens\n              selectedTokens = [];\n\n              var _iterator2 = Object(_home_zerbi_Documents_III_anno_tesi_sentag_ui_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(_tokens.tokens),\n                  _step2;\n\n              try {\n                for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {\n                  var _child = _step2.value;\n\n                  var _selected = this.recursiveAddNewBlock(start, end, _class, _child);\n\n                  if (_selected !== null) selectedTokens.push(_selected);\n                }\n              } catch (err) {\n                _iterator2.e(err);\n              } finally {\n                _iterator2.f();\n              }\n\n              if (selectedTokens.length) {\n                var _first_token_start = selectedTokens[0].start;\n\n                var _first_index = _tokens.tokens.map(function (t) {\n                  return t.start;\n                }).indexOf(_first_token_start);\n\n                var _newTokenBlock = {\n                  type: \"token-block\",\n                  start: selectedTokens[0].start,\n                  end: selectedTokens[selectedTokens.length - 1].end,\n                  tokens: selectedTokens,\n                  label: _class && _class.name ? _class.name : \"Unlabelled\",\n                  classId: _class && _class.id ? _class.id : 0,\n                  id: this.currentID,\n                  backgroundColor: _class && _class.color ? _class.color : null\n                };\n                this.currentID += 1;\n\n                _tokens.tokens.splice(_first_index, selectedTokens.length, _newTokenBlock); //per evitare di far aggiungere TOKEN-BLOCK a livelli ricorsivi precedenti, comunico che i tokens sono stati\n                //trasformati in token-blocks settando selectedTokens a null\n\n\n                selectedTokens = null;\n              }\n            } //se selectedTokens = [] --> ritorna null (possibile con livelli successivi allo 0 se TOKEN-BLOCK senza TOKEN selezionati)\n\n\n      if (selectedTokens !== null && !selectedTokens.length) selectedTokens = null; // se TOKEN non selezionato --> return null \n      // se TOKEN-BLOCK non interamente selezionato e senza TOKEN interni selezionati\n      // il valore ritornato da livello 0 (this.tokens) viene ignorato\n\n      return selectedTokens;\n    }\n    /**\n     * Removes a token block and puts back all the tokens in their original position\n     * problema performance RISOLTO\n     *\n     * @param {Number} blockStart 'start' value of the token block to remove\n     * @param {Number} blockEnd 'end' value of the token block to remove\n     */\n\n  }, {\n    key: \"removeBlock\",\n    value: function removeBlock(blockStart, blockEnd) {\n      this.recursiveRemoveBlock(blockStart, blockEnd, this.tokens);\n    }\n  }, {\n    key: \"recursiveRemoveBlock\",\n    value: function recursiveRemoveBlock(blockStart, blockEnd, _tokens) {\n      var selectedBlock = null; // LIVELLO 0\n\n      if (Array.isArray(_tokens)) {\n        var _iterator3 = Object(_home_zerbi_Documents_III_anno_tesi_sentag_ui_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(_tokens),\n            _step3;\n\n        try {\n          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {\n            var child = _step3.value;\n\n            if (child.type === \"token-block\") {\n              //per performance: verifico se sia un blocco da rimuovere o se ne contenga solo se è un TOKEN-BLOCK\n              var selected = this.recursiveRemoveBlock(blockStart, blockEnd, child);\n\n              if (selected !== null) {\n                selectedBlock = selected;\n                break; //mi fermo se ho indiviuato il token-block da rimuovere\n              }\n            }\n          } //se ho trovato a questo livello il BLOCK da rimuovere \n\n        } catch (err) {\n          _iterator3.e(err);\n        } finally {\n          _iterator3.f();\n        }\n\n        if (selectedBlock !== null) {\n          //ottengo inici per la rimozione\n          var block_start = selectedBlock.start;\n\n          var block_index = _tokens.map(function (t) {\n            return t.start;\n          }).indexOf(block_start); //mi salvo i TOKENS e TOKEN-BLOCK contenuti in modo da aggiungeri singolarmente\n\n\n          var tokens = selectedBlock.tokens; //rimuovo il token block\n\n          _tokens.splice(block_index, 1); //aggiungo i tokens interni, a livello 0 (quidni sovrascivo tranquillamente this.tokens, visto che _tokens è passato per valore)\n\n\n          this.tokens = _tokens.slice(0, block_index).concat(tokens, _tokens.slice(block_index)); //(per performance)\n          //ritorno null... verrà ignorato\n\n          selectedBlock = null;\n        }\n      } //rimozione di questo TOCKEN-BLOCK ad un certo livello innestato >0 --> ritorno il BLOCK così ai livelli richiamanti mi sostituiscono coi miei .tokens\n      else if (_tokens.type === \"token-block\" && _tokens.start === blockStart && _tokens.end === blockEnd) {\n          return _tokens;\n        } //se TOCKEN-BLOCK non è da rimuovere allora mi comporto ricorsivamente, come per LIVELLO 0 ma agendo sui .tokens\n        else if (Array.isArray(_tokens.tokens)) {\n            var _iterator4 = Object(_home_zerbi_Documents_III_anno_tesi_sentag_ui_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(_tokens.tokens),\n                _step4;\n\n            try {\n              for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {\n                var _child2 = _step4.value;\n\n                if (_child2.type === \"token-block\") {\n                  //(per performance)\n                  var _selected2 = this.recursiveRemoveBlock(blockStart, blockEnd, _child2);\n\n                  if (_selected2 !== null) {\n                    selectedBlock = _selected2;\n                    break;\n                  }\n                }\n              }\n            } catch (err) {\n              _iterator4.e(err);\n            } finally {\n              _iterator4.f();\n            }\n\n            if (selectedBlock !== null) {\n              var _block_start = selectedBlock.start;\n\n              var _block_index = _tokens.tokens.map(function (t) {\n                return t.start;\n              }).indexOf(_block_start);\n\n              var _tokens2 = selectedBlock.tokens; //rimuovo il token block\n\n              _tokens.tokens.splice(_block_index, 1); //aggiungo i tokens\n\n\n              _tokens.tokens = _tokens.tokens.slice(0, _block_index).concat(_tokens2, _tokens.tokens.slice(_block_index)); //(per performance)\n\n              selectedBlock = null;\n            }\n          } //LIVELLO 0 ritorna null\n      //LIVELLI innestati non da rimuovere ritornano null\n      //su TOCKEN non viene mai avviata la chiamata ricorsiva\n      //TOCKEN-BLOCK selezionati ritornano prima di questa riga, nel loro elseif\n      //è importante ritornare null in modo che funzionino i controlli su selected\n\n\n      return selectedBlock;\n    }\n    /**\n     * Removes all the tag blocks and leaves only tokens\n     */\n\n  }, {\n    key: \"resetBlocks\",\n    value: function resetBlocks() {\n      this.tokens = this.initialTokens.slice(); //SHALLOW COPY\n    }\n    /**\n     * Exports the tokens and the token blocks as annotations\n     */\n\n  }, {\n    key: \"exportAsAnnotation\",\n    value: function exportAsAnnotation() {\n      var entities = [];\n\n      for (var i = 0; i < this.tokens.length; i++) {\n        if (this.tokens[i].type === \"token-block\") {\n          var b = this.tokens[i];\n          entities.push([b.start, b.end, b.label]);\n        }\n      }\n\n      return entities;\n    }\n  }]);\n\n  return TokenManager;\n}();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (TokenManager);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy90b2tlbi1tYW5hZ2VyLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvdG9rZW4tbWFuYWdlci5qcz80N2E3Il0sInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFRva2VuTWFuYWdlciB7XG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge0FycmF5fSB0b2tlbnNcbiAgICovXG4gIGNvbnN0cnVjdG9yKHRva2Vucykge1xuICAgIHRoaXMuY3VycmVudElEID0gMDtcbiAgICB0aGlzLnRva2VucyA9IHRva2Vucy5tYXAoKHQpID0+ICh7XG4gICAgICB0eXBlOiBcInRva2VuXCIsXG4gICAgICBzdGFydDogdFswXSxcbiAgICAgIGVuZDogdFsxXSxcbiAgICAgIHRleHQ6IHRbMl0sXG4gICAgfSkpO1xuICAgIHRoaXMud29yZHMgPSB0b2tlbnMubWFwKHQgPT4gdFsyXSk7XG4gICAgdGhpcy5pbml0aWFsVG9rZW5zID0gdGhpcy50b2tlbnMuc2xpY2UoKTsgLy9TSEFMTE9XIENPUFlcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IHRva2VuIGJsb2NrIHdpdGggdGhlIHRva2VucyB3aG9zZSBzdGFydHMgbWF0Y2ggdGhlIGlucHV0XG4gICAqIHBhcmFtZXRlcnNcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHN0YXJ0ICdzdGFydCcgdmFsdWUgb2YgdGhlIHRva2VuIGZvcm1pbmcgdGhlIHN0YXJ0IG9mIHRoZSB0b2tlbiBibG9ja1xuICAgKiBAcGFyYW0ge051bWJlcn0gZW5kICdzdGFydCcgdmFsdWUgb2YgdGhlIHRva2VuIGZvcm1pbmcgdGhlIGVuZCBvZiB0aGUgdG9rZW4gYmxvY2tcbiAgICogQHBhcmFtIHtOdW1iZXJ9IF9jbGFzcyB0aGUgaWQgb2YgdGhlIGNsYXNzIHRvIGhpZ2hsaWdodFxuICAgKi9cbiAgYWRkTmV3QmxvY2soX3N0YXJ0LCBfZW5kLCBfY2xhc3MpIHtcbiAgICBsZXQgc3RhcnQgPSBfZW5kIDwgX3N0YXJ0ID8gX2VuZCA6IF9zdGFydDtcbiAgICBsZXQgZW5kID0gX2VuZCA+IF9zdGFydCA/IF9lbmQgOiBfc3RhcnQ7XG4gICAgLy9jb25zb2xlLmxvZyhzdGFydCk7XG4gICAgLy9jb25zb2xlLmxvZyhlbmQpO1xuICAgIHRoaXMucmVjdXJzaXZlQWRkTmV3QmxvY2soc3RhcnQsIGVuZCwgX2NsYXNzLCB0aGlzLnRva2Vucyk7XG4gICAgLy9jb25zb2xlLmxvZyh0aGlzLnRva2VucylcbiAgfVxuICByZWN1cnNpdmVBZGROZXdCbG9jayhzdGFydCwgZW5kLCBfY2xhc3MsIF90b2tlbnMpIHtcbiAgICBsZXQgc2VsZWN0ZWRUb2tlbnMgPSBudWxsO1xuXG4gICAgLy9saXZlbGxvIDA6IGNpIGVudHJhIHNvbG8gZSBzZW1wcmUgcGVyIF90b2tlbnM9dGhpcy50b2tlbnNcbiAgICBpZiAoQXJyYXkuaXNBcnJheShfdG9rZW5zKSkge1xuICAgICAgc2VsZWN0ZWRUb2tlbnMgPSBbXVxuICAgICAgLy9wdXNoYSB0dXR0aSBpIFRPS0VOIGUgVE9LRU4tQkxPQ0sgZGkgbGl2ZWxsbyAwIHNlbGV6aW9uYXRpIGluIHNlbGVjdGVkVG9rZW5zIGNvbiBjaGlhbWF0ZSByaWNvcnNpdmUgc3VpIGZpZ2xpXG4gICAgICBmb3IgKGxldCBjaGlsZCBvZiBfdG9rZW5zKSB7XG4gICAgICAgIGxldCBzZWxlY3RlZCA9IHRoaXMucmVjdXJzaXZlQWRkTmV3QmxvY2soc3RhcnQsIGVuZCwgX2NsYXNzLCBjaGlsZCk7XG4gICAgICAgIGlmIChzZWxlY3RlZCAhPT0gbnVsbClcbiAgICAgICAgc2VsZWN0ZWRUb2tlbnMucHVzaChzZWxlY3RlZCk7XG4gICAgICB9XG4gICAgICAvL3NlIHF1YWxjaGUgVE9LRU4gbyBUT0tFTi1CTE9DSyDDqCBzdGF0byBzZWxlemlvbmF0byAtLT5cbiAgICAgIGlmIChzZWxlY3RlZFRva2Vucy5sZW5ndGgpIHtcbiAgICAgICAgLy9wcmVuZG8gc3RhcnQgZGVsIHByaW1vIHRva2VuIHNlbGV6aW9uYXRvIGUgdHJvdm8gbCdpbmRpY2UgYSBjdWkgY29ycmlzcG9uZGUgdHJhIGkgX3Rva2Vuc1xuICAgICAgICBsZXQgZmlyc3RfdG9rZW5fc3RhcnQgPSBzZWxlY3RlZFRva2Vuc1swXS5zdGFydDtcbiAgICAgICAgbGV0IGZpcnN0X2luZGV4ID0gX3Rva2Vucy5tYXAodCA9PiB0LnN0YXJ0KS5pbmRleE9mKGZpcnN0X3Rva2VuX3N0YXJ0KTtcbiAgICAgICAgXG4gICAgICAgIC8vY29zdHJ1aXNjbyBudW92byBUT0tFTi1CTE9DSyBjb2kgc2VsZWN0ZWRUb2tlbnNcbiAgICAgICAgbGV0IG5ld1Rva2VuQmxvY2sgPSB7XG4gICAgICAgICAgdHlwZTogXCJ0b2tlbi1ibG9ja1wiLFxuICAgICAgICAgIHN0YXJ0OiBzZWxlY3RlZFRva2Vuc1swXS5zdGFydCxcbiAgICAgICAgICBlbmQ6IHNlbGVjdGVkVG9rZW5zW3NlbGVjdGVkVG9rZW5zLmxlbmd0aCAtIDFdLmVuZCxcbiAgICAgICAgICB0b2tlbnM6IHNlbGVjdGVkVG9rZW5zLFxuICAgICAgICAgIGxhYmVsOiBfY2xhc3MgJiYgX2NsYXNzLm5hbWUgPyBfY2xhc3MubmFtZSA6IFwiVW5sYWJlbGxlZFwiLFxuICAgICAgICAgIGNsYXNzSWQ6IF9jbGFzcyAmJiBfY2xhc3MuaWQgPyBfY2xhc3MuaWQgOiAwLFxuICAgICAgICAgIGlkOnRoaXMuY3VycmVudElELFxuICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogX2NsYXNzICYmIF9jbGFzcy5jb2xvciA/IF9jbGFzcy5jb2xvciA6IG51bGwsXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jdXJyZW50SUQgKz0gMTtcbiAgICAgICAgLy9yaW1waWF6em8gb2duaSB0b2tlbiBzZWxlemlvbmF0byBjb2wgbnVvdm8gVE9LRU4tQkxPQ0sgKGNoZSBsaSBjb250aWVuZSlcbiAgICAgICAgX3Rva2Vucy5zcGxpY2UoZmlyc3RfaW5kZXgsIHNlbGVjdGVkVG9rZW5zLmxlbmd0aCwgbmV3VG9rZW5CbG9jayk7XG4gICAgICB9XG4gICAgfSBcbiAgICAvLyBzZWxlemlvbmUgSU5URVJPIFRPS0VOLUJMT0NLLCBzZSDDqCB0b2tlbi1ibG9jayBub24gaW50ZXJhbWVudGUgc2VsZXppb25hdG8gZW50cmVyw6AgbmVsIDRvIGVsc2VpZlxuICAgIGVsc2UgaWYgKF90b2tlbnMudHlwZSA9PT0gXCJ0b2tlbi1ibG9ja1wiICYmIF90b2tlbnMuc3RhcnQgPj0gc3RhcnQgJiYgX3Rva2Vucy5lbmQgPD0gZW5kKSB7XG4gICAgICAvL2NvbnNvbGUubG9nKF90b2tlbnMuc3RhcnQgKyBcIiBcIiArIF90b2tlbnMuZW5kICsgXCIgXCIgKyBzdGFydCArIFwiIFwiICsgZW5kKVxuICAgICAgaWYgKHN0YXJ0IDw9IF90b2tlbnMuc3RhcnQgJiYgZW5kID49IF90b2tlbnMuZW5kKVxuICAgICAgcmV0dXJuIF90b2tlbnM7XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJ0b2tlbmJsb2NrXCIpXG4gICAgfSBcbiAgICAvLyBzZWxlemlvbmUgVE9LRU5cbiAgICBlbHNlIGlmIChfdG9rZW5zLnR5cGUgPT09IFwidG9rZW5cIiAmJiBfdG9rZW5zLnN0YXJ0ID49IHN0YXJ0ICYmIF90b2tlbnMuc3RhcnQgPD0gZW5kKSB7XG4gICAgICAvL2NvbnNvbGUubG9nKF90b2tlbnMuc3RhcnQgKyBcIiBcIiArIF90b2tlbnMuZW5kICsgXCIgXCIgKyBzdGFydCArIFwiIFwiICsgZW5kKVxuICAgICAgLy9jb25zb2xlLmxvZyhcInRva2VuXCIpXG4gICAgICByZXR1cm4gX3Rva2VucztcbiAgICB9IFxuICAgIC8vIHNjYW5zaW9uZSBUT0tFTiBkZW50cm8gdW4gVE9LRU4tQkxPQ0sgbm9uIGludGVyYW1lbnRlIHNlbGV6aW9uYXRvXG4gICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheShfdG9rZW5zLnRva2VucykpIHtcbiAgICAgIC8vw6ggY29tZSBhbCBsaXZlbGxvIDAgbWEgYXBwbGljYXRvIGEgX3Rva2Vucy50b2tlbnNcbiAgICAgIHNlbGVjdGVkVG9rZW5zID0gW11cbiAgICAgIGZvciAobGV0IGNoaWxkIG9mIF90b2tlbnMudG9rZW5zKSB7XG4gICAgICAgIGxldCBzZWxlY3RlZCA9IHRoaXMucmVjdXJzaXZlQWRkTmV3QmxvY2soc3RhcnQsIGVuZCwgX2NsYXNzLCBjaGlsZCk7XG4gICAgICAgIGlmIChzZWxlY3RlZCAhPT0gbnVsbClcbiAgICAgICAgc2VsZWN0ZWRUb2tlbnMucHVzaChzZWxlY3RlZCk7XG4gICAgICB9XG4gICAgICBpZiAoc2VsZWN0ZWRUb2tlbnMubGVuZ3RoKSB7XG4gICAgICAgIGxldCBmaXJzdF90b2tlbl9zdGFydCA9IHNlbGVjdGVkVG9rZW5zWzBdLnN0YXJ0O1xuICAgICAgICBsZXQgZmlyc3RfaW5kZXggPSBfdG9rZW5zLnRva2Vucy5tYXAodCA9PiB0LnN0YXJ0KS5pbmRleE9mKGZpcnN0X3Rva2VuX3N0YXJ0KTtcblxuICAgICAgICBsZXQgbmV3VG9rZW5CbG9jayA9IHtcbiAgICAgICAgICB0eXBlOiBcInRva2VuLWJsb2NrXCIsXG4gICAgICAgICAgc3RhcnQ6IHNlbGVjdGVkVG9rZW5zWzBdLnN0YXJ0LFxuICAgICAgICAgIGVuZDogc2VsZWN0ZWRUb2tlbnNbc2VsZWN0ZWRUb2tlbnMubGVuZ3RoIC0gMV0uZW5kLFxuICAgICAgICAgIHRva2Vuczogc2VsZWN0ZWRUb2tlbnMsXG4gICAgICAgICAgbGFiZWw6IF9jbGFzcyAmJiBfY2xhc3MubmFtZSA/IF9jbGFzcy5uYW1lIDogXCJVbmxhYmVsbGVkXCIsXG4gICAgICAgICAgY2xhc3NJZDogX2NsYXNzICYmIF9jbGFzcy5pZCA/IF9jbGFzcy5pZCA6IDAsXG4gICAgICAgICAgaWQ6dGhpcy5jdXJyZW50SUQsXG4gICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBfY2xhc3MgJiYgX2NsYXNzLmNvbG9yID8gX2NsYXNzLmNvbG9yIDogbnVsbCxcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmN1cnJlbnRJRCArPSAxO1xuICAgICAgICBfdG9rZW5zLnRva2Vucy5zcGxpY2UoZmlyc3RfaW5kZXgsIHNlbGVjdGVkVG9rZW5zLmxlbmd0aCwgbmV3VG9rZW5CbG9jayk7XG4gICAgICAgIC8vcGVyIGV2aXRhcmUgZGkgZmFyIGFnZ2l1bmdlcmUgVE9LRU4tQkxPQ0sgYSBsaXZlbGxpIHJpY29yc2l2aSBwcmVjZWRlbnRpLCBjb211bmljbyBjaGUgaSB0b2tlbnMgc29ubyBzdGF0aVxuICAgICAgICAvL3RyYXNmb3JtYXRpIGluIHRva2VuLWJsb2NrcyBzZXR0YW5kbyBzZWxlY3RlZFRva2VucyBhIG51bGxcbiAgICAgICAgc2VsZWN0ZWRUb2tlbnMgPSBudWxsXG4gICAgICB9XG4gICAgfVxuICAgIC8vc2Ugc2VsZWN0ZWRUb2tlbnMgPSBbXSAtLT4gcml0b3JuYSBudWxsIChwb3NzaWJpbGUgY29uIGxpdmVsbGkgc3VjY2Vzc2l2aSBhbGxvIDAgc2UgVE9LRU4tQkxPQ0sgc2VuemEgVE9LRU4gc2VsZXppb25hdGkpXG4gICAgaWYgKHNlbGVjdGVkVG9rZW5zICE9PSBudWxsICYmICFzZWxlY3RlZFRva2Vucy5sZW5ndGgpXG4gICAgc2VsZWN0ZWRUb2tlbnMgPSBudWxsXG5cbiAgICAvLyBzZSBUT0tFTiBub24gc2VsZXppb25hdG8gLS0+IHJldHVybiBudWxsIFxuICAgIC8vIHNlIFRPS0VOLUJMT0NLIG5vbiBpbnRlcmFtZW50ZSBzZWxlemlvbmF0byBlIHNlbnphIFRPS0VOIGludGVybmkgc2VsZXppb25hdGlcbiAgICAvLyBpbCB2YWxvcmUgcml0b3JuYXRvIGRhIGxpdmVsbG8gMCAodGhpcy50b2tlbnMpIHZpZW5lIGlnbm9yYXRvXG4gICAgcmV0dXJuIHNlbGVjdGVkVG9rZW5zXG4gIH1cbiAgLyoqXG4gICAqIFJlbW92ZXMgYSB0b2tlbiBibG9jayBhbmQgcHV0cyBiYWNrIGFsbCB0aGUgdG9rZW5zIGluIHRoZWlyIG9yaWdpbmFsIHBvc2l0aW9uXG4gICAqIHByb2JsZW1hIHBlcmZvcm1hbmNlIFJJU09MVE9cbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGJsb2NrU3RhcnQgJ3N0YXJ0JyB2YWx1ZSBvZiB0aGUgdG9rZW4gYmxvY2sgdG8gcmVtb3ZlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBibG9ja0VuZCAnZW5kJyB2YWx1ZSBvZiB0aGUgdG9rZW4gYmxvY2sgdG8gcmVtb3ZlXG4gICAqL1xuICByZW1vdmVCbG9jayhibG9ja1N0YXJ0LCBibG9ja0VuZCkge1xuICAgIHRoaXMucmVjdXJzaXZlUmVtb3ZlQmxvY2soYmxvY2tTdGFydCwgYmxvY2tFbmQsIHRoaXMudG9rZW5zKVxuICB9XG4gIHJlY3Vyc2l2ZVJlbW92ZUJsb2NrKGJsb2NrU3RhcnQsIGJsb2NrRW5kLCBfdG9rZW5zKSB7XG4gICAgbGV0IHNlbGVjdGVkQmxvY2sgPSBudWxsO1xuXG4gICAgLy8gTElWRUxMTyAwXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoX3Rva2VucykpIHtcbiAgICAgIGZvciAobGV0IGNoaWxkIG9mIF90b2tlbnMpIHtcbiAgICAgICAgaWYgKGNoaWxkLnR5cGUgPT09IFwidG9rZW4tYmxvY2tcIikgeyAvL3BlciBwZXJmb3JtYW5jZTogdmVyaWZpY28gc2Ugc2lhIHVuIGJsb2NjbyBkYSByaW11b3ZlcmUgbyBzZSBuZSBjb250ZW5nYSBzb2xvIHNlIMOoIHVuIFRPS0VOLUJMT0NLXG4gICAgICAgICAgbGV0IHNlbGVjdGVkID0gdGhpcy5yZWN1cnNpdmVSZW1vdmVCbG9jayhibG9ja1N0YXJ0LCBibG9ja0VuZCwgY2hpbGQpO1xuICAgICAgICAgIGlmIChzZWxlY3RlZCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgc2VsZWN0ZWRCbG9jayA9IHNlbGVjdGVkO1xuICAgICAgICAgICAgYnJlYWs7IC8vbWkgZmVybW8gc2UgaG8gaW5kaXZpdWF0byBpbCB0b2tlbi1ibG9jayBkYSByaW11b3ZlcmVcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vc2UgaG8gdHJvdmF0byBhIHF1ZXN0byBsaXZlbGxvIGlsIEJMT0NLIGRhIHJpbXVvdmVyZSBcbiAgICAgIGlmIChzZWxlY3RlZEJsb2NrICE9PSBudWxsKSB7XG4gICAgICAgIC8vb3R0ZW5nbyBpbmljaSBwZXIgbGEgcmltb3ppb25lXG4gICAgICAgIGxldCBibG9ja19zdGFydCA9IHNlbGVjdGVkQmxvY2suc3RhcnQ7XG4gICAgICAgIGxldCBibG9ja19pbmRleCA9IF90b2tlbnMubWFwKHQgPT4gdC5zdGFydCkuaW5kZXhPZihibG9ja19zdGFydCk7XG4gICAgICAgIC8vbWkgc2Fsdm8gaSBUT0tFTlMgZSBUT0tFTi1CTE9DSyBjb250ZW51dGkgaW4gbW9kbyBkYSBhZ2dpdW5nZXJpIHNpbmdvbGFybWVudGVcbiAgICAgICAgbGV0IHRva2VucyA9IHNlbGVjdGVkQmxvY2sudG9rZW5zO1xuXG4gICAgICAgIC8vcmltdW92byBpbCB0b2tlbiBibG9ja1xuICAgICAgICBfdG9rZW5zLnNwbGljZShibG9ja19pbmRleCwgMSk7XG4gICAgICAgIC8vYWdnaXVuZ28gaSB0b2tlbnMgaW50ZXJuaSwgYSBsaXZlbGxvIDAgKHF1aWRuaSBzb3ZyYXNjaXZvIHRyYW5xdWlsbGFtZW50ZSB0aGlzLnRva2VucywgdmlzdG8gY2hlIF90b2tlbnMgw6ggcGFzc2F0byBwZXIgdmFsb3JlKVxuICAgICAgICB0aGlzLnRva2VucyA9IF90b2tlbnMuc2xpY2UoMCwgYmxvY2tfaW5kZXgpLmNvbmNhdCh0b2tlbnMsIF90b2tlbnMuc2xpY2UoYmxvY2tfaW5kZXgpKTsgLy8ocGVyIHBlcmZvcm1hbmNlKVxuICAgICAgICAvL3JpdG9ybm8gbnVsbC4uLiB2ZXJyw6AgaWdub3JhdG9cbiAgICAgICAgc2VsZWN0ZWRCbG9jayA9IG51bGw7XG4gICAgICB9XG4gICAgfSBcbiAgICAvL3JpbW96aW9uZSBkaSBxdWVzdG8gVE9DS0VOLUJMT0NLIGFkIHVuIGNlcnRvIGxpdmVsbG8gaW5uZXN0YXRvID4wIC0tPiByaXRvcm5vIGlsIEJMT0NLIGNvc8OsIGFpIGxpdmVsbGkgcmljaGlhbWFudGkgbWkgc29zdGl0dWlzY29ubyBjb2kgbWllaSAudG9rZW5zXG4gICAgZWxzZSBpZiAoX3Rva2Vucy50eXBlID09PSBcInRva2VuLWJsb2NrXCIgJiYgX3Rva2Vucy5zdGFydCA9PT0gYmxvY2tTdGFydCAmJiBfdG9rZW5zLmVuZCA9PT0gYmxvY2tFbmQpIHtcbiAgICAgIHJldHVybiBfdG9rZW5zO1xuICAgIH0gXG4gICAgLy9zZSBUT0NLRU4tQkxPQ0sgbm9uIMOoIGRhIHJpbXVvdmVyZSBhbGxvcmEgbWkgY29tcG9ydG8gcmljb3JzaXZhbWVudGUsIGNvbWUgcGVyIExJVkVMTE8gMCBtYSBhZ2VuZG8gc3VpIC50b2tlbnNcbiAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KF90b2tlbnMudG9rZW5zKSkge1xuICAgICAgZm9yIChsZXQgY2hpbGQgb2YgX3Rva2Vucy50b2tlbnMpIHtcbiAgICAgICAgaWYgKGNoaWxkLnR5cGUgPT09IFwidG9rZW4tYmxvY2tcIikgeyAvLyhwZXIgcGVyZm9ybWFuY2UpXG4gICAgICAgICAgbGV0IHNlbGVjdGVkID0gdGhpcy5yZWN1cnNpdmVSZW1vdmVCbG9jayhibG9ja1N0YXJ0LCBibG9ja0VuZCwgY2hpbGQpO1xuICAgICAgICAgIGlmIChzZWxlY3RlZCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgc2VsZWN0ZWRCbG9jayA9IHNlbGVjdGVkO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc2VsZWN0ZWRCbG9jayAhPT0gbnVsbCkge1xuICAgICAgICBsZXQgYmxvY2tfc3RhcnQgPSBzZWxlY3RlZEJsb2NrLnN0YXJ0O1xuICAgICAgICBsZXQgYmxvY2tfaW5kZXggPSBfdG9rZW5zLnRva2Vucy5tYXAodCA9PiB0LnN0YXJ0KS5pbmRleE9mKGJsb2NrX3N0YXJ0KTtcbiAgICAgICAgbGV0IHRva2VucyA9IHNlbGVjdGVkQmxvY2sudG9rZW5zO1xuXG4gICAgICAgIC8vcmltdW92byBpbCB0b2tlbiBibG9ja1xuICAgICAgICBfdG9rZW5zLnRva2Vucy5zcGxpY2UoYmxvY2tfaW5kZXgsIDEpO1xuICAgICAgICAvL2FnZ2l1bmdvIGkgdG9rZW5zXG4gICAgICAgIF90b2tlbnMudG9rZW5zID0gX3Rva2Vucy50b2tlbnMuc2xpY2UoMCwgYmxvY2tfaW5kZXgpLmNvbmNhdCh0b2tlbnMsIF90b2tlbnMudG9rZW5zLnNsaWNlKGJsb2NrX2luZGV4KSk7IC8vKHBlciBwZXJmb3JtYW5jZSlcbiAgICAgICAgc2VsZWN0ZWRCbG9jayA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIC8vTElWRUxMTyAwIHJpdG9ybmEgbnVsbFxuICAgIC8vTElWRUxMSSBpbm5lc3RhdGkgbm9uIGRhIHJpbXVvdmVyZSByaXRvcm5hbm8gbnVsbFxuICAgIC8vc3UgVE9DS0VOIG5vbiB2aWVuZSBtYWkgYXZ2aWF0YSBsYSBjaGlhbWF0YSByaWNvcnNpdmFcbiAgICAvL1RPQ0tFTi1CTE9DSyBzZWxlemlvbmF0aSByaXRvcm5hbm8gcHJpbWEgZGkgcXVlc3RhIHJpZ2EsIG5lbCBsb3JvIGVsc2VpZlxuICAgIC8vw6ggaW1wb3J0YW50ZSByaXRvcm5hcmUgbnVsbCBpbiBtb2RvIGNoZSBmdW56aW9uaW5vIGkgY29udHJvbGxpIHN1IHNlbGVjdGVkXG4gICAgcmV0dXJuIHNlbGVjdGVkQmxvY2tcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGFsbCB0aGUgdGFnIGJsb2NrcyBhbmQgbGVhdmVzIG9ubHkgdG9rZW5zXG4gICAqL1xuICByZXNldEJsb2NrcygpIHtcbiAgICB0aGlzLnRva2VucyA9IHRoaXMuaW5pdGlhbFRva2Vucy5zbGljZSgpOyAvL1NIQUxMT1cgQ09QWVxuICB9XG5cbiAgLyoqXG4gICAqIEV4cG9ydHMgdGhlIHRva2VucyBhbmQgdGhlIHRva2VuIGJsb2NrcyBhcyBhbm5vdGF0aW9uc1xuICAgKi9cbiAgZXhwb3J0QXNBbm5vdGF0aW9uKCkge1xuICAgIGxldCBlbnRpdGllcyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50b2tlbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICh0aGlzLnRva2Vuc1tpXS50eXBlID09PSBcInRva2VuLWJsb2NrXCIpIHtcbiAgICAgICAgbGV0IGIgPSB0aGlzLnRva2Vuc1tpXTtcbiAgICAgICAgZW50aXRpZXMucHVzaChbYi5zdGFydCwgYi5lbmQsIGIubGFiZWxdKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGVudGl0aWVzO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRva2VuTWFuYWdlcjsiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFBQTtBQU1BO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBREE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBRUE7OztBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUZBO0FBQUE7QUFDQTtBQURBO0FBR0E7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBUkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBUUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUkE7QUFVQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBN0JBO0FBZ0NBO0FBQ0E7QUFHQTtBQUxBO0FBUUE7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQU9BO0FBQ0E7QUFDQTtBQUhBO0FBQUE7QUFDQTtBQURBO0FBR0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBRUE7QUFQQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFPQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVJBO0FBVUE7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBSUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUFBO0FBQ0E7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFWQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFVQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBekJBO0FBNEJBO0FBQ0E7QUFGQTtBQUlBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFUQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFTQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBOzs7Ozs7QUFHQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/components/token-manager.js\n");

/***/ })

})