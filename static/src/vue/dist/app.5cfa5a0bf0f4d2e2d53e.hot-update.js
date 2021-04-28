webpackHotUpdate("app",{

/***/ "./src/store.js":
/*!**********************!*\
  !*** ./src/store.js ***!
  \**********************/
/*! exports provided: mutations, getters, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"mutations\", function() { return mutations; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getters\", function() { return getters; });\n/* harmony import */ var core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.filter */ \"./node_modules/core-js/modules/es.array.filter.js\");\n/* harmony import */ var core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.find */ \"./node_modules/core-js/modules/es.array.find.js\");\n/* harmony import */ var core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var core_js_modules_es_array_map__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.map */ \"./node_modules/core-js/modules/es.array.map.js\");\n/* harmony import */ var core_js_modules_es_array_map__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_map__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var core_js_modules_es_array_reduce__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.reduce */ \"./node_modules/core-js/modules/es.array.reduce.js\");\n/* harmony import */ var core_js_modules_es_array_reduce__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_reduce__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.function.name */ \"./node_modules/core-js/modules/es.function.name.js\");\n/* harmony import */ var core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.regexp.exec */ \"./node_modules/core-js/modules/es.regexp.exec.js\");\n/* harmony import */ var core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var core_js_modules_es_string_split__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.string.split */ \"./node_modules/core-js/modules/es.string.split.js\");\n/* harmony import */ var core_js_modules_es_string_split__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_split__WEBPACK_IMPORTED_MODULE_6__);\n\n\n\n\n\n\n\nvar niceColors = [\"#ffdf0\", \"#bdff96\", \"#96ffee\", \"#96bbff\", \"#be96ff\", \"#ef96ff\", \"#ff96d2\", \"#ff9696\", \"#ffd596\"];\nvar mutations = {\n  setInputSentences: function setInputSentences(state, payload) {\n    if (!Array.isArray(payload)) {\n      state.originalText = payload;\n      payload = payload.split(state.separator);\n    }\n\n    state.inputSentences = payload.map(function (s, i) {\n      return {\n        id: i,\n        text: s\n      };\n    });\n  },\n  addClass: function addClass(state, payload) {\n    var existing = state.classes.find(function (c) {\n      return c.name == payload;\n    });\n\n    if (existing) {\n      return;\n    }\n\n    var lastIndex = state.classes.reduce(function (p, c) {\n      return c.id > p ? c.id : p;\n    }, 0);\n    state.classes.push({\n      id: lastIndex + 1,\n      name: payload,\n      color: niceColors[lastIndex % niceColors.length]\n    });\n\n    if (state.classes.length === 1) {\n      state.currentClass = state.classes[0];\n    }\n  },\n  removeClass: function removeClass(state, payload) {\n    state.classes = state.classes.filter(function (c) {\n      return c.id != payload;\n    });\n\n    if (state.currentClass.id === payload) {\n      state.currentClass = state.classes[0];\n    }\n  },\n  setCurrentClass: function setCurrentClass(state, payload) {\n    state.currentClass = state.classes.find(function (c) {\n      return c.id === payload;\n    });\n  },\n  addAnnotation: function addAnnotation(state, payload) {\n    state.annotations.push(payload);\n  },\n  setSeparator: function setSeparator(state, payload) {\n    state.separator = payload;\n    var sentences = state.originalText.split(state.separator);\n    state.inputSentences = sentences.map(function (s, i) {\n      return {\n        id: i,\n        text: s\n      };\n    });\n  }\n};\nvar getters = {};\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  state: function state() {\n    return {\n      originalText: \"\",\n      separator: \"\\n\\n\\n\\n\",\n      classes: [],\n      inputSentences: [],\n      annotations: [],\n      currentClass: {}\n    };\n  },\n  getters: getters,\n  mutations: mutations,\n  actions: {}\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvc3RvcmUuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc3RvcmUuanM/YzBkNiJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBuaWNlQ29sb3JzID0gW1xuICBcIiNmZmRmMFwiLFxuICBcIiNiZGZmOTZcIixcbiAgXCIjOTZmZmVlXCIsXG4gIFwiIzk2YmJmZlwiLFxuICBcIiNiZTk2ZmZcIixcbiAgXCIjZWY5NmZmXCIsXG4gIFwiI2ZmOTZkMlwiLFxuICBcIiNmZjk2OTZcIixcbiAgXCIjZmZkNTk2XCIsXG5dO1xuXG5leHBvcnQgY29uc3QgbXV0YXRpb25zID0ge1xuICBzZXRJbnB1dFNlbnRlbmNlcyhzdGF0ZSwgcGF5bG9hZCkge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShwYXlsb2FkKSkge1xuICAgICAgc3RhdGUub3JpZ2luYWxUZXh0ID0gcGF5bG9hZDtcbiAgICAgIHBheWxvYWQgPSBwYXlsb2FkLnNwbGl0KHN0YXRlLnNlcGFyYXRvcik7XG4gICAgfVxuICAgIHN0YXRlLmlucHV0U2VudGVuY2VzID0gcGF5bG9hZC5tYXAoKHMsIGkpID0+ICh7IGlkOiBpLCB0ZXh0OiBzIH0pKTtcbiAgfSxcbiAgYWRkQ2xhc3Moc3RhdGUsIHBheWxvYWQpIHtcbiAgICBsZXQgZXhpc3RpbmcgPSBzdGF0ZS5jbGFzc2VzLmZpbmQoKGMpID0+IGMubmFtZSA9PSBwYXlsb2FkKTtcbiAgICBpZiAoZXhpc3RpbmcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbGV0IGxhc3RJbmRleCA9IHN0YXRlLmNsYXNzZXMucmVkdWNlKChwLCBjKSA9PiB7XG4gICAgICByZXR1cm4gYy5pZCA+IHAgPyBjLmlkIDogcDtcbiAgICB9LCAwKTtcbiAgICBzdGF0ZS5jbGFzc2VzLnB1c2goe1xuICAgICAgaWQ6IGxhc3RJbmRleCArIDEsXG4gICAgICBuYW1lOiBwYXlsb2FkLFxuICAgICAgY29sb3I6IG5pY2VDb2xvcnNbbGFzdEluZGV4ICUgbmljZUNvbG9ycy5sZW5ndGhdLFxuICAgIH0pO1xuICAgIGlmIChzdGF0ZS5jbGFzc2VzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgc3RhdGUuY3VycmVudENsYXNzID0gc3RhdGUuY2xhc3Nlc1swXTtcbiAgICB9XG4gIH0sXG4gIHJlbW92ZUNsYXNzKHN0YXRlLCBwYXlsb2FkKSB7XG4gICAgc3RhdGUuY2xhc3NlcyA9IHN0YXRlLmNsYXNzZXMuZmlsdGVyKChjKSA9PiBjLmlkICE9IHBheWxvYWQpO1xuICAgIGlmIChzdGF0ZS5jdXJyZW50Q2xhc3MuaWQgPT09IHBheWxvYWQpIHtcbiAgICAgIHN0YXRlLmN1cnJlbnRDbGFzcyA9IHN0YXRlLmNsYXNzZXNbMF07XG4gICAgfVxuICB9LFxuICBzZXRDdXJyZW50Q2xhc3Moc3RhdGUsIHBheWxvYWQpIHtcbiAgICBzdGF0ZS5jdXJyZW50Q2xhc3MgPSBzdGF0ZS5jbGFzc2VzLmZpbmQoKGMpID0+IGMuaWQgPT09IHBheWxvYWQpO1xuICB9LFxuICBhZGRBbm5vdGF0aW9uKHN0YXRlLCBwYXlsb2FkKSB7XG4gICAgc3RhdGUuYW5ub3RhdGlvbnMucHVzaChwYXlsb2FkKTtcbiAgfSxcbiAgc2V0U2VwYXJhdG9yKHN0YXRlLCBwYXlsb2FkKSB7XG4gICAgc3RhdGUuc2VwYXJhdG9yID0gcGF5bG9hZDtcbiAgICBjb25zdCBzZW50ZW5jZXMgPSBzdGF0ZS5vcmlnaW5hbFRleHQuc3BsaXQoc3RhdGUuc2VwYXJhdG9yKTtcbiAgICBzdGF0ZS5pbnB1dFNlbnRlbmNlcyA9IHNlbnRlbmNlcy5tYXAoKHMsIGkpID0+ICh7IGlkOiBpLCB0ZXh0OiBzIH0pKTtcbiAgfSxcbn07XG5cbmV4cG9ydCBjb25zdCBnZXR0ZXJzID0ge307XG5leHBvcnQgZGVmYXVsdCB7XG4gIHN0YXRlKCkge1xuICAgIHJldHVybiB7XG4gICAgICBvcmlnaW5hbFRleHQ6IFwiXCIsXG4gICAgICBzZXBhcmF0b3I6IFwiXFxuXFxuXFxuXFxuXCIsXG4gICAgICBjbGFzc2VzOiBbXSxcbiAgICAgIGlucHV0U2VudGVuY2VzOiBbXSxcbiAgICAgIGFubm90YXRpb25zOiBbXSxcbiAgICAgIGN1cnJlbnRDbGFzczoge30sXG4gICAgfTtcbiAgfSxcbiAgZ2V0dGVycyxcbiAgbXV0YXRpb25zLFxuICBhY3Rpb25zOiB7fSxcbn07XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBWUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBekNBO0FBNENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTkE7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQWJBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/store.js\n");

/***/ })

})