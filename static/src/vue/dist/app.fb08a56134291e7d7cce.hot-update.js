webpackHotUpdate("app",{

/***/ "./src/store.js":
/*!**********************!*\
  !*** ./src/store.js ***!
  \**********************/
/*! exports provided: mutations, getters, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"mutations\", function() { return mutations; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getters\", function() { return getters; });\n/* harmony import */ var core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.filter */ \"./node_modules/core-js/modules/es.array.filter.js\");\n/* harmony import */ var core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.find */ \"./node_modules/core-js/modules/es.array.find.js\");\n/* harmony import */ var core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var core_js_modules_es_array_map__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.map */ \"./node_modules/core-js/modules/es.array.map.js\");\n/* harmony import */ var core_js_modules_es_array_map__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_map__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var core_js_modules_es_array_reduce__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.reduce */ \"./node_modules/core-js/modules/es.array.reduce.js\");\n/* harmony import */ var core_js_modules_es_array_reduce__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_reduce__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.function.name */ \"./node_modules/core-js/modules/es.function.name.js\");\n/* harmony import */ var core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.regexp.exec */ \"./node_modules/core-js/modules/es.regexp.exec.js\");\n/* harmony import */ var core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var core_js_modules_es_string_split__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.string.split */ \"./node_modules/core-js/modules/es.string.split.js\");\n/* harmony import */ var core_js_modules_es_string_split__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_split__WEBPACK_IMPORTED_MODULE_6__);\n\n\n\n\n\n\n\nvar niceColors = [\"#eece12\", \"#bdff96\", \"#96ffee\", \"#96bbff\", \"#be96ff\", \"#ef96ff\", \"#ff96d2\", \"#ff9696\", \"#ffd596\"];\nvar mutations = {\n  setInputSentences: function setInputSentences(state, payload) {\n    if (!Array.isArray(payload)) {\n      state.originalText = payload;\n      payload = payload.split(state.separator);\n    }\n\n    state.inputSentences = payload.map(function (s, i) {\n      return {\n        id: i,\n        text: s\n      };\n    });\n  },\n  addClass: function addClass(state, payload) {\n    var existing = state.classes.find(function (c) {\n      return c.name == payload;\n    });\n\n    if (existing) {\n      return;\n    }\n\n    var lastIndex = state.classes.reduce(function (p, c) {\n      return c.id > p ? c.id : p;\n    }, 0);\n    state.classes.push({\n      id: lastIndex + 1,\n      name: payload,\n      color: niceColors[lastIndex % niceColors.length]\n    });\n\n    if (state.classes.length === 1) {\n      state.currentClass = state.classes[0];\n    }\n  },\n  removeClass: function removeClass(state, payload) {\n    state.classes = state.classes.filter(function (c) {\n      return c.id != payload;\n    });\n\n    if (state.currentClass.id === payload) {\n      state.currentClass = state.classes[0];\n    }\n  },\n  setCurrentClass: function setCurrentClass(state, payload) {\n    state.currentClass = state.classes.find(function (c) {\n      return c.id === payload;\n    });\n  },\n  addAnnotation: function addAnnotation(state, payload) {\n    state.annotations.push(payload);\n  },\n  setSeparator: function setSeparator(state, payload) {\n    state.separator = payload;\n    var sentences = state.originalText.split(state.separator);\n    state.inputSentences = sentences.map(function (s, i) {\n      return {\n        id: i,\n        text: s\n      };\n    });\n  }\n};\nvar getters = {};\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  state: function state() {\n    return {\n      originalText: \"\",\n      separator: \"\\n\\n\\n\\n\",\n      classes: [],\n      inputSentences: [],\n      annotations: [],\n      currentClass: {}\n    };\n  },\n  getters: getters,\n  mutations: mutations,\n  actions: {}\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvc3RvcmUuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc3RvcmUuanM/YzBkNiJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBuaWNlQ29sb3JzID0gW1xuICBcIiNlZWNlMTJcIixcbiAgXCIjYmRmZjk2XCIsXG4gIFwiIzk2ZmZlZVwiLFxuICBcIiM5NmJiZmZcIixcbiAgXCIjYmU5NmZmXCIsXG4gIFwiI2VmOTZmZlwiLFxuICBcIiNmZjk2ZDJcIixcbiAgXCIjZmY5Njk2XCIsXG4gIFwiI2ZmZDU5NlwiLFxuXTtcblxuZXhwb3J0IGNvbnN0IG11dGF0aW9ucyA9IHtcbiAgc2V0SW5wdXRTZW50ZW5jZXMoc3RhdGUsIHBheWxvYWQpIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkocGF5bG9hZCkpIHtcbiAgICAgIHN0YXRlLm9yaWdpbmFsVGV4dCA9IHBheWxvYWQ7XG4gICAgICBwYXlsb2FkID0gcGF5bG9hZC5zcGxpdChzdGF0ZS5zZXBhcmF0b3IpO1xuICAgIH1cbiAgICBzdGF0ZS5pbnB1dFNlbnRlbmNlcyA9IHBheWxvYWQubWFwKChzLCBpKSA9PiAoeyBpZDogaSwgdGV4dDogcyB9KSk7XG4gIH0sXG4gIGFkZENsYXNzKHN0YXRlLCBwYXlsb2FkKSB7XG4gICAgbGV0IGV4aXN0aW5nID0gc3RhdGUuY2xhc3Nlcy5maW5kKChjKSA9PiBjLm5hbWUgPT0gcGF5bG9hZCk7XG4gICAgaWYgKGV4aXN0aW5nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGxldCBsYXN0SW5kZXggPSBzdGF0ZS5jbGFzc2VzLnJlZHVjZSgocCwgYykgPT4ge1xuICAgICAgcmV0dXJuIGMuaWQgPiBwID8gYy5pZCA6IHA7XG4gICAgfSwgMCk7XG4gICAgc3RhdGUuY2xhc3Nlcy5wdXNoKHtcbiAgICAgIGlkOiBsYXN0SW5kZXggKyAxLFxuICAgICAgbmFtZTogcGF5bG9hZCxcbiAgICAgIGNvbG9yOiBuaWNlQ29sb3JzW2xhc3RJbmRleCAlIG5pY2VDb2xvcnMubGVuZ3RoXSxcbiAgICB9KTtcbiAgICBpZiAoc3RhdGUuY2xhc3Nlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgIHN0YXRlLmN1cnJlbnRDbGFzcyA9IHN0YXRlLmNsYXNzZXNbMF07XG4gICAgfVxuICB9LFxuICByZW1vdmVDbGFzcyhzdGF0ZSwgcGF5bG9hZCkge1xuICAgIHN0YXRlLmNsYXNzZXMgPSBzdGF0ZS5jbGFzc2VzLmZpbHRlcigoYykgPT4gYy5pZCAhPSBwYXlsb2FkKTtcbiAgICBpZiAoc3RhdGUuY3VycmVudENsYXNzLmlkID09PSBwYXlsb2FkKSB7XG4gICAgICBzdGF0ZS5jdXJyZW50Q2xhc3MgPSBzdGF0ZS5jbGFzc2VzWzBdO1xuICAgIH1cbiAgfSxcbiAgc2V0Q3VycmVudENsYXNzKHN0YXRlLCBwYXlsb2FkKSB7XG4gICAgc3RhdGUuY3VycmVudENsYXNzID0gc3RhdGUuY2xhc3Nlcy5maW5kKChjKSA9PiBjLmlkID09PSBwYXlsb2FkKTtcbiAgfSxcbiAgYWRkQW5ub3RhdGlvbihzdGF0ZSwgcGF5bG9hZCkge1xuICAgIHN0YXRlLmFubm90YXRpb25zLnB1c2gocGF5bG9hZCk7XG4gIH0sXG4gIHNldFNlcGFyYXRvcihzdGF0ZSwgcGF5bG9hZCkge1xuICAgIHN0YXRlLnNlcGFyYXRvciA9IHBheWxvYWQ7XG4gICAgY29uc3Qgc2VudGVuY2VzID0gc3RhdGUub3JpZ2luYWxUZXh0LnNwbGl0KHN0YXRlLnNlcGFyYXRvcik7XG4gICAgc3RhdGUuaW5wdXRTZW50ZW5jZXMgPSBzZW50ZW5jZXMubWFwKChzLCBpKSA9PiAoeyBpZDogaSwgdGV4dDogcyB9KSk7XG4gIH0sXG59O1xuXG5leHBvcnQgY29uc3QgZ2V0dGVycyA9IHt9O1xuZXhwb3J0IGRlZmF1bHQge1xuICBzdGF0ZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgb3JpZ2luYWxUZXh0OiBcIlwiLFxuICAgICAgc2VwYXJhdG9yOiBcIlxcblxcblxcblxcblwiLFxuICAgICAgY2xhc3NlczogW10sXG4gICAgICBpbnB1dFNlbnRlbmNlczogW10sXG4gICAgICBhbm5vdGF0aW9uczogW10sXG4gICAgICBjdXJyZW50Q2xhc3M6IHt9LFxuICAgIH07XG4gIH0sXG4gIGdldHRlcnMsXG4gIG11dGF0aW9ucyxcbiAgYWN0aW9uczoge30sXG59O1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQVlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQXpDQTtBQTRDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU5BO0FBUUE7QUFDQTtBQUNBO0FBQ0E7QUFiQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/store.js\n");

/***/ })

})