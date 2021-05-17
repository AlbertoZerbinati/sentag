webpackHotUpdate("app",{

/***/ "./src/components/token-manager.js":
/*!*****************************************!*\
  !*** ./src/components/token-manager.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var core_js_modules_es_array_index_of__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.index-of */ \"./node_modules/core-js/modules/es.array.index-of.js\");\n/* harmony import */ var core_js_modules_es_array_index_of__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_index_of__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var core_js_modules_es_array_map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.map */ \"./node_modules/core-js/modules/es.array.map.js\");\n/* harmony import */ var core_js_modules_es_array_map__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_map__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var core_js_modules_es_array_splice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.splice */ \"./node_modules/core-js/modules/es.array.splice.js\");\n/* harmony import */ var core_js_modules_es_array_splice__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_splice__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.function.name */ \"./node_modules/core-js/modules/es.function.name.js\");\n/* harmony import */ var core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _home_zerbi_Documents_III_anno_tesi_sentag_ui_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/toConsumableArray */ \"./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js\");\n/* harmony import */ var _home_zerbi_Documents_III_anno_tesi_sentag_ui_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper */ \"./node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper.js\");\n/* harmony import */ var _home_zerbi_Documents_III_anno_tesi_sentag_ui_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/classCallCheck */ \"./node_modules/@babel/runtime/helpers/esm/classCallCheck.js\");\n/* harmony import */ var _home_zerbi_Documents_III_anno_tesi_sentag_ui_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createClass */ \"./node_modules/@babel/runtime/helpers/esm/createClass.js\");\n\n\n\n\n\n\n\n\n\nvar TokenManager = /*#__PURE__*/function () {\n  /**\n   *\n   * @param {Array} tokens\n   */\n  function TokenManager(tokens) {\n    Object(_home_zerbi_Documents_III_anno_tesi_sentag_ui_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(this, TokenManager);\n\n    this.tokens = tokens.map(function (t) {\n      return {\n        type: \"token\",\n        start: t[0],\n        end: t[1],\n        text: t[2]\n      };\n    });\n    this.words = tokens.map(function (t) {\n      return t[2];\n    });\n  }\n  /**\n   * Creates a new token block with the tokens whose starts match the input\n   * parameters\n   *\n   * @param {Number} start 'start' value of the token forming the start of the token block\n   * @param {Number} end 'start' value of the token forming the end of the token block\n   * @param {Number} _class the id of the class to highlight\n   */\n\n\n  Object(_home_zerbi_Documents_III_anno_tesi_sentag_ui_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_7__[\"default\"])(TokenManager, [{\n    key: \"addNewBlock\",\n    value: function addNewBlock(_start, _end, _class) {\n      var start = _end < _start ? _end : _start;\n      var end = _end > _start ? _end : _start;\n      console.log(start);\n      console.log(end);\n      this.recursiveAddNewBlock(start, end, _class, this.tokens); //console.log(this.tokens)\n    }\n  }, {\n    key: \"recursiveAddNewBlock\",\n    value: function recursiveAddNewBlock(start, end, _class, _tokens) {\n      var selectedTokens = null;\n\n      if (Array.isArray(_tokens)) {\n        selectedTokens = [];\n\n        var _iterator = Object(_home_zerbi_Documents_III_anno_tesi_sentag_ui_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(_tokens),\n            _step;\n\n        try {\n          for (_iterator.s(); !(_step = _iterator.n()).done;) {\n            var child = _step.value;\n            var selected = this.recursiveAddNewBlock(start, end, _class, child);\n            if (selected !== null) selectedTokens.push(selected);\n          }\n        } catch (err) {\n          _iterator.e(err);\n        } finally {\n          _iterator.f();\n        }\n\n        if (selectedTokens.length) {\n          var first_token_start = selectedTokens[0].start; //let last_token_start = selectedTokens[selectedTokens.length - 1].start;\n          //console.log(first_token_start);\n\n          var first_index = _tokens.map(function (t) {\n            return t.start;\n          }).indexOf(first_token_start); //let last_index = selectedTokens.map(t => t.start).indexOf(last_token_start);\n          //console.log(first_index);\n\n\n          var newTokenBlock = {\n            type: \"token-block\",\n            start: selectedTokens[0].start,\n            end: selectedTokens[selectedTokens.length - 1].end,\n            tokens: selectedTokens,\n            label: _class && _class.name ? _class.name : \"Unlabelled\",\n            classId: _class && _class.id ? _class.id : 0,\n            backgroundColor: _class && _class.color ? _class.color : null\n          };\n          console.log(\"da array\");\n          console.log(selectedTokens);\n\n          _tokens.splice(first_index, selectedTokens.length, newTokenBlock);\n        }\n      } else if (_tokens.type === \"token-block\" && _tokens.start >= start && _tokens.end <= end) {\n        console.log(_tokens.start + \" \" + _tokens.end + \" \" + start + \" \" + end);\n        if (start <= _tokens.start && end >= _tokens.end) console.log(\"tokenblock\");\n        return _tokens;\n      } else if (_tokens.start >= start && _tokens.start <= end) {\n        console.log(\"token\");\n        return _tokens;\n      } else if (Array.isArray(_tokens.tokens)) {\n        selectedTokens = [];\n\n        var _iterator2 = Object(_home_zerbi_Documents_III_anno_tesi_sentag_ui_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(_tokens.tokens),\n            _step2;\n\n        try {\n          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {\n            var _child = _step2.value;\n\n            var _selected = this.recursiveAddNewBlock(start, end, _class, _child);\n\n            if (_selected !== null) selectedTokens.push(_selected);\n          }\n        } catch (err) {\n          _iterator2.e(err);\n        } finally {\n          _iterator2.f();\n        }\n\n        if (selectedTokens.length) {\n          var _first_token_start = selectedTokens[0].start; //let last_token_start = selectedTokens[selectedTokens.length - 1].start;\n          //console.log(first_token_start);\n\n          var _first_index = _tokens.tokens.map(function (t) {\n            return t.start;\n          }).indexOf(_first_token_start); //let last_index = selectedTokens.map(t => t.start).indexOf(last_token_start);\n          //console.log(first_index);\n\n\n          var _newTokenBlock = {\n            type: \"token-block\",\n            start: selectedTokens[0].start,\n            end: selectedTokens[selectedTokens.length - 1].end,\n            tokens: selectedTokens,\n            label: _class && _class.name ? _class.name : \"Unlabelled\",\n            classId: _class && _class.id ? _class.id : 0,\n            backgroundColor: _class && _class.color ? _class.color : null\n          };\n          console.log(\"da token block\");\n          console.log(selectedTokens);\n\n          _tokens.tokens.splice(_first_index, selectedTokens.length, _newTokenBlock);\n\n          selectedTokens = null;\n        }\n      }\n\n      if (selectedTokens !== null && !selectedTokens.length) selectedTokens = null;\n      return selectedTokens;\n    }\n    /**\n     * Removes a token block and puts back all the tokens in their original position\n     *\n     * @param {Number} blockStart 'start' value of the token block to remove\n     * @param {Number} blockEnd 'end' value of the token block to remove\n     */\n\n  }, {\n    key: \"removeBlock\",\n    value: function removeBlock(blockStart, blockEnd) {\n      this.recursiveRemoveBlock(blockStart, blockEnd, this.tokens);\n    }\n  }, {\n    key: \"recursiveRemoveBlock\",\n    value: function recursiveRemoveBlock(blockStart, blockEnd, _tokens) {\n      var selectedBlock = null;\n\n      if (Array.isArray(_tokens)) {\n        console.log(\"array\");\n\n        var _iterator3 = Object(_home_zerbi_Documents_III_anno_tesi_sentag_ui_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(_tokens),\n            _step3;\n\n        try {\n          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {\n            var child = _step3.value;\n            var selected = this.recursiveRemoveBlock(blockStart, blockEnd, child);\n\n            if (selected !== null) {\n              selectedBlock = selected;\n              break;\n            }\n          }\n        } catch (err) {\n          _iterator3.e(err);\n        } finally {\n          _iterator3.f();\n        }\n\n        if (selectedBlock !== null) {\n          var block_start = selectedBlock.start; //let last_token_start = selectedTokens[selectedTokens.length - 1].start;\n          //console.log(first_token_start);\n\n          var block_index = _tokens.map(function (t) {\n            return t.start;\n          }).indexOf(block_start); //let last_index = selectedTokens.map(t => t.start).indexOf(last_token_start);\n          //console.log(first_index);\n\n\n          var l = selectedBlock.tokens.length;\n          var tokens = selectedBlock.tokens; //rimuovo il token block\n\n          _tokens.splice(block_index, 1); //   //aggiungo i tokens (partendo dall'ultimo)\n\n\n          for (var j = l - 1; j >= 0; j--) {\n            _tokens.splice(block_index, 0, tokens[j]);\n          }\n\n          selectedBlock = null;\n          console.log(\"da array\"); //console.log(_tokens);\n        }\n      } else if (_tokens.type === \"token-block\" && _tokens.start === blockStart && _tokens.end === blockEnd) {\n        console.log(\"t\");\n        return _tokens;\n      } else if (Array.isArray(_tokens.tokens)) {\n        console.log(\"token-block\");\n\n        var _iterator4 = Object(_home_zerbi_Documents_III_anno_tesi_sentag_ui_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(_tokens.tokens),\n            _step4;\n\n        try {\n          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {\n            var _child2 = _step4.value;\n\n            var _selected2 = this.recursiveRemoveBlock(blockStart, blockEnd, _child2);\n\n            if (_selected2 !== null) {\n              selectedBlock = _selected2;\n              break;\n            }\n          }\n        } catch (err) {\n          _iterator4.e(err);\n        } finally {\n          _iterator4.f();\n        }\n\n        if (selectedBlock !== null) {\n          var _block_start = selectedBlock.start; //let last_token_start = selectedTokens[selectedTokens.length - 1].start;\n          //console.log(first_token_start);\n\n          var _block_index = _tokens.tokens.map(function (t) {\n            return t.start;\n          }).indexOf(_block_start); //let last_index = selectedTokens.map(t => t.start).indexOf(last_token_start);\n          //console.log(first_index);\n\n\n          var _l = selectedBlock.tokens.length;\n          var _tokens2 = selectedBlock.tokens; //rimuovo il token block\n\n          _tokens.tokens.splice(_block_index, 1); //   //aggiungo i tokens (partendo dall'ultimo)\n\n\n          for (var _j = _l - 1; _j >= 0; _j--) {\n            _tokens.tokens.splice(_block_index, 0, _tokens2[_j]);\n          }\n\n          selectedBlock = null;\n          console.log(\"da token block\"); //console.log(_tokens);\n        }\n      }\n\n      return selectedBlock;\n    }\n    /**\n     * Removes all the tag blocks and leaves only tokens\n     */\n\n  }, {\n    key: \"resetBlocks\",\n    value: function resetBlocks() {\n      var newTokens = [];\n\n      for (var i = 0; i < this.tokens.length; i++) {\n        if (this.tokens[i].type === \"token\") {\n          newTokens.push(this.tokens[i]);\n        } else {\n          newTokens.push.apply(newTokens, Object(_home_zerbi_Documents_III_anno_tesi_sentag_ui_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(this.tokens[i].tokens));\n        }\n      }\n\n      this.tokens = newTokens;\n    }\n    /**\n     * Exports the tokens and the token blocks as annotations\n     */\n\n  }, {\n    key: \"exportAsAnnotation\",\n    value: function exportAsAnnotation() {\n      var entities = [];\n\n      for (var i = 0; i < this.tokens.length; i++) {\n        if (this.tokens[i].type === \"token-block\") {\n          var b = this.tokens[i];\n          entities.push([b.start, b.end, b.label]);\n        }\n      }\n\n      return entities;\n    }\n  }]);\n\n  return TokenManager;\n}();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (TokenManager);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy90b2tlbi1tYW5hZ2VyLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvdG9rZW4tbWFuYWdlci5qcz80N2E3Il0sInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFRva2VuTWFuYWdlciB7XG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge0FycmF5fSB0b2tlbnNcbiAgICovXG4gIGNvbnN0cnVjdG9yKHRva2Vucykge1xuICAgIHRoaXMudG9rZW5zID0gdG9rZW5zLm1hcCgodCkgPT4gKHtcbiAgICAgIHR5cGU6IFwidG9rZW5cIixcbiAgICAgIHN0YXJ0OiB0WzBdLFxuICAgICAgZW5kOiB0WzFdLFxuICAgICAgdGV4dDogdFsyXSxcbiAgICB9KSk7XG4gICAgdGhpcy53b3JkcyA9IHRva2Vucy5tYXAodCA9PiB0WzJdKTsgXG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyB0b2tlbiBibG9jayB3aXRoIHRoZSB0b2tlbnMgd2hvc2Ugc3RhcnRzIG1hdGNoIHRoZSBpbnB1dFxuICAgKiBwYXJhbWV0ZXJzXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBzdGFydCAnc3RhcnQnIHZhbHVlIG9mIHRoZSB0b2tlbiBmb3JtaW5nIHRoZSBzdGFydCBvZiB0aGUgdG9rZW4gYmxvY2tcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGVuZCAnc3RhcnQnIHZhbHVlIG9mIHRoZSB0b2tlbiBmb3JtaW5nIHRoZSBlbmQgb2YgdGhlIHRva2VuIGJsb2NrXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBfY2xhc3MgdGhlIGlkIG9mIHRoZSBjbGFzcyB0byBoaWdobGlnaHRcbiAgICovXG4gIGFkZE5ld0Jsb2NrKF9zdGFydCwgX2VuZCwgX2NsYXNzKSB7XG4gICAgbGV0IHN0YXJ0ID0gX2VuZCA8IF9zdGFydCA/IF9lbmQgOiBfc3RhcnQ7XG4gICAgbGV0IGVuZCA9IF9lbmQgPiBfc3RhcnQgPyBfZW5kIDogX3N0YXJ0O1xuICAgIGNvbnNvbGUubG9nKHN0YXJ0KTtcbiAgICBjb25zb2xlLmxvZyhlbmQpO1xuICAgIHRoaXMucmVjdXJzaXZlQWRkTmV3QmxvY2soc3RhcnQsIGVuZCwgX2NsYXNzLCB0aGlzLnRva2Vucyk7XG4gICAgLy9jb25zb2xlLmxvZyh0aGlzLnRva2VucylcbiAgfVxuICByZWN1cnNpdmVBZGROZXdCbG9jayhzdGFydCwgZW5kLCBfY2xhc3MsIF90b2tlbnMpIHtcbiAgICBsZXQgc2VsZWN0ZWRUb2tlbnMgPSBudWxsO1xuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoX3Rva2VucykpIHtcbiAgICAgIHNlbGVjdGVkVG9rZW5zID0gW11cbiAgICAgIGZvciAobGV0IGNoaWxkIG9mIF90b2tlbnMpIHtcbiAgICAgICAgbGV0IHNlbGVjdGVkID0gdGhpcy5yZWN1cnNpdmVBZGROZXdCbG9jayhzdGFydCwgZW5kLCBfY2xhc3MsIGNoaWxkKTtcbiAgICAgICAgaWYgKHNlbGVjdGVkICE9PSBudWxsKVxuICAgICAgICAgIHNlbGVjdGVkVG9rZW5zLnB1c2goc2VsZWN0ZWQpO1xuICAgICAgfVxuICAgICAgaWYgKHNlbGVjdGVkVG9rZW5zLmxlbmd0aCkge1xuICAgICAgICBsZXQgZmlyc3RfdG9rZW5fc3RhcnQgPSBzZWxlY3RlZFRva2Vuc1swXS5zdGFydDtcbiAgICAgICAgLy9sZXQgbGFzdF90b2tlbl9zdGFydCA9IHNlbGVjdGVkVG9rZW5zW3NlbGVjdGVkVG9rZW5zLmxlbmd0aCAtIDFdLnN0YXJ0O1xuICAgICAgICAvL2NvbnNvbGUubG9nKGZpcnN0X3Rva2VuX3N0YXJ0KTtcblxuICAgICAgICBsZXQgZmlyc3RfaW5kZXggPSBfdG9rZW5zLm1hcCh0ID0+IHQuc3RhcnQpLmluZGV4T2YoZmlyc3RfdG9rZW5fc3RhcnQpO1xuICAgICAgICAvL2xldCBsYXN0X2luZGV4ID0gc2VsZWN0ZWRUb2tlbnMubWFwKHQgPT4gdC5zdGFydCkuaW5kZXhPZihsYXN0X3Rva2VuX3N0YXJ0KTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhmaXJzdF9pbmRleCk7XG5cbiAgICAgICAgbGV0IG5ld1Rva2VuQmxvY2sgPSB7XG4gICAgICAgICAgdHlwZTogXCJ0b2tlbi1ibG9ja1wiLFxuICAgICAgICAgIHN0YXJ0OiBzZWxlY3RlZFRva2Vuc1swXS5zdGFydCxcbiAgICAgICAgICBlbmQ6IHNlbGVjdGVkVG9rZW5zW3NlbGVjdGVkVG9rZW5zLmxlbmd0aCAtIDFdLmVuZCxcbiAgICAgICAgICB0b2tlbnM6IHNlbGVjdGVkVG9rZW5zLFxuICAgICAgICAgIGxhYmVsOiBfY2xhc3MgJiYgX2NsYXNzLm5hbWUgPyBfY2xhc3MubmFtZSA6IFwiVW5sYWJlbGxlZFwiLFxuICAgICAgICAgIGNsYXNzSWQ6IF9jbGFzcyAmJiBfY2xhc3MuaWQgPyBfY2xhc3MuaWQgOiAwLFxuICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogX2NsYXNzICYmIF9jbGFzcy5jb2xvciA/IF9jbGFzcy5jb2xvciA6IG51bGwsXG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coXCJkYSBhcnJheVwiKVxuICAgICAgICBjb25zb2xlLmxvZyhzZWxlY3RlZFRva2Vucyk7XG4gICAgICAgIF90b2tlbnMuc3BsaWNlKGZpcnN0X2luZGV4LCBzZWxlY3RlZFRva2Vucy5sZW5ndGgsIG5ld1Rva2VuQmxvY2spO1xuICAgICAgfVxuICAgIH0gXG4gICAgZWxzZSBpZiAoX3Rva2Vucy50eXBlID09PSBcInRva2VuLWJsb2NrXCIgJiZfdG9rZW5zLnN0YXJ0ID49IHN0YXJ0ICYmIF90b2tlbnMuZW5kIDw9IGVuZCkge1xuICAgICAgY29uc29sZS5sb2coX3Rva2Vucy5zdGFydCArIFwiIFwiICsgX3Rva2Vucy5lbmQgKyBcIiBcIiArc3RhcnQgKyBcIiBcIiArIGVuZClcbiAgICAgIGlmIChzdGFydCA8PSBfdG9rZW5zLnN0YXJ0ICYmIGVuZCA+PSBfdG9rZW5zLmVuZClcbiAgICAgICAgY29uc29sZS5sb2coXCJ0b2tlbmJsb2NrXCIpXG4gICAgICAgIHJldHVybiBfdG9rZW5zO1xuICAgICAgfSBcbiAgICBlbHNlIGlmIChfdG9rZW5zLnN0YXJ0ID49IHN0YXJ0ICYmIF90b2tlbnMuc3RhcnQgPD0gZW5kKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwidG9rZW5cIilcbiAgICAgICAgcmV0dXJuIF90b2tlbnM7XG4gICAgICB9IFxuICAgICAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KF90b2tlbnMudG9rZW5zKSkge1xuICAgICAgc2VsZWN0ZWRUb2tlbnMgPSBbXVxuICAgICAgZm9yIChsZXQgY2hpbGQgb2YgX3Rva2Vucy50b2tlbnMpIHtcbiAgICAgICAgbGV0IHNlbGVjdGVkID0gdGhpcy5yZWN1cnNpdmVBZGROZXdCbG9jayhzdGFydCwgZW5kLCBfY2xhc3MsIGNoaWxkKTtcbiAgICAgICAgaWYgKHNlbGVjdGVkICE9PSBudWxsKVxuICAgICAgICBzZWxlY3RlZFRva2Vucy5wdXNoKHNlbGVjdGVkKTtcbiAgICAgIH1cbiAgICAgIGlmIChzZWxlY3RlZFRva2Vucy5sZW5ndGgpIHtcbiAgICAgICAgbGV0IGZpcnN0X3Rva2VuX3N0YXJ0ID0gc2VsZWN0ZWRUb2tlbnNbMF0uc3RhcnQ7XG4gICAgICAgIC8vbGV0IGxhc3RfdG9rZW5fc3RhcnQgPSBzZWxlY3RlZFRva2Vuc1tzZWxlY3RlZFRva2Vucy5sZW5ndGggLSAxXS5zdGFydDtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhmaXJzdF90b2tlbl9zdGFydCk7XG4gICAgICAgIFxuICAgICAgICBsZXQgZmlyc3RfaW5kZXggPSBfdG9rZW5zLnRva2Vucy5tYXAodCA9PiB0LnN0YXJ0KS5pbmRleE9mKGZpcnN0X3Rva2VuX3N0YXJ0KTtcbiAgICAgICAgLy9sZXQgbGFzdF9pbmRleCA9IHNlbGVjdGVkVG9rZW5zLm1hcCh0ID0+IHQuc3RhcnQpLmluZGV4T2YobGFzdF90b2tlbl9zdGFydCk7XG4gICAgICAgIC8vY29uc29sZS5sb2coZmlyc3RfaW5kZXgpO1xuICAgICAgICBcbiAgICAgICAgbGV0IG5ld1Rva2VuQmxvY2sgPSB7XG4gICAgICAgICAgdHlwZTogXCJ0b2tlbi1ibG9ja1wiLFxuICAgICAgICAgIHN0YXJ0OiBzZWxlY3RlZFRva2Vuc1swXS5zdGFydCxcbiAgICAgICAgICBlbmQ6IHNlbGVjdGVkVG9rZW5zW3NlbGVjdGVkVG9rZW5zLmxlbmd0aCAtIDFdLmVuZCxcbiAgICAgICAgICB0b2tlbnM6IHNlbGVjdGVkVG9rZW5zLFxuICAgICAgICAgIGxhYmVsOiBfY2xhc3MgJiYgX2NsYXNzLm5hbWUgPyBfY2xhc3MubmFtZSA6IFwiVW5sYWJlbGxlZFwiLFxuICAgICAgICAgIGNsYXNzSWQ6IF9jbGFzcyAmJiBfY2xhc3MuaWQgPyBfY2xhc3MuaWQgOiAwLFxuICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogX2NsYXNzICYmIF9jbGFzcy5jb2xvciA/IF9jbGFzcy5jb2xvciA6IG51bGwsXG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coXCJkYSB0b2tlbiBibG9ja1wiKVxuICAgICAgICBjb25zb2xlLmxvZyhzZWxlY3RlZFRva2Vucyk7XG4gICAgICAgIF90b2tlbnMudG9rZW5zLnNwbGljZShmaXJzdF9pbmRleCwgc2VsZWN0ZWRUb2tlbnMubGVuZ3RoLCBuZXdUb2tlbkJsb2NrKTtcbiAgICAgICAgc2VsZWN0ZWRUb2tlbnMgPSBudWxsXG4gICAgICB9XG4gICAgfVxuICAgIGlmIChzZWxlY3RlZFRva2VucyAhPT0gbnVsbCAmJiAhc2VsZWN0ZWRUb2tlbnMubGVuZ3RoKVxuICAgICAgc2VsZWN0ZWRUb2tlbnMgPSBudWxsXG4gICAgcmV0dXJuIHNlbGVjdGVkVG9rZW5zXG4gIH1cbiAgLyoqXG4gICAqIFJlbW92ZXMgYSB0b2tlbiBibG9jayBhbmQgcHV0cyBiYWNrIGFsbCB0aGUgdG9rZW5zIGluIHRoZWlyIG9yaWdpbmFsIHBvc2l0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBibG9ja1N0YXJ0ICdzdGFydCcgdmFsdWUgb2YgdGhlIHRva2VuIGJsb2NrIHRvIHJlbW92ZVxuICAgKiBAcGFyYW0ge051bWJlcn0gYmxvY2tFbmQgJ2VuZCcgdmFsdWUgb2YgdGhlIHRva2VuIGJsb2NrIHRvIHJlbW92ZVxuICAgKi9cbiAgcmVtb3ZlQmxvY2soYmxvY2tTdGFydCxibG9ja0VuZCkge1xuICAgIHRoaXMucmVjdXJzaXZlUmVtb3ZlQmxvY2soYmxvY2tTdGFydCxibG9ja0VuZCx0aGlzLnRva2VucylcbiAgfVxuICByZWN1cnNpdmVSZW1vdmVCbG9jayhibG9ja1N0YXJ0LCBibG9ja0VuZCwgX3Rva2Vucykge1xuICAgIGxldCBzZWxlY3RlZEJsb2NrID0gbnVsbDtcblxuICAgIGlmIChBcnJheS5pc0FycmF5KF90b2tlbnMpKSB7XG4gICAgICBjb25zb2xlLmxvZyhcImFycmF5XCIpXG4gICAgICBmb3IgKGxldCBjaGlsZCBvZiBfdG9rZW5zKSB7XG4gICAgICAgIGxldCBzZWxlY3RlZCA9IHRoaXMucmVjdXJzaXZlUmVtb3ZlQmxvY2soYmxvY2tTdGFydCwgYmxvY2tFbmQsIGNoaWxkKTtcbiAgICAgICAgaWYgKHNlbGVjdGVkICE9PSBudWxsKSB7XG4gICAgICAgICAgc2VsZWN0ZWRCbG9jayA9IHNlbGVjdGVkO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc2VsZWN0ZWRCbG9jayAhPT0gbnVsbCkge1xuICAgICAgICBsZXQgYmxvY2tfc3RhcnQgPSBzZWxlY3RlZEJsb2NrLnN0YXJ0O1xuICAgICAgICAvL2xldCBsYXN0X3Rva2VuX3N0YXJ0ID0gc2VsZWN0ZWRUb2tlbnNbc2VsZWN0ZWRUb2tlbnMubGVuZ3RoIC0gMV0uc3RhcnQ7XG4gICAgICAgIC8vY29uc29sZS5sb2coZmlyc3RfdG9rZW5fc3RhcnQpO1xuXG4gICAgICAgIGxldCBibG9ja19pbmRleCA9IF90b2tlbnMubWFwKHQgPT4gdC5zdGFydCkuaW5kZXhPZihibG9ja19zdGFydCk7XG4gICAgICAgIC8vbGV0IGxhc3RfaW5kZXggPSBzZWxlY3RlZFRva2Vucy5tYXAodCA9PiB0LnN0YXJ0KS5pbmRleE9mKGxhc3RfdG9rZW5fc3RhcnQpO1xuICAgICAgICAvL2NvbnNvbGUubG9nKGZpcnN0X2luZGV4KTtcbiAgICAgICAgbGV0IGwgPSBzZWxlY3RlZEJsb2NrLnRva2Vucy5sZW5ndGg7XG4gICAgICAgIGxldCB0b2tlbnMgPSBzZWxlY3RlZEJsb2NrLnRva2VucztcblxuICAgICAgICAvL3JpbXVvdm8gaWwgdG9rZW4gYmxvY2tcbiAgICAgICAgX3Rva2Vucy5zcGxpY2UoYmxvY2tfaW5kZXgsIDEpO1xuICAgICAgICAvLyAgIC8vYWdnaXVuZ28gaSB0b2tlbnMgKHBhcnRlbmRvIGRhbGwndWx0aW1vKVxuICAgICAgICBmb3IgKGxldCBqID0gbCAtIDE7IGogPj0gMDsgai0tKSB7XG4gICAgICAgICAgX3Rva2Vucy5zcGxpY2UoYmxvY2tfaW5kZXgsIDAsIHRva2Vuc1tqXSk7XG4gICAgICAgIH1cbiAgICAgICAgc2VsZWN0ZWRCbG9jayA9IG51bGw7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiZGEgYXJyYXlcIilcbiAgICAgICAgLy9jb25zb2xlLmxvZyhfdG9rZW5zKTtcbiAgICAgIH1cbiAgICB9IFxuICAgIGVsc2UgaWYgKF90b2tlbnMudHlwZSA9PT0gXCJ0b2tlbi1ibG9ja1wiICYmIF90b2tlbnMuc3RhcnQgPT09IGJsb2NrU3RhcnQgJiYgX3Rva2Vucy5lbmQgPT09IGJsb2NrRW5kKSB7XG4gICAgICBjb25zb2xlLmxvZyhcInRcIilcbiAgICAgIHJldHVybiBfdG9rZW5zO1xuICAgIH1cbiAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KF90b2tlbnMudG9rZW5zKSkge1xuICAgICAgY29uc29sZS5sb2coXCJ0b2tlbi1ibG9ja1wiKVxuICAgICAgZm9yIChsZXQgY2hpbGQgb2YgX3Rva2Vucy50b2tlbnMpIHtcbiAgICAgICAgbGV0IHNlbGVjdGVkID0gdGhpcy5yZWN1cnNpdmVSZW1vdmVCbG9jayhibG9ja1N0YXJ0LCBibG9ja0VuZCwgY2hpbGQpO1xuICAgICAgICBpZiAoc2VsZWN0ZWQgIT09IG51bGwpIHtcbiAgICAgICAgICBzZWxlY3RlZEJsb2NrID0gc2VsZWN0ZWQ7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzZWxlY3RlZEJsb2NrICE9PSBudWxsKSB7XG4gICAgICAgIGxldCBibG9ja19zdGFydCA9IHNlbGVjdGVkQmxvY2suc3RhcnQ7XG4gICAgICAgIC8vbGV0IGxhc3RfdG9rZW5fc3RhcnQgPSBzZWxlY3RlZFRva2Vuc1tzZWxlY3RlZFRva2Vucy5sZW5ndGggLSAxXS5zdGFydDtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhmaXJzdF90b2tlbl9zdGFydCk7XG5cbiAgICAgICAgbGV0IGJsb2NrX2luZGV4ID0gX3Rva2Vucy50b2tlbnMubWFwKHQgPT4gdC5zdGFydCkuaW5kZXhPZihibG9ja19zdGFydCk7XG4gICAgICAgIC8vbGV0IGxhc3RfaW5kZXggPSBzZWxlY3RlZFRva2Vucy5tYXAodCA9PiB0LnN0YXJ0KS5pbmRleE9mKGxhc3RfdG9rZW5fc3RhcnQpO1xuICAgICAgICAvL2NvbnNvbGUubG9nKGZpcnN0X2luZGV4KTtcbiAgICAgICAgbGV0IGwgPSBzZWxlY3RlZEJsb2NrLnRva2Vucy5sZW5ndGg7XG4gICAgICAgIGxldCB0b2tlbnMgPSBzZWxlY3RlZEJsb2NrLnRva2VucztcblxuICAgICAgICAvL3JpbXVvdm8gaWwgdG9rZW4gYmxvY2tcbiAgICAgICAgX3Rva2Vucy50b2tlbnMuc3BsaWNlKGJsb2NrX2luZGV4LCAxKTtcbiAgICAgICAgLy8gICAvL2FnZ2l1bmdvIGkgdG9rZW5zIChwYXJ0ZW5kbyBkYWxsJ3VsdGltbylcbiAgICAgICAgZm9yIChsZXQgaiA9IGwgLSAxOyBqID49IDA7IGotLSkge1xuICAgICAgICAgIF90b2tlbnMudG9rZW5zLnNwbGljZShibG9ja19pbmRleCwgMCwgdG9rZW5zW2pdKTtcbiAgICAgICAgfVxuICAgICAgICBzZWxlY3RlZEJsb2NrID0gbnVsbDtcbiAgICAgICAgY29uc29sZS5sb2coXCJkYSB0b2tlbiBibG9ja1wiKVxuICAgICAgICAvL2NvbnNvbGUubG9nKF90b2tlbnMpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBzZWxlY3RlZEJsb2NrXG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhbGwgdGhlIHRhZyBibG9ja3MgYW5kIGxlYXZlcyBvbmx5IHRva2Vuc1xuICAgKi9cbiAgcmVzZXRCbG9ja3MoKSB7XG4gICAgbGV0IG5ld1Rva2VucyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50b2tlbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICh0aGlzLnRva2Vuc1tpXS50eXBlID09PSBcInRva2VuXCIpIHtcbiAgICAgICAgbmV3VG9rZW5zLnB1c2godGhpcy50b2tlbnNbaV0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmV3VG9rZW5zLnB1c2goLi4udGhpcy50b2tlbnNbaV0udG9rZW5zKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy50b2tlbnMgPSBuZXdUb2tlbnM7XG4gIH1cblxuICAvKipcbiAgICogRXhwb3J0cyB0aGUgdG9rZW5zIGFuZCB0aGUgdG9rZW4gYmxvY2tzIGFzIGFubm90YXRpb25zXG4gICAqL1xuICBleHBvcnRBc0Fubm90YXRpb24oKSB7XG4gICAgbGV0IGVudGl0aWVzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnRva2Vucy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHRoaXMudG9rZW5zW2ldLnR5cGUgPT09IFwidG9rZW4tYmxvY2tcIikge1xuICAgICAgICBsZXQgYiA9IHRoaXMudG9rZW5zW2ldO1xuICAgICAgICBlbnRpdGllcy5wdXNoKFtiLnN0YXJ0LCBiLmVuZCwgYi5sYWJlbF0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZW50aXRpZXM7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVG9rZW5NYW5hZ2VyO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBQUE7QUFNQTtBQUFBO0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFBQTtBQUNBO0FBREE7QUFFQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBTkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBTUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUEE7QUFTQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFGQTtBQUFBO0FBQ0E7QUFEQTtBQUVBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUVBO0FBTkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBTUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUEE7QUFTQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQUE7QUFDQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUFBO0FBQ0E7QUFEQTtBQUVBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVJBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQVFBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBREE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFGQTtBQUFBO0FBQ0E7QUFEQTtBQUVBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBUUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFEQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTs7Ozs7O0FBR0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/components/token-manager.js\n");

/***/ })

})