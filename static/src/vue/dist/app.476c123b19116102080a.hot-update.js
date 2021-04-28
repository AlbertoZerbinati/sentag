webpackHotUpdate("app",{

/***/ "./src/components/token-manager.js":
/*!*****************************************!*\
  !*** ./src/components/token-manager.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var core_js_modules_es_array_map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.map */ \"./node_modules/core-js/modules/es.array.map.js\");\n/* harmony import */ var core_js_modules_es_array_map__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_map__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.function.name */ \"./node_modules/core-js/modules/es.function.name.js\");\n/* harmony import */ var core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _home_zerbi_Documents_III_anno_tesi_sentag_ui_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/toConsumableArray */ \"./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js\");\n/* harmony import */ var _home_zerbi_Documents_III_anno_tesi_sentag_ui_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/classCallCheck */ \"./node_modules/@babel/runtime/helpers/esm/classCallCheck.js\");\n/* harmony import */ var _home_zerbi_Documents_III_anno_tesi_sentag_ui_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createClass */ \"./node_modules/@babel/runtime/helpers/esm/createClass.js\");\n\n\n\n\n\n\nvar TokenManager = /*#__PURE__*/function () {\n  /**\n   *\n   * @param {Array} tokens\n   */\n  function TokenManager(tokens) {\n    Object(_home_zerbi_Documents_III_anno_tesi_sentag_ui_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(this, TokenManager);\n\n    this.tokens = tokens.map(function (t) {\n      return {\n        type: \"token\",\n        start: t[0],\n        end: t[1],\n        text: t[2]\n      };\n    });\n    this.words = tokens.map(function (t) {\n      return t[2];\n    });\n  }\n  /**\n   * Creates a new token block with the tokens whose starts match the input\n   * parameters\n   *\n   * @param {Number} start 'start' value of the token forming the start of the token block\n   * @param {Number} end 'start' value of the token forming the end of the token block\n   * @param {Number} _class the id of the class to highlight\n   */\n\n\n  Object(_home_zerbi_Documents_III_anno_tesi_sentag_ui_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(TokenManager, [{\n    key: \"addNewBlock\",\n    value: function addNewBlock(_start, _end, _class) {\n      var selectedTokens = [];\n      var newTokens = [];\n      console.log(\"z\");\n      var start = _end < _start ? _end : _start;\n      var end = _end > _start ? _end : _start;\n\n      for (var i = 0; i < this.tokens.length; i++) {\n        var t = this.tokens[i];\n\n        if (t.type == \"token-block\" && t.start <= start && t.end >= end) {\n          console.log(\"nested\");\n        } else if (t.start < start) {\n          newTokens.push(t);\n        } else if (t.type == \"token\" && t.start >= start && t.start <= end) {\n          selectedTokens.push(t);\n        } else if (t.start > start && selectedTokens.length) {\n          newTokens.push({\n            type: \"token-block\",\n            start: selectedTokens[0].start,\n            end: selectedTokens[selectedTokens.length - 1].end,\n            tokens: selectedTokens,\n            label: _class && _class.name ? _class.name : \"Unlabelled\",\n            classId: _class && _class.id ? _class.id : 0,\n            backgroundColor: _class && _class.color ? _class.color : null\n          });\n          selectedTokens = [];\n          newTokens.push(t);\n        } else {\n          newTokens.push(t);\n        }\n      } // Case if the selected tokens are at the end of the text and have not been added to the newTokens\n\n\n      if (selectedTokens.length) {\n        newTokens.push({\n          type: \"token-block\",\n          start: selectedTokens[0].start,\n          end: selectedTokens[selectedTokens.length - 1].end,\n          tokens: selectedTokens,\n          label: _class && _class.name ? _class.name : \"Unlabelled\",\n          classId: _class && _class.id ? _class.id : 0,\n          backgroundColor: _class && _class.color ? _class.color : null\n        });\n      }\n\n      this.tokens = newTokens;\n    }\n    /**\n     * Removes a token block and puts back all the tokens in their original position\n     *\n     * @param {Number} blockStart 'start' value of the token block to remove\n     */\n\n  }, {\n    key: \"removeBlock\",\n    value: function removeBlock(blockStart) {\n      var newTokens = [];\n\n      for (var i = 0; i < this.tokens.length; i++) {\n        if (this.tokens[i].type === \"token-block\" && this.tokens[i].start === blockStart) {\n          newTokens.push.apply(newTokens, Object(_home_zerbi_Documents_III_anno_tesi_sentag_ui_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(this.tokens[i].tokens));\n        } else {\n          newTokens.push(this.tokens[i]);\n        }\n      }\n\n      this.tokens = newTokens;\n    }\n    /**\n     * Removes all the tag blocks and leaves only tokens\n     */\n\n  }, {\n    key: \"resetBlocks\",\n    value: function resetBlocks() {\n      var newTokens = [];\n\n      for (var i = 0; i < this.tokens.length; i++) {\n        if (this.tokens[i].type === \"token\") {\n          newTokens.push(this.tokens[i]);\n        } else {\n          newTokens.push.apply(newTokens, Object(_home_zerbi_Documents_III_anno_tesi_sentag_ui_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(this.tokens[i].tokens));\n        }\n      }\n\n      this.tokens = newTokens;\n    }\n    /**\n     * Exports the tokens and the token blocks as annotations\n     */\n\n  }, {\n    key: \"exportAsAnnotation\",\n    value: function exportAsAnnotation() {\n      var entities = [];\n\n      for (var i = 0; i < this.tokens.length; i++) {\n        if (this.tokens[i].type === \"token-block\") {\n          var b = this.tokens[i];\n          entities.push([b.start, b.end, b.label]);\n        }\n      }\n\n      return entities;\n    }\n  }]);\n\n  return TokenManager;\n}();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (TokenManager);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy90b2tlbi1tYW5hZ2VyLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvdG9rZW4tbWFuYWdlci5qcz80N2E3Il0sInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFRva2VuTWFuYWdlciB7XG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge0FycmF5fSB0b2tlbnNcbiAgICovXG4gIGNvbnN0cnVjdG9yKHRva2Vucykge1xuICAgIHRoaXMudG9rZW5zID0gdG9rZW5zLm1hcCgodCkgPT4gKHtcbiAgICAgIHR5cGU6IFwidG9rZW5cIixcbiAgICAgIHN0YXJ0OiB0WzBdLFxuICAgICAgZW5kOiB0WzFdLFxuICAgICAgdGV4dDogdFsyXSxcbiAgICB9KSk7XG4gICAgdGhpcy53b3JkcyA9IHRva2Vucy5tYXAodCA9PiB0WzJdKTsgXG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyB0b2tlbiBibG9jayB3aXRoIHRoZSB0b2tlbnMgd2hvc2Ugc3RhcnRzIG1hdGNoIHRoZSBpbnB1dFxuICAgKiBwYXJhbWV0ZXJzXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBzdGFydCAnc3RhcnQnIHZhbHVlIG9mIHRoZSB0b2tlbiBmb3JtaW5nIHRoZSBzdGFydCBvZiB0aGUgdG9rZW4gYmxvY2tcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGVuZCAnc3RhcnQnIHZhbHVlIG9mIHRoZSB0b2tlbiBmb3JtaW5nIHRoZSBlbmQgb2YgdGhlIHRva2VuIGJsb2NrXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBfY2xhc3MgdGhlIGlkIG9mIHRoZSBjbGFzcyB0byBoaWdobGlnaHRcbiAgICovXG4gIGFkZE5ld0Jsb2NrKF9zdGFydCwgX2VuZCwgX2NsYXNzKSB7XG4gICAgbGV0IHNlbGVjdGVkVG9rZW5zID0gW107XG4gICAgbGV0IG5ld1Rva2VucyA9IFtdO1xuICAgIGNvbnNvbGUubG9nKFwielwiKTtcblxuICAgIGxldCBzdGFydCA9IF9lbmQgPCBfc3RhcnQgPyBfZW5kIDogX3N0YXJ0O1xuICAgIGxldCBlbmQgPSBfZW5kID4gX3N0YXJ0ID8gX2VuZCA6IF9zdGFydDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50b2tlbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCB0ID0gdGhpcy50b2tlbnNbaV07XG4gICAgICBpZiAodC50eXBlID09IFwidG9rZW4tYmxvY2tcIiAmJiB0LnN0YXJ0IDw9IHN0YXJ0ICYmIHQuZW5kID49IGVuZCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIm5lc3RlZFwiKVxuICAgICAgfSBlbHNlIGlmICh0LnN0YXJ0IDwgc3RhcnQpIHtcbiAgICAgICAgbmV3VG9rZW5zLnB1c2godCk7XG4gICAgICB9IGVsc2UgaWYgKHQudHlwZSA9PSBcInRva2VuXCIgJiYgdC5zdGFydCA+PSBzdGFydCAmJiB0LnN0YXJ0IDw9IGVuZCkge1xuICAgICAgICBzZWxlY3RlZFRva2Vucy5wdXNoKHQpO1xuICAgICAgfSBlbHNlIGlmICh0LnN0YXJ0ID4gc3RhcnQgJiYgc2VsZWN0ZWRUb2tlbnMubGVuZ3RoKSB7XG4gICAgICAgIG5ld1Rva2Vucy5wdXNoKHtcbiAgICAgICAgICB0eXBlOiBcInRva2VuLWJsb2NrXCIsXG4gICAgICAgICAgc3RhcnQ6IHNlbGVjdGVkVG9rZW5zWzBdLnN0YXJ0LFxuICAgICAgICAgIGVuZDogc2VsZWN0ZWRUb2tlbnNbc2VsZWN0ZWRUb2tlbnMubGVuZ3RoIC0gMV0uZW5kLFxuICAgICAgICAgIHRva2Vuczogc2VsZWN0ZWRUb2tlbnMsXG4gICAgICAgICAgbGFiZWw6IF9jbGFzcyAmJiBfY2xhc3MubmFtZSA/IF9jbGFzcy5uYW1lIDogXCJVbmxhYmVsbGVkXCIsXG4gICAgICAgICAgY2xhc3NJZDogX2NsYXNzICYmIF9jbGFzcy5pZCA/IF9jbGFzcy5pZCA6IDAsXG4gICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBfY2xhc3MgJiYgX2NsYXNzLmNvbG9yID8gX2NsYXNzLmNvbG9yIDogbnVsbCxcbiAgICAgICAgfSk7XG4gICAgICAgIHNlbGVjdGVkVG9rZW5zID0gW107XG4gICAgICAgIG5ld1Rva2Vucy5wdXNoKHQpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIG5ld1Rva2Vucy5wdXNoKHQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIENhc2UgaWYgdGhlIHNlbGVjdGVkIHRva2VucyBhcmUgYXQgdGhlIGVuZCBvZiB0aGUgdGV4dCBhbmQgaGF2ZSBub3QgYmVlbiBhZGRlZCB0byB0aGUgbmV3VG9rZW5zXG4gICAgaWYgKHNlbGVjdGVkVG9rZW5zLmxlbmd0aCkge1xuICAgICAgbmV3VG9rZW5zLnB1c2goe1xuICAgICAgICB0eXBlOiBcInRva2VuLWJsb2NrXCIsXG4gICAgICAgICAgc3RhcnQ6IHNlbGVjdGVkVG9rZW5zWzBdLnN0YXJ0LFxuICAgICAgICAgIGVuZDogc2VsZWN0ZWRUb2tlbnNbc2VsZWN0ZWRUb2tlbnMubGVuZ3RoIC0gMV0uZW5kLFxuICAgICAgICAgIHRva2Vuczogc2VsZWN0ZWRUb2tlbnMsXG4gICAgICAgICAgbGFiZWw6IF9jbGFzcyAmJiBfY2xhc3MubmFtZSA/IF9jbGFzcy5uYW1lIDogXCJVbmxhYmVsbGVkXCIsXG4gICAgICAgICAgY2xhc3NJZDogX2NsYXNzICYmIF9jbGFzcy5pZCA/IF9jbGFzcy5pZCA6IDAsXG4gICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBfY2xhc3MgJiYgX2NsYXNzLmNvbG9yID8gX2NsYXNzLmNvbG9yIDogbnVsbCxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMudG9rZW5zID0gbmV3VG9rZW5zO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYSB0b2tlbiBibG9jayBhbmQgcHV0cyBiYWNrIGFsbCB0aGUgdG9rZW5zIGluIHRoZWlyIG9yaWdpbmFsIHBvc2l0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBibG9ja1N0YXJ0ICdzdGFydCcgdmFsdWUgb2YgdGhlIHRva2VuIGJsb2NrIHRvIHJlbW92ZVxuICAgKi9cbiAgcmVtb3ZlQmxvY2soYmxvY2tTdGFydCkge1xuICAgIGxldCBuZXdUb2tlbnMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudG9rZW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMudG9rZW5zW2ldLnR5cGUgPT09IFwidG9rZW4tYmxvY2tcIiAmJlxuICAgICAgICB0aGlzLnRva2Vuc1tpXS5zdGFydCA9PT0gYmxvY2tTdGFydFxuICAgICAgKSB7XG4gICAgICAgIG5ld1Rva2Vucy5wdXNoKC4uLnRoaXMudG9rZW5zW2ldLnRva2Vucyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBuZXdUb2tlbnMucHVzaCh0aGlzLnRva2Vuc1tpXSk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMudG9rZW5zID0gbmV3VG9rZW5zO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYWxsIHRoZSB0YWcgYmxvY2tzIGFuZCBsZWF2ZXMgb25seSB0b2tlbnNcbiAgICovXG4gIHJlc2V0QmxvY2tzKCkge1xuICAgIGxldCBuZXdUb2tlbnMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudG9rZW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodGhpcy50b2tlbnNbaV0udHlwZSA9PT0gXCJ0b2tlblwiKSB7XG4gICAgICAgIG5ld1Rva2Vucy5wdXNoKHRoaXMudG9rZW5zW2ldKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5ld1Rva2Vucy5wdXNoKC4uLnRoaXMudG9rZW5zW2ldLnRva2Vucyk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMudG9rZW5zID0gbmV3VG9rZW5zO1xuICB9XG5cbiAgLyoqXG4gICAqIEV4cG9ydHMgdGhlIHRva2VucyBhbmQgdGhlIHRva2VuIGJsb2NrcyBhcyBhbm5vdGF0aW9uc1xuICAgKi9cbiAgZXhwb3J0QXNBbm5vdGF0aW9uKCkge1xuICAgIGxldCBlbnRpdGllcyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50b2tlbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICh0aGlzLnRva2Vuc1tpXS50eXBlID09PSBcInRva2VuLWJsb2NrXCIpIHtcbiAgICAgICAgbGV0IGIgPSB0aGlzLnRva2Vuc1tpXTtcbiAgICAgICAgZW50aXRpZXMucHVzaChbYi5zdGFydCwgYi5lbmQsIGIubGFiZWxdKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGVudGl0aWVzO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRva2VuTWFuYWdlcjtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFBQTtBQU1BO0FBQUE7QUFBQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQURBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUEE7QUFTQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUEE7QUFTQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBOzs7Ozs7QUFHQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/components/token-manager.js\n");

/***/ })

})