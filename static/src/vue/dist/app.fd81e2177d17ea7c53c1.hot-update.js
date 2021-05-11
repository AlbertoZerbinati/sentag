webpackHotUpdate("app",{

/***/ "./src/store.js":
/*!**********************!*\
  !*** ./src/store.js ***!
  \**********************/
/*! exports provided: mutations, getters, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"mutations\", function() { return mutations; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getters\", function() { return getters; });\n/* harmony import */ var core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.filter */ \"./node_modules/core-js/modules/es.array.filter.js\");\n/* harmony import */ var core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.find */ \"./node_modules/core-js/modules/es.array.find.js\");\n/* harmony import */ var core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var core_js_modules_es_array_map__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.map */ \"./node_modules/core-js/modules/es.array.map.js\");\n/* harmony import */ var core_js_modules_es_array_map__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_map__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var core_js_modules_es_array_reduce__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.reduce */ \"./node_modules/core-js/modules/es.array.reduce.js\");\n/* harmony import */ var core_js_modules_es_array_reduce__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_reduce__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.regexp.exec */ \"./node_modules/core-js/modules/es.regexp.exec.js\");\n/* harmony import */ var core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var core_js_modules_es_string_split__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.string.split */ \"./node_modules/core-js/modules/es.string.split.js\");\n/* harmony import */ var core_js_modules_es_string_split__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_split__WEBPACK_IMPORTED_MODULE_5__);\n\n\n\n\n\n\nvar niceColors = [\"#FFEE00\", //giallo\n\"#FCD060\", //giallo scuro\n\"#B4FFB3\", //verde chiaro\n\"#85DE77\", //verde\n\"#8DA290\", //verde scuro\n\"#B8E1ED\", //azzurro\n\"#95B4CC\", //turchese\n\"#4F9EC4\", //blu\n\"#DB24CC\", //fucsia\n\"#9375C3\", //viola\n\"#E0CAED\", //violetto\n\"#FFB8DE\", //rosa\n\"#FF756D\", //rosso\n\"#f7933b\", //arancio\n\"#DFA995\", //marrone\n\"#D5D5D5\" //grigio (15)\n];\nvar mutations = {\n  setInputSentences: function setInputSentences(state, payload) {\n    if (!Array.isArray(payload)) {\n      state.originalText = payload;\n      payload = payload.split();\n    }\n\n    state.inputSentences = payload.map(function (s, i) {\n      return {\n        id: i,\n        text: s\n      };\n    });\n  },\n  addClass: function addClass(state, payload) {\n    // let existing = state.classes.find((c) => c.name == payload[0]);\n    // if (existing) {\n    //   return;\n    // }\n    var lastIndex = state.classes.reduce(function (p, c) {\n      return c.id > p ? c.id : p;\n    }, 0);\n    state.classes.push({\n      id: lastIndex + 1,\n      name: payload[0],\n      attributes: payload[1],\n      color: niceColors[lastIndex % niceColors.length]\n    });\n\n    if (state.classes.length === 1) {\n      state.currentClass = state.classes[0];\n    }\n  },\n  removeClass: function removeClass(state, payload) {\n    state.classes = state.classes.filter(function (c) {\n      return c.id != payload;\n    });\n\n    if (state.currentClass.id === payload) {\n      state.currentClass = state.classes[0];\n    }\n  },\n  setCurrentClass: function setCurrentClass(state, payload) {\n    state.currentClass = state.classes.find(function (c) {\n      return c.id === payload;\n    });\n  },\n  // setCurrentBlock(state, payload) {\n  //   state.currentBlock = payload;\n  // },\n  addAnnotation: function addAnnotation(state, payload) {\n    state.annotations.push(payload);\n  }\n};\nvar getters = {};\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  state: function state() {\n    return {\n      originalText: \"\",\n      classes: [],\n      inputSentences: [],\n      annotations: [],\n      currentClass: {} //currentBlock: -1,\n\n    };\n  },\n  getters: getters,\n  mutations: mutations,\n  actions: {}\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvc3RvcmUuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc3RvcmUuanM/YzBkNiJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBuaWNlQ29sb3JzID0gW1xuICBcIiNGRkVFMDBcIiwgLy9naWFsbG9cbiAgXCIjRkNEMDYwXCIsIC8vZ2lhbGxvIHNjdXJvXG4gIFwiI0I0RkZCM1wiLCAvL3ZlcmRlIGNoaWFyb1xuICBcIiM4NURFNzdcIiwgLy92ZXJkZVxuICBcIiM4REEyOTBcIiwgLy92ZXJkZSBzY3Vyb1xuICBcIiNCOEUxRURcIiwgLy9henp1cnJvXG4gIFwiIzk1QjRDQ1wiLCAvL3R1cmNoZXNlXG4gIFwiIzRGOUVDNFwiLCAvL2JsdVxuICBcIiNEQjI0Q0NcIiwgLy9mdWNzaWFcbiAgXCIjOTM3NUMzXCIsIC8vdmlvbGFcbiAgXCIjRTBDQUVEXCIsIC8vdmlvbGV0dG9cbiAgXCIjRkZCOERFXCIsIC8vcm9zYVxuICBcIiNGRjc1NkRcIiwgLy9yb3Nzb1xuICBcIiNmNzkzM2JcIiwgLy9hcmFuY2lvXG4gIFwiI0RGQTk5NVwiLCAvL21hcnJvbmVcbiAgXCIjRDVENUQ1XCIsIC8vZ3JpZ2lvICgxNSlcblxuXTtcblxuZXhwb3J0IGNvbnN0IG11dGF0aW9ucyA9IHtcbiAgc2V0SW5wdXRTZW50ZW5jZXMoc3RhdGUsIHBheWxvYWQpIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkocGF5bG9hZCkpIHtcbiAgICAgIHN0YXRlLm9yaWdpbmFsVGV4dCA9IHBheWxvYWQ7XG4gICAgICBwYXlsb2FkID0gcGF5bG9hZC5zcGxpdCgpO1xuICAgIH1cbiAgICBzdGF0ZS5pbnB1dFNlbnRlbmNlcyA9IHBheWxvYWQubWFwKChzLCBpKSA9PiAoeyBpZDogaSwgdGV4dDogcyB9KSk7XG4gIH0sXG4gIGFkZENsYXNzKHN0YXRlLCBwYXlsb2FkKSB7XG4gICAgLy8gbGV0IGV4aXN0aW5nID0gc3RhdGUuY2xhc3Nlcy5maW5kKChjKSA9PiBjLm5hbWUgPT0gcGF5bG9hZFswXSk7XG4gICAgLy8gaWYgKGV4aXN0aW5nKSB7XG4gICAgLy8gICByZXR1cm47XG4gICAgLy8gfVxuICAgIGxldCBsYXN0SW5kZXggPSBzdGF0ZS5jbGFzc2VzLnJlZHVjZSgocCwgYykgPT4ge1xuICAgICAgcmV0dXJuIGMuaWQgPiBwID8gYy5pZCA6IHA7XG4gICAgfSwgMCk7XG4gICAgc3RhdGUuY2xhc3Nlcy5wdXNoKHtcbiAgICAgIGlkOiBsYXN0SW5kZXggKyAxLFxuICAgICAgbmFtZTogcGF5bG9hZFswXSxcbiAgICAgIGF0dHJpYnV0ZXM6IHBheWxvYWRbMV0sXG4gICAgICBjb2xvcjogbmljZUNvbG9yc1tsYXN0SW5kZXggJSBuaWNlQ29sb3JzLmxlbmd0aF0sXG4gICAgfSk7XG4gICAgaWYgKHN0YXRlLmNsYXNzZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICBzdGF0ZS5jdXJyZW50Q2xhc3MgPSBzdGF0ZS5jbGFzc2VzWzBdO1xuICAgIH1cbiAgfSxcbiAgcmVtb3ZlQ2xhc3Moc3RhdGUsIHBheWxvYWQpIHtcbiAgICBzdGF0ZS5jbGFzc2VzID0gc3RhdGUuY2xhc3Nlcy5maWx0ZXIoKGMpID0+IGMuaWQgIT0gcGF5bG9hZCk7XG4gICAgaWYgKHN0YXRlLmN1cnJlbnRDbGFzcy5pZCA9PT0gcGF5bG9hZCkge1xuICAgICAgc3RhdGUuY3VycmVudENsYXNzID0gc3RhdGUuY2xhc3Nlc1swXTtcbiAgICB9XG4gIH0sXG4gIHNldEN1cnJlbnRDbGFzcyhzdGF0ZSwgcGF5bG9hZCkge1xuICAgIHN0YXRlLmN1cnJlbnRDbGFzcyA9IHN0YXRlLmNsYXNzZXMuZmluZCgoYykgPT4gYy5pZCA9PT0gcGF5bG9hZCk7XG4gIH0sXG4gIC8vIHNldEN1cnJlbnRCbG9jayhzdGF0ZSwgcGF5bG9hZCkge1xuICAvLyAgIHN0YXRlLmN1cnJlbnRCbG9jayA9IHBheWxvYWQ7XG4gIC8vIH0sXG4gIGFkZEFubm90YXRpb24oc3RhdGUsIHBheWxvYWQpIHtcbiAgICBzdGF0ZS5hbm5vdGF0aW9ucy5wdXNoKHBheWxvYWQpO1xuICB9LFxufTtcblxuZXhwb3J0IGNvbnN0IGdldHRlcnMgPSB7fTtcbmV4cG9ydCBkZWZhdWx0IHtcbiAgc3RhdGUoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG9yaWdpbmFsVGV4dDogXCJcIixcbiAgICAgIGNsYXNzZXM6IFtdLFxuICAgICAgaW5wdXRTZW50ZW5jZXM6IFtdLFxuICAgICAgYW5ub3RhdGlvbnM6IFtdLFxuICAgICAgY3VycmVudENsYXNzOiB7fSxcbiAgICAgIC8vY3VycmVudEJsb2NrOiAtMSxcbiAgICB9O1xuICB9LFxuICBnZXR0ZXJzLFxuICBtdXRhdGlvbnMsXG4gIGFjdGlvbnM6IHt9LFxufTtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFoQkE7QUFvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFDQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQXhDQTtBQTJDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU5BO0FBUUE7QUFDQTtBQUNBO0FBQ0E7QUFiQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/store.js\n");

/***/ })

})