webpackHotUpdate("app",{

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/index.js?!./src/components/AnnotationPage.vue?vue&type=script&lang=js":
/*!*****************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader-v16/dist??ref--0-1!./src/components/AnnotationPage.vue?vue&type=script&lang=js ***!
  \*****************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var core_js_modules_es_array_index_of__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.index-of */ \"./node_modules/core-js/modules/es.array.index-of.js\");\n/* harmony import */ var core_js_modules_es_array_index_of__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_index_of__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.regexp.exec */ \"./node_modules/core-js/modules/es.regexp.exec.js\");\n/* harmony import */ var core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.string.replace */ \"./node_modules/core-js/modules/es.string.replace.js\");\n/* harmony import */ var core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var core_js_modules_es_string_split__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.string.split */ \"./node_modules/core-js/modules/es.string.split.js\");\n/* harmony import */ var core_js_modules_es_string_split__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_split__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _home_zerbi_Documents_III_anno_tesi_sentag_ui_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/objectSpread2 */ \"./node_modules/@babel/runtime/helpers/esm/objectSpread2.js\");\n/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vuex */ \"./node_modules/vuex/dist/vuex.esm-browser.js\");\n/* harmony import */ var _axios__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../axios */ \"./src/axios.js\");\n/* harmony import */ var _Token__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Token */ \"./src/components/Token.vue\");\n/* harmony import */ var _TokenBlock__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./TokenBlock */ \"./src/components/TokenBlock.vue\");\n/* harmony import */ var _token_manager__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./token-manager */ \"./src/components/token-manager.js\");\n/* harmony import */ var _Export_vue__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Export.vue */ \"./src/components/Export.vue\");\n\n\n\n\n\n\n\n\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: \"AnnotationPage\",\n  data: function data() {\n    return {\n      tm: new _token_manager__WEBPACK_IMPORTED_MODULE_9__[\"default\"]([]),\n      currentSentence: {}\n    };\n  },\n  props: ['title'],\n  components: {\n    Token: _Token__WEBPACK_IMPORTED_MODULE_7__[\"default\"],\n    TokenBlock: _TokenBlock__WEBPACK_IMPORTED_MODULE_8__[\"default\"],\n    Export: _Export_vue__WEBPACK_IMPORTED_MODULE_10__[\"default\"]\n  },\n  computed: Object(_home_zerbi_Documents_III_anno_tesi_sentag_ui_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_4__[\"default\"])({}, Object(vuex__WEBPACK_IMPORTED_MODULE_5__[\"mapState\"])([\"inputSentences\", \"classes\", \"annotations\", \"currentClass\"])),\n  watch: {\n    inputSentences: function inputSentences() {\n      this.tokenizeCurrentSentence();\n    }\n  },\n  created: function created() {\n    if (this.inputSentences.length) {\n      this.tokenizeCurrentSentence();\n    }\n\n    document.addEventListener(\"mouseup\", this.selectTokens);\n  },\n  beforeUnmount: function beforeUnmount() {\n    document.removeEventListener(\"mouseup\", this.selectTokens);\n  },\n  methods: {\n    tokenizeCurrentSentence: function tokenizeCurrentSentence() {\n      this.currentSentence = this.inputSentences[0];\n      var words = this.currentSentence[\"text\"].split(\" \");\n      var tokens = [];\n      var last_index = 0;\n\n      for (var i = 0; i < words.length; i += 1) {\n        var token = [];\n        var start = this.currentSentence[\"text\"].indexOf(words[i], last_index);\n        var end = start + words[i].length;\n        token.push(start);\n        token.push(end);\n        token.push(words[i]);\n        tokens.push(token);\n        last_index = end;\n      }\n\n      this.tm = new _token_manager__WEBPACK_IMPORTED_MODULE_9__[\"default\"](tokens); //for each annotation in this.$store.annotations\n      //    this.tm.addNewBlock(annotation.startIdx, annotation.endIdx, annotation.class);\n    },\n    selectTokens: function selectTokens() {\n      //console.log(this.classes);\n      var selection = document.getSelection();\n      if (selection.anchorOffset === selection.focusOffset && selection.anchorNode === selection.focusNode) return;\n      var startIdx, endIdx;\n\n      try {\n        startIdx = parseInt(selection.anchorNode.parentElement.id.replace(\"t\", \"\"));\n        endIdx = parseInt(selection.focusNode.parentElement.id.replace(\"t\", \"\"));\n      } catch (e) {\n        console.log(\"selected text were not tokens\");\n        return;\n      }\n\n      if (!this.classes.length && selection.anchorNode) {\n        alert(\"There are no Tags available. Kindly add some Tags before tagging.\");\n        selection.empty();\n        return;\n      }\n\n      this.tm.addNewBlock(startIdx, endIdx, this.currentClass);\n      selection.empty();\n    },\n    onRemoveBlock: function onRemoveBlock(data) {\n      this.tm.removeBlock(data.start, data.end);\n    },\n    resetBlocks: function resetBlocks() {\n      if (confirm(\"Are you sure you want to reset ALL the annotations? The unsaved work will be lost\")) this.tm.resetBlocks();\n    },\n    saveTags: function saveTags() {\n      var _this = this;\n\n      _axios__WEBPACK_IMPORTED_MODULE_6__[\"default\"].post(\"/detokenize/\", {\n        tokens: this.tm.words\n      }).then(function (res) {\n        _this.$store.commit(\"addAnnotation\", [res.data.text, {\n          entities: _this.tm.exportAsAnnotation()\n        }]);\n      }).catch(function (e) {\n        console.log(e);\n      });\n    }\n  }\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvY2FjaGUtbG9hZGVyL2Rpc3QvY2pzLmpzPyEuL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzIS4vbm9kZV9tb2R1bGVzL2NhY2hlLWxvYWRlci9kaXN0L2Nqcy5qcz8hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci12MTYvZGlzdC9pbmRleC5qcz8hLi9zcmMvY29tcG9uZW50cy9Bbm5vdGF0aW9uUGFnZS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9Bbm5vdGF0aW9uUGFnZS52dWU/ZWUxMCJdLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XG4gIDxkaXYgY2xhc3M9XCJjb2x1bW5zIGlzLWRlc2t0b3BcIj5cbiAgICA8ZGl2IGNsYXNzPVwiY29sdW1uXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwicGFuZWxcIj5cbiAgICAgICAgPHAgY2xhc3M9XCJwYW5lbC1oZWFkaW5nXCI+XG4gICAgICAgICAgPHN0cm9uZz5UYWdnYSB7e3RpdGxlfX08L3N0cm9uZz5cbiAgICAgICAgPC9wPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicGFuZWwtYmxvY2tcIj5cbiAgICAgICAgICA8ZGl2IGlkPVwiZWRpdG9yXCI+XG4gICAgICAgICAgICA8Y29tcG9uZW50XG4gICAgICAgICAgICAgIDppcz1cInQudHlwZSA9PT0gJ3Rva2VuJyA/ICdUb2tlbicgOiAnVG9rZW5CbG9jaydcIlxuICAgICAgICAgICAgICA6aWQ9XCIndCcgKyB0LnN0YXJ0XCJcbiAgICAgICAgICAgICAgdi1mb3I9XCJ0IGluIHRtLnRva2Vuc1wiXG4gICAgICAgICAgICAgIDp0b2tlbj1cInRcIlxuICAgICAgICAgICAgICA6a2V5PVwidC5zdGFydFwiXG4gICAgICAgICAgICAgIDpiYWNrZ3JvdW5kQ29sb3I9XCJ0LmJhY2tncm91bmRDb2xvclwiXG4gICAgICAgICAgICAgIEByZW1vdmUtYmxvY2s9XCJvblJlbW92ZUJsb2NrXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicGFuZWwtYmxvY2tcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZmllbGQgaXMtZ3JvdXBlZFwiPlxuICAgICAgICAgICAgPHAgY2xhc3M9XCJjb250cm9sXCI+XG4gICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidXR0b24gaXMtZGFuZ2VyIGlzLW91dGxpbmVkXCIgQGNsaWNrPVwicmVzZXRCbG9ja3NcIj5cbiAgICAgICAgICAgICAgICBSZXNldFxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDxwIGNsYXNzPVwiY29udHJvbFwiPlxuICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnV0dG9uIGlzLWxpbmtcIiBAY2xpY2s9XCJzYXZlVGFnc1wiPlNhbHZhPC9idXR0b24+XG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8cCBjbGFzcz1cImNvbnRyb2xcIj5cbiAgICAgICAgICAgICAgICA8ZXhwb3J0Lz5cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuPHNjcmlwdD5cbmltcG9ydCB7IG1hcFN0YXRlIH0gZnJvbSBcInZ1ZXhcIjtcbmltcG9ydCBheGlvcyBmcm9tIFwiLi4vYXhpb3NcIjtcbmltcG9ydCBUb2tlbiBmcm9tIFwiLi9Ub2tlblwiO1xuaW1wb3J0IFRva2VuQmxvY2sgZnJvbSBcIi4vVG9rZW5CbG9ja1wiO1xuaW1wb3J0IFRva2VuTWFuYWdlciBmcm9tIFwiLi90b2tlbi1tYW5hZ2VyXCI7XG5pbXBvcnQgRXhwb3J0IGZyb20gXCIuL0V4cG9ydC52dWVcIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiBcIkFubm90YXRpb25QYWdlXCIsXG4gIGRhdGE6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICB0bTogbmV3IFRva2VuTWFuYWdlcihbXSksXG4gICAgICBjdXJyZW50U2VudGVuY2U6IHt9LFxuICAgIH07XG4gIH0sXG4gIHByb3BzOiBbJ3RpdGxlJ10sXG4gIGNvbXBvbmVudHM6IHtcbiAgICBUb2tlbixcbiAgICBUb2tlbkJsb2NrLFxuICAgIEV4cG9ydCxcbiAgfSxcbiAgY29tcHV0ZWQ6IHtcbiAgICAuLi5tYXBTdGF0ZShbXCJpbnB1dFNlbnRlbmNlc1wiLCBcImNsYXNzZXNcIiwgXCJhbm5vdGF0aW9uc1wiLCBcImN1cnJlbnRDbGFzc1wiXSksXG4gIH0sXG4gIHdhdGNoOiB7XG4gICAgaW5wdXRTZW50ZW5jZXMoKSB7XG4gICAgICB0aGlzLnRva2VuaXplQ3VycmVudFNlbnRlbmNlKCk7XG4gICAgfVxuICB9LFxuICBjcmVhdGVkKCkge1xuICAgIGlmICh0aGlzLmlucHV0U2VudGVuY2VzLmxlbmd0aCkge1xuICAgICAgdGhpcy50b2tlbml6ZUN1cnJlbnRTZW50ZW5jZSgpO1xuICAgIH1cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCB0aGlzLnNlbGVjdFRva2Vucyk7XG4gIH0sXG4gIGJlZm9yZVVubW91bnQoKSB7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgdGhpcy5zZWxlY3RUb2tlbnMpO1xuICB9LFxuICBtZXRob2RzOiB7XG4gICAgdG9rZW5pemVDdXJyZW50U2VudGVuY2UoKSB7XG4gICAgICB0aGlzLmN1cnJlbnRTZW50ZW5jZSA9IHRoaXMuaW5wdXRTZW50ZW5jZXNbMF07XG5cbiAgICAgIGxldCB3b3JkcyA9IHRoaXMuY3VycmVudFNlbnRlbmNlW1widGV4dFwiXS5zcGxpdChcIiBcIik7XG4gICAgICBsZXQgdG9rZW5zID0gW107XG4gICAgICBsZXQgbGFzdF9pbmRleCA9IDA7XG4gICAgICBmb3IobGV0IGk9MDsgaTx3b3Jkcy5sZW5ndGg7IGkrPTEpe1xuICAgICAgICAgIGxldCB0b2tlbiA9IFtdO1xuICAgICAgICAgIGxldCBzdGFydCA9IHRoaXMuY3VycmVudFNlbnRlbmNlW1widGV4dFwiXS5pbmRleE9mKHdvcmRzW2ldLGxhc3RfaW5kZXgpO1xuICAgICAgICAgIGxldCBlbmQgPSBzdGFydCt3b3Jkc1tpXS5sZW5ndGg7IFxuICAgICAgICAgIHRva2VuLnB1c2goc3RhcnQpO1xuICAgICAgICAgIHRva2VuLnB1c2goZW5kKTtcbiAgICAgICAgICB0b2tlbi5wdXNoKHdvcmRzW2ldKTtcblxuICAgICAgICAgIHRva2Vucy5wdXNoKHRva2VuKTtcblxuICAgICAgICAgIGxhc3RfaW5kZXggPSBlbmQ7XG4gICAgICB9XG5cbiAgICAgIHRoaXMudG0gPSBuZXcgVG9rZW5NYW5hZ2VyKHRva2Vucyk7XG5cbiAgICAgIC8vZm9yIGVhY2ggYW5ub3RhdGlvbiBpbiB0aGlzLiRzdG9yZS5hbm5vdGF0aW9uc1xuICAgICAgLy8gICAgdGhpcy50bS5hZGROZXdCbG9jayhhbm5vdGF0aW9uLnN0YXJ0SWR4LCBhbm5vdGF0aW9uLmVuZElkeCwgYW5ub3RhdGlvbi5jbGFzcyk7XG4gICAgfSxcbiAgICBzZWxlY3RUb2tlbnMoKSB7XG4gICAgICAvL2NvbnNvbGUubG9nKHRoaXMuY2xhc3Nlcyk7XG4gICAgICBsZXQgc2VsZWN0aW9uID0gZG9jdW1lbnQuZ2V0U2VsZWN0aW9uKCk7XG5cbiAgICAgIGlmIChcbiAgICAgICAgc2VsZWN0aW9uLmFuY2hvck9mZnNldCA9PT0gc2VsZWN0aW9uLmZvY3VzT2Zmc2V0ICYmXG4gICAgICAgIHNlbGVjdGlvbi5hbmNob3JOb2RlID09PSBzZWxlY3Rpb24uZm9jdXNOb2RlXG4gICAgICApXG4gICAgICAgIHJldHVybjtcbiAgICAgIGxldCBzdGFydElkeCwgZW5kSWR4O1xuICAgICAgdHJ5IHtcbiAgICAgICAgc3RhcnRJZHggPSBwYXJzZUludChcbiAgICAgICAgICBzZWxlY3Rpb24uYW5jaG9yTm9kZS5wYXJlbnRFbGVtZW50LmlkLnJlcGxhY2UoXCJ0XCIsIFwiXCIpXG4gICAgICAgICk7XG4gICAgICAgIGVuZElkeCA9IHBhcnNlSW50KFxuICAgICAgICAgIHNlbGVjdGlvbi5mb2N1c05vZGUucGFyZW50RWxlbWVudC5pZC5yZXBsYWNlKFwidFwiLCBcIlwiKVxuICAgICAgICApO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcInNlbGVjdGVkIHRleHQgd2VyZSBub3QgdG9rZW5zXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICghdGhpcy5jbGFzc2VzLmxlbmd0aCAmJiBzZWxlY3Rpb24uYW5jaG9yTm9kZSkge1xuICAgICAgICBhbGVydChcbiAgICAgICAgICBcIlRoZXJlIGFyZSBubyBUYWdzIGF2YWlsYWJsZS4gS2luZGx5IGFkZCBzb21lIFRhZ3MgYmVmb3JlIHRhZ2dpbmcuXCJcbiAgICAgICAgKTtcbiAgICAgICAgc2VsZWN0aW9uLmVtcHR5KCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy50bS5hZGROZXdCbG9jayhzdGFydElkeCwgZW5kSWR4LCB0aGlzLmN1cnJlbnRDbGFzcyk7XG4gICAgICBzZWxlY3Rpb24uZW1wdHkoKTtcbiAgICB9LFxuICAgIG9uUmVtb3ZlQmxvY2soZGF0YSkge1xuICAgICAgdGhpcy50bS5yZW1vdmVCbG9jayhkYXRhLnN0YXJ0LGRhdGEuZW5kKTtcbiAgICB9LFxuICAgIHJlc2V0QmxvY2tzKCkge1xuICAgICAgaWYoY29uZmlybShcIkFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byByZXNldCBBTEwgdGhlIGFubm90YXRpb25zPyBUaGUgdW5zYXZlZCB3b3JrIHdpbGwgYmUgbG9zdFwiKSlcbiAgICAgIHRoaXMudG0ucmVzZXRCbG9ja3MoKTtcbiAgICB9LFxuICAgIHNhdmVUYWdzKCkge1xuICAgICAgYXhpb3NcbiAgICAgICAgLnBvc3QoXCIvZGV0b2tlbml6ZS9cIiwgeyB0b2tlbnM6IHRoaXMudG0ud29yZHMgfSlcbiAgICAgICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgIHRoaXMuJHN0b3JlLmNvbW1pdChcImFkZEFubm90YXRpb25cIiwgW1xuICAgICAgICAgICAgcmVzLmRhdGEudGV4dCxcbiAgICAgICAgICAgIHsgZW50aXRpZXM6IHRoaXMudG0uZXhwb3J0QXNBbm5vdGF0aW9uKCkgfSxcbiAgICAgICAgICBdKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgIH0pO1xuICAgIH0sXG4gIH0sXG59O1xuPC9zY3JpcHQ+XG5cbjxzdHlsZSBsYW5nPVwic2Nzc1wiPlxuI2VkaXRvciB7XG4gIHBhZGRpbmc6IDAuMnJlbTtcbn1cbjwvc3R5bGU+XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUtBO0FBQ0E7QUFBQTtBQUNBO0FBR0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBRUE7QUFFQTtBQUFBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUE3RUE7QUEvQkEiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/index.js?!./src/components/AnnotationPage.vue?vue&type=script&lang=js\n");

/***/ })

})