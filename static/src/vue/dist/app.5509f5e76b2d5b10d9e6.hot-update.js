webpackHotUpdate("app",{

/***/ "./src/store.js":
/*!**********************!*\
  !*** ./src/store.js ***!
  \**********************/
/*! exports provided: mutations, getters, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"mutations\", function() { return mutations; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getters\", function() { return getters; });\n/* harmony import */ var core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.filter */ \"./node_modules/core-js/modules/es.array.filter.js\");\n/* harmony import */ var core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.find */ \"./node_modules/core-js/modules/es.array.find.js\");\n/* harmony import */ var core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var core_js_modules_es_array_map__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.map */ \"./node_modules/core-js/modules/es.array.map.js\");\n/* harmony import */ var core_js_modules_es_array_map__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_map__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var core_js_modules_es_array_reduce__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.reduce */ \"./node_modules/core-js/modules/es.array.reduce.js\");\n/* harmony import */ var core_js_modules_es_array_reduce__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_reduce__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.regexp.exec */ \"./node_modules/core-js/modules/es.regexp.exec.js\");\n/* harmony import */ var core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var core_js_modules_es_string_split__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.string.split */ \"./node_modules/core-js/modules/es.string.split.js\");\n/* harmony import */ var core_js_modules_es_string_split__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_split__WEBPACK_IMPORTED_MODULE_5__);\n\n\n\n\n\n\nvar niceColors = [\"#FFEE00\", //giallo\n\"#FCD060\", //giallo scuro\n\"#B4FFB3\", //verde chiaro\n\"#85DE77\", //verde\n\"#8DA290\", //verde scuro\n\"#B8E1ED\", //azzurro\n\"#95B4CC\", //turchese\n\"#63CBBF\", //cobalto\n\"#4F9EC4\", //blu\n\"#9375C3\", //viola\n\"#D95DEA\", //fucsia\n\"#C7A4DA\", //violetto\n\"#FFB8DE\", //rosa\n\"#FF756D\", //rosso\n\"#f7933b\", //arancio\n\"#DFA995\", //marrone\n\"#D5D5D5\" //grigio (15)\n];\nvar mutations = {\n  setInputSentences: function setInputSentences(state, payload) {\n    if (!Array.isArray(payload)) {\n      state.originalText = payload;\n      payload = payload.split();\n    }\n\n    state.inputSentences = payload.map(function (s, i) {\n      return {\n        id: i,\n        text: s\n      };\n    });\n  },\n  addClass: function addClass(state, payload) {\n    // let existing = state.classes.find((c) => c.name == payload[0]);\n    // if (existing) {\n    //   return;\n    // }\n    var lastIndex = state.classes.reduce(function (p, c) {\n      return c.id > p ? c.id : p;\n    }, 0);\n    state.classes.push({\n      id: lastIndex + 1,\n      name: payload[0],\n      attributes: payload[1],\n      color: niceColors[lastIndex % niceColors.length]\n    });\n\n    if (state.classes.length === 1) {\n      state.currentClass = state.classes[0];\n    }\n  },\n  removeClass: function removeClass(state, payload) {\n    state.classes = state.classes.filter(function (c) {\n      return c.id != payload;\n    });\n\n    if (state.currentClass.id === payload) {\n      state.currentClass = state.classes[0];\n    }\n  },\n  setCurrentClass: function setCurrentClass(state, payload) {\n    state.currentClass = state.classes.find(function (c) {\n      return c.id === payload;\n    });\n  },\n  // setCurrentBlock(state, payload) {\n  //   state.currentBlock = payload;\n  // },\n  addAnnotation: function addAnnotation(state, payload) {\n    state.annotations.push(payload);\n  }\n};\nvar getters = {};\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  state: function state() {\n    return {\n      originalText: \"\",\n      classes: [],\n      inputSentences: [],\n      annotations: [],\n      currentClass: {} //currentBlock: -1,\n\n    };\n  },\n  getters: getters,\n  mutations: mutations,\n  actions: {}\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvc3RvcmUuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc3RvcmUuanM/YzBkNiJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBuaWNlQ29sb3JzID0gW1xuICBcIiNGRkVFMDBcIiwgLy9naWFsbG9cbiAgXCIjRkNEMDYwXCIsIC8vZ2lhbGxvIHNjdXJvXG4gIFwiI0I0RkZCM1wiLCAvL3ZlcmRlIGNoaWFyb1xuICBcIiM4NURFNzdcIiwgLy92ZXJkZVxuICBcIiM4REEyOTBcIiwgLy92ZXJkZSBzY3Vyb1xuICBcIiNCOEUxRURcIiwgLy9henp1cnJvXG4gIFwiIzk1QjRDQ1wiLCAvL3R1cmNoZXNlXG4gIFwiIzYzQ0JCRlwiLCAvL2NvYmFsdG9cbiAgXCIjNEY5RUM0XCIsIC8vYmx1XG4gIFwiIzkzNzVDM1wiLCAvL3Zpb2xhXG4gIFwiI0Q5NURFQVwiLCAvL2Z1Y3NpYVxuICBcIiNDN0E0REFcIiwgLy92aW9sZXR0b1xuICBcIiNGRkI4REVcIiwgLy9yb3NhXG4gIFwiI0ZGNzU2RFwiLCAvL3Jvc3NvXG4gIFwiI2Y3OTMzYlwiLCAvL2FyYW5jaW9cbiAgXCIjREZBOTk1XCIsIC8vbWFycm9uZVxuICBcIiNENUQ1RDVcIiwgLy9ncmlnaW8gKDE1KVxuXG5dO1xuXG5leHBvcnQgY29uc3QgbXV0YXRpb25zID0ge1xuICBzZXRJbnB1dFNlbnRlbmNlcyhzdGF0ZSwgcGF5bG9hZCkge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShwYXlsb2FkKSkge1xuICAgICAgc3RhdGUub3JpZ2luYWxUZXh0ID0gcGF5bG9hZDtcbiAgICAgIHBheWxvYWQgPSBwYXlsb2FkLnNwbGl0KCk7XG4gICAgfVxuICAgIHN0YXRlLmlucHV0U2VudGVuY2VzID0gcGF5bG9hZC5tYXAoKHMsIGkpID0+ICh7IGlkOiBpLCB0ZXh0OiBzIH0pKTtcbiAgfSxcbiAgYWRkQ2xhc3Moc3RhdGUsIHBheWxvYWQpIHtcbiAgICAvLyBsZXQgZXhpc3RpbmcgPSBzdGF0ZS5jbGFzc2VzLmZpbmQoKGMpID0+IGMubmFtZSA9PSBwYXlsb2FkWzBdKTtcbiAgICAvLyBpZiAoZXhpc3RpbmcpIHtcbiAgICAvLyAgIHJldHVybjtcbiAgICAvLyB9XG4gICAgbGV0IGxhc3RJbmRleCA9IHN0YXRlLmNsYXNzZXMucmVkdWNlKChwLCBjKSA9PiB7XG4gICAgICByZXR1cm4gYy5pZCA+IHAgPyBjLmlkIDogcDtcbiAgICB9LCAwKTtcbiAgICBzdGF0ZS5jbGFzc2VzLnB1c2goe1xuICAgICAgaWQ6IGxhc3RJbmRleCArIDEsXG4gICAgICBuYW1lOiBwYXlsb2FkWzBdLFxuICAgICAgYXR0cmlidXRlczogcGF5bG9hZFsxXSxcbiAgICAgIGNvbG9yOiBuaWNlQ29sb3JzW2xhc3RJbmRleCAlIG5pY2VDb2xvcnMubGVuZ3RoXSxcbiAgICB9KTtcbiAgICBpZiAoc3RhdGUuY2xhc3Nlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgIHN0YXRlLmN1cnJlbnRDbGFzcyA9IHN0YXRlLmNsYXNzZXNbMF07XG4gICAgfVxuICB9LFxuICByZW1vdmVDbGFzcyhzdGF0ZSwgcGF5bG9hZCkge1xuICAgIHN0YXRlLmNsYXNzZXMgPSBzdGF0ZS5jbGFzc2VzLmZpbHRlcigoYykgPT4gYy5pZCAhPSBwYXlsb2FkKTtcbiAgICBpZiAoc3RhdGUuY3VycmVudENsYXNzLmlkID09PSBwYXlsb2FkKSB7XG4gICAgICBzdGF0ZS5jdXJyZW50Q2xhc3MgPSBzdGF0ZS5jbGFzc2VzWzBdO1xuICAgIH1cbiAgfSxcbiAgc2V0Q3VycmVudENsYXNzKHN0YXRlLCBwYXlsb2FkKSB7XG4gICAgc3RhdGUuY3VycmVudENsYXNzID0gc3RhdGUuY2xhc3Nlcy5maW5kKChjKSA9PiBjLmlkID09PSBwYXlsb2FkKTtcbiAgfSxcbiAgLy8gc2V0Q3VycmVudEJsb2NrKHN0YXRlLCBwYXlsb2FkKSB7XG4gIC8vICAgc3RhdGUuY3VycmVudEJsb2NrID0gcGF5bG9hZDtcbiAgLy8gfSxcbiAgYWRkQW5ub3RhdGlvbihzdGF0ZSwgcGF5bG9hZCkge1xuICAgIHN0YXRlLmFubm90YXRpb25zLnB1c2gocGF5bG9hZCk7XG4gIH0sXG59O1xuXG5leHBvcnQgY29uc3QgZ2V0dGVycyA9IHt9O1xuZXhwb3J0IGRlZmF1bHQge1xuICBzdGF0ZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgb3JpZ2luYWxUZXh0OiBcIlwiLFxuICAgICAgY2xhc3NlczogW10sXG4gICAgICBpbnB1dFNlbnRlbmNlczogW10sXG4gICAgICBhbm5vdGF0aW9uczogW10sXG4gICAgICBjdXJyZW50Q2xhc3M6IHt9LFxuICAgICAgLy9jdXJyZW50QmxvY2s6IC0xLFxuICAgIH07XG4gIH0sXG4gIGdldHRlcnMsXG4gIG11dGF0aW9ucyxcbiAgYWN0aW9uczoge30sXG59O1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBakJBO0FBcUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBQ0E7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUF4Q0E7QUEyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFOQTtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBYkEiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/store.js\n");

/***/ })

})