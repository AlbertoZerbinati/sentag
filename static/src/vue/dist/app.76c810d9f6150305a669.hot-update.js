webpackHotUpdate("app",{

/***/ "./src/components/token-manager.js":
/*!*****************************************!*\
  !*** ./src/components/token-manager.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var core_js_modules_es_array_map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.map */ \"./node_modules/core-js/modules/es.array.map.js\");\n/* harmony import */ var core_js_modules_es_array_map__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_map__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.function.name */ \"./node_modules/core-js/modules/es.function.name.js\");\n/* harmony import */ var core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _home_zerbi_Documents_III_anno_tesi_sentag_ui_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/toConsumableArray */ \"./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js\");\n/* harmony import */ var _home_zerbi_Documents_III_anno_tesi_sentag_ui_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/classCallCheck */ \"./node_modules/@babel/runtime/helpers/esm/classCallCheck.js\");\n/* harmony import */ var _home_zerbi_Documents_III_anno_tesi_sentag_ui_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createClass */ \"./node_modules/@babel/runtime/helpers/esm/createClass.js\");\n\n\n\n\n\n\nvar TokenManager = /*#__PURE__*/function () {\n  /**\n   *\n   * @param {Array} tokens\n   */\n  function TokenManager(tokens) {\n    Object(_home_zerbi_Documents_III_anno_tesi_sentag_ui_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(this, TokenManager);\n\n    this.tokens = tokens.map(function (t) {\n      return {\n        type: \"token\",\n        start: t[0],\n        end: t[1],\n        text: t[2]\n      };\n    });\n    this.words = tokens.map(function (t) {\n      return t[2];\n    });\n  }\n  /**\n   * Creates a new token block with the tokens whose starts match the input\n   * parameters\n   *\n   * @param {Number} start 'start' value of the token forming the start of the token block\n   * @param {Number} end 'start' value of the token forming the end of the token block\n   * @param {Number} _class the id of the class to highlight\n   */\n\n\n  Object(_home_zerbi_Documents_III_anno_tesi_sentag_ui_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(TokenManager, [{\n    key: \"addNewBlock\",\n    value: function addNewBlock(_start, _end, _class) {\n      var selectedTokens = [];\n      var newTokens = [];\n      var start = _end < _start ? _end : _start;\n      var end = _end > _start ? _end : _start;\n      console.log(\"start: \" + start);\n      console.log(\"end: \" + end);\n\n      for (var i = 0; i < this.tokens.length; i++) {\n        var t = this.tokens[i];\n\n        if (t.start < start) {\n          newTokens.push(t);\n        } else if (t.type == \"token\" && t.start >= start && t.start <= end) {\n          selectedTokens.push(t);\n        } else if (t.start > start && selectedTokens.length) {\n          newTokens.push({\n            type: \"token-block\",\n            start: selectedTokens[0].start,\n            end: selectedTokens[selectedTokens.length - 1].end,\n            tokens: selectedTokens,\n            label: _class && _class.name ? _class.name : \"Unlabelled\",\n            classId: _class && _class.id ? _class.id : 0,\n            backgroundColor: _class && _class.color ? _class.color : null\n          });\n          selectedTokens = [];\n          newTokens.push(t);\n        } else {\n          newTokens.push(t);\n        }\n      } // Case if the selected tokens are at the end of the text and have not been added to the newTokens\n\n\n      if (selectedTokens.length) {\n        newTokens.push({\n          type: \"token-block\",\n          start: selectedTokens[0].start,\n          end: selectedTokens[selectedTokens.length - 1].end,\n          tokens: selectedTokens,\n          label: _class && _class.name ? _class.name : \"Unlabelled\",\n          classId: _class && _class.id ? _class.id : 0,\n          backgroundColor: _class && _class.color ? _class.color : null\n        });\n      }\n\n      this.tokens = newTokens;\n    }\n    /**\n     * Removes a token block and puts back all the tokens in their original position\n     *\n     * @param {Number} blockStart 'start' value of the token block to remove\n     */\n\n  }, {\n    key: \"removeBlock\",\n    value: function removeBlock(blockStart) {\n      var newTokens = [];\n\n      for (var i = 0; i < this.tokens.length; i++) {\n        if (this.tokens[i].type === \"token-block\" && this.tokens[i].start === blockStart) {\n          newTokens.push.apply(newTokens, Object(_home_zerbi_Documents_III_anno_tesi_sentag_ui_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(this.tokens[i].tokens));\n        } else {\n          newTokens.push(this.tokens[i]);\n        }\n      }\n\n      this.tokens = newTokens;\n    }\n    /**\n     * Removes all the tag blocks and leaves only tokens\n     */\n\n  }, {\n    key: \"resetBlocks\",\n    value: function resetBlocks() {\n      var newTokens = [];\n\n      for (var i = 0; i < this.tokens.length; i++) {\n        if (this.tokens[i].type === \"token\") {\n          newTokens.push(this.tokens[i]);\n        } else {\n          newTokens.push.apply(newTokens, Object(_home_zerbi_Documents_III_anno_tesi_sentag_ui_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(this.tokens[i].tokens));\n        }\n      }\n\n      this.tokens = newTokens;\n    }\n    /**\n     * Exports the tokens and the token blocks as annotations\n     */\n\n  }, {\n    key: \"exportAsAnnotation\",\n    value: function exportAsAnnotation() {\n      var entities = [];\n\n      for (var i = 0; i < this.tokens.length; i++) {\n        if (this.tokens[i].type === \"token-block\") {\n          var b = this.tokens[i];\n          entities.push([b.start, b.end, b.label]);\n        }\n      }\n\n      return entities;\n    }\n  }]);\n\n  return TokenManager;\n}();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (TokenManager);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy90b2tlbi1tYW5hZ2VyLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvdG9rZW4tbWFuYWdlci5qcz80N2E3Il0sInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFRva2VuTWFuYWdlciB7XG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge0FycmF5fSB0b2tlbnNcbiAgICovXG4gIGNvbnN0cnVjdG9yKHRva2Vucykge1xuICAgIHRoaXMudG9rZW5zID0gdG9rZW5zLm1hcCgodCkgPT4gKHtcbiAgICAgIHR5cGU6IFwidG9rZW5cIixcbiAgICAgIHN0YXJ0OiB0WzBdLFxuICAgICAgZW5kOiB0WzFdLFxuICAgICAgdGV4dDogdFsyXSxcbiAgICB9KSk7XG4gICAgdGhpcy53b3JkcyA9IHRva2Vucy5tYXAodCA9PiB0WzJdKTsgXG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyB0b2tlbiBibG9jayB3aXRoIHRoZSB0b2tlbnMgd2hvc2Ugc3RhcnRzIG1hdGNoIHRoZSBpbnB1dFxuICAgKiBwYXJhbWV0ZXJzXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBzdGFydCAnc3RhcnQnIHZhbHVlIG9mIHRoZSB0b2tlbiBmb3JtaW5nIHRoZSBzdGFydCBvZiB0aGUgdG9rZW4gYmxvY2tcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGVuZCAnc3RhcnQnIHZhbHVlIG9mIHRoZSB0b2tlbiBmb3JtaW5nIHRoZSBlbmQgb2YgdGhlIHRva2VuIGJsb2NrXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBfY2xhc3MgdGhlIGlkIG9mIHRoZSBjbGFzcyB0byBoaWdobGlnaHRcbiAgICovXG4gIGFkZE5ld0Jsb2NrKF9zdGFydCwgX2VuZCwgX2NsYXNzKSB7XG4gICAgbGV0IHNlbGVjdGVkVG9rZW5zID0gW107XG4gICAgbGV0IG5ld1Rva2VucyA9IFtdO1xuICAgIFxuICAgIGxldCBzdGFydCA9IF9lbmQgPCBfc3RhcnQgPyBfZW5kIDogX3N0YXJ0O1xuICAgIGxldCBlbmQgPSBfZW5kID4gX3N0YXJ0ID8gX2VuZCA6IF9zdGFydDtcblxuICAgIGNvbnNvbGUubG9nKFwic3RhcnQ6IFwiK3N0YXJ0KTtcbiAgICBjb25zb2xlLmxvZyhcImVuZDogXCIrZW5kKTtcbiAgICBcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudG9rZW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgdCA9IHRoaXMudG9rZW5zW2ldO1xuICAgICAgXG4gICAgICBpZiAodC5zdGFydCA8IHN0YXJ0KSB7XG4gICAgICAgIG5ld1Rva2Vucy5wdXNoKHQpO1xuICAgICAgfSBlbHNlIGlmICh0LnR5cGUgPT0gXCJ0b2tlblwiICYmIHQuc3RhcnQgPj0gc3RhcnQgJiYgdC5zdGFydCA8PSBlbmQpIHtcbiAgICAgICAgc2VsZWN0ZWRUb2tlbnMucHVzaCh0KTtcbiAgICAgIH0gZWxzZSBpZiAodC5zdGFydCA+IHN0YXJ0ICYmIHNlbGVjdGVkVG9rZW5zLmxlbmd0aCkge1xuICAgICAgICBuZXdUb2tlbnMucHVzaCh7XG4gICAgICAgICAgdHlwZTogXCJ0b2tlbi1ibG9ja1wiLFxuICAgICAgICAgIHN0YXJ0OiBzZWxlY3RlZFRva2Vuc1swXS5zdGFydCxcbiAgICAgICAgICBlbmQ6IHNlbGVjdGVkVG9rZW5zW3NlbGVjdGVkVG9rZW5zLmxlbmd0aCAtIDFdLmVuZCxcbiAgICAgICAgICB0b2tlbnM6IHNlbGVjdGVkVG9rZW5zLFxuICAgICAgICAgIGxhYmVsOiBfY2xhc3MgJiYgX2NsYXNzLm5hbWUgPyBfY2xhc3MubmFtZSA6IFwiVW5sYWJlbGxlZFwiLFxuICAgICAgICAgIGNsYXNzSWQ6IF9jbGFzcyAmJiBfY2xhc3MuaWQgPyBfY2xhc3MuaWQgOiAwLFxuICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogX2NsYXNzICYmIF9jbGFzcy5jb2xvciA/IF9jbGFzcy5jb2xvciA6IG51bGwsXG4gICAgICAgIH0pO1xuICAgICAgICBzZWxlY3RlZFRva2VucyA9IFtdO1xuICAgICAgICBuZXdUb2tlbnMucHVzaCh0KTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBuZXdUb2tlbnMucHVzaCh0KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBDYXNlIGlmIHRoZSBzZWxlY3RlZCB0b2tlbnMgYXJlIGF0IHRoZSBlbmQgb2YgdGhlIHRleHQgYW5kIGhhdmUgbm90IGJlZW4gYWRkZWQgdG8gdGhlIG5ld1Rva2Vuc1xuICAgIGlmIChzZWxlY3RlZFRva2Vucy5sZW5ndGgpIHtcbiAgICAgIG5ld1Rva2Vucy5wdXNoKHtcbiAgICAgICAgdHlwZTogXCJ0b2tlbi1ibG9ja1wiLFxuICAgICAgICAgIHN0YXJ0OiBzZWxlY3RlZFRva2Vuc1swXS5zdGFydCxcbiAgICAgICAgICBlbmQ6IHNlbGVjdGVkVG9rZW5zW3NlbGVjdGVkVG9rZW5zLmxlbmd0aCAtIDFdLmVuZCxcbiAgICAgICAgICB0b2tlbnM6IHNlbGVjdGVkVG9rZW5zLFxuICAgICAgICAgIGxhYmVsOiBfY2xhc3MgJiYgX2NsYXNzLm5hbWUgPyBfY2xhc3MubmFtZSA6IFwiVW5sYWJlbGxlZFwiLFxuICAgICAgICAgIGNsYXNzSWQ6IF9jbGFzcyAmJiBfY2xhc3MuaWQgPyBfY2xhc3MuaWQgOiAwLFxuICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogX2NsYXNzICYmIF9jbGFzcy5jb2xvciA/IF9jbGFzcy5jb2xvciA6IG51bGwsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB0aGlzLnRva2VucyA9IG5ld1Rva2VucztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGEgdG9rZW4gYmxvY2sgYW5kIHB1dHMgYmFjayBhbGwgdGhlIHRva2VucyBpbiB0aGVpciBvcmlnaW5hbCBwb3NpdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gYmxvY2tTdGFydCAnc3RhcnQnIHZhbHVlIG9mIHRoZSB0b2tlbiBibG9jayB0byByZW1vdmVcbiAgICovXG4gIHJlbW92ZUJsb2NrKGJsb2NrU3RhcnQpIHtcbiAgICBsZXQgbmV3VG9rZW5zID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnRva2Vucy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKFxuICAgICAgICB0aGlzLnRva2Vuc1tpXS50eXBlID09PSBcInRva2VuLWJsb2NrXCIgJiZcbiAgICAgICAgdGhpcy50b2tlbnNbaV0uc3RhcnQgPT09IGJsb2NrU3RhcnRcbiAgICAgICkge1xuICAgICAgICBuZXdUb2tlbnMucHVzaCguLi50aGlzLnRva2Vuc1tpXS50b2tlbnMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmV3VG9rZW5zLnB1c2godGhpcy50b2tlbnNbaV0pO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnRva2VucyA9IG5ld1Rva2VucztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGFsbCB0aGUgdGFnIGJsb2NrcyBhbmQgbGVhdmVzIG9ubHkgdG9rZW5zXG4gICAqL1xuICByZXNldEJsb2NrcygpIHtcbiAgICBsZXQgbmV3VG9rZW5zID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnRva2Vucy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHRoaXMudG9rZW5zW2ldLnR5cGUgPT09IFwidG9rZW5cIikge1xuICAgICAgICBuZXdUb2tlbnMucHVzaCh0aGlzLnRva2Vuc1tpXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBuZXdUb2tlbnMucHVzaCguLi50aGlzLnRva2Vuc1tpXS50b2tlbnMpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnRva2VucyA9IG5ld1Rva2VucztcbiAgfVxuXG4gIC8qKlxuICAgKiBFeHBvcnRzIHRoZSB0b2tlbnMgYW5kIHRoZSB0b2tlbiBibG9ja3MgYXMgYW5ub3RhdGlvbnNcbiAgICovXG4gIGV4cG9ydEFzQW5ub3RhdGlvbigpIHtcbiAgICBsZXQgZW50aXRpZXMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudG9rZW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodGhpcy50b2tlbnNbaV0udHlwZSA9PT0gXCJ0b2tlbi1ibG9ja1wiKSB7XG4gICAgICAgIGxldCBiID0gdGhpcy50b2tlbnNbaV07XG4gICAgICAgIGVudGl0aWVzLnB1c2goW2Iuc3RhcnQsIGIuZW5kLCBiLmxhYmVsXSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBlbnRpdGllcztcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBUb2tlbk1hbmFnZXI7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBQUE7QUFNQTtBQUFBO0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFEQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFQQTtBQVNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFQQTtBQVNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7Ozs7OztBQUdBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/components/token-manager.js\n");

/***/ })

})