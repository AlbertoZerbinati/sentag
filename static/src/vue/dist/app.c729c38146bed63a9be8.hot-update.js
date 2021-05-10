webpackHotUpdate("app",{

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/index.js?!./src/components/AnnotationPage.vue?vue&type=script&lang=js":
/*!*****************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader-v16/dist??ref--0-1!./src/components/AnnotationPage.vue?vue&type=script&lang=js ***!
  \*****************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var core_js_modules_es_array_index_of__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.index-of */ \"./node_modules/core-js/modules/es.array.index-of.js\");\n/* harmony import */ var core_js_modules_es_array_index_of__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_index_of__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.regexp.exec */ \"./node_modules/core-js/modules/es.regexp.exec.js\");\n/* harmony import */ var core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.string.replace */ \"./node_modules/core-js/modules/es.string.replace.js\");\n/* harmony import */ var core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var core_js_modules_es_string_split__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.string.split */ \"./node_modules/core-js/modules/es.string.split.js\");\n/* harmony import */ var core_js_modules_es_string_split__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_split__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _home_zerbi_Documents_III_anno_tesi_sentag_ui_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/objectSpread2 */ \"./node_modules/@babel/runtime/helpers/esm/objectSpread2.js\");\n/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vuex */ \"./node_modules/vuex/dist/vuex.esm-browser.js\");\n/* harmony import */ var _axios__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../axios */ \"./src/axios.js\");\n/* harmony import */ var _Token__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Token */ \"./src/components/Token.vue\");\n/* harmony import */ var _TokenBlock__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./TokenBlock */ \"./src/components/TokenBlock.vue\");\n/* harmony import */ var _TokenBlock__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_TokenBlock__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var _token_manager__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./token-manager */ \"./src/components/token-manager.js\");\n/* harmony import */ var _Export_vue__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Export.vue */ \"./src/components/Export.vue\");\n\n\n\n\n\n\n\n\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: \"AnnotationPage\",\n  data: function data() {\n    return {\n      tm: new _token_manager__WEBPACK_IMPORTED_MODULE_9__[\"default\"]([]),\n      currentSentence: {},\n      redone: \"\"\n    };\n  },\n  props: ['title'],\n  components: {\n    Token: _Token__WEBPACK_IMPORTED_MODULE_7__[\"default\"],\n    TokenBlock: _TokenBlock__WEBPACK_IMPORTED_MODULE_8___default.a,\n    Export: _Export_vue__WEBPACK_IMPORTED_MODULE_10__[\"default\"]\n  },\n  computed: Object(_home_zerbi_Documents_III_anno_tesi_sentag_ui_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_4__[\"default\"])({}, Object(vuex__WEBPACK_IMPORTED_MODULE_5__[\"mapState\"])([\"inputSentences\", \"classes\", \"annotations\", \"currentClass\"])),\n  watch: {\n    inputSentences: function inputSentences() {\n      this.tokenizeCurrentSentence();\n    }\n  },\n  created: function created() {\n    if (this.inputSentences.length) {\n      this.tokenizeCurrentSentence();\n    }\n\n    document.addEventListener(\"mouseup\", this.selectTokens);\n  },\n  beforeUnmount: function beforeUnmount() {\n    document.removeEventListener(\"mouseup\", this.selectTokens);\n  },\n  methods: {\n    tokenizeCurrentSentence: function tokenizeCurrentSentence() {\n      this.currentSentence = this.inputSentences[0];\n      var words = this.currentSentence[\"text\"].split(\" \");\n      var tokens = [];\n      var last_index = 0;\n\n      for (var i = 0; i < words.length; i += 1) {\n        var token = [];\n        var start = this.currentSentence[\"text\"].indexOf(words[i], last_index);\n        var end = start + words[i].length;\n        token.push(start);\n        token.push(end);\n        token.push(words[i]);\n        tokens.push(token);\n        last_index = end;\n      }\n\n      this.tm = new _token_manager__WEBPACK_IMPORTED_MODULE_9__[\"default\"](tokens); //for each annotation in this.$store.annotations\n      //    this.tm.addNewBlock(annotation.startIdx, annotation.endIdx, annotation.class);\n    },\n    selectTokens: function selectTokens() {\n      //console.log(this.classes);\n      var selection = document.getSelection();\n      if (selection.anchorOffset === selection.focusOffset && selection.anchorNode === selection.focusNode) return;\n      var startIdx, endIdx;\n\n      try {\n        startIdx = parseInt(selection.anchorNode.parentElement.id.replace(\"t\", \"\"));\n        endIdx = parseInt(selection.focusNode.parentElement.id.replace(\"t\", \"\")); //check if I am tring to select a token-block\n        // if (isNaN(startIdx)) {\n        //   startIdx = parseInt(selection.anchorNode.parentElement.parentElement.id.replace(\"t\",\"\"));\n        // }\n        // if (isNaN(endIdx)) {\n        //   endIdx = parseInt(selection.focusNode.parentElement.parentElement.id.replace(\"t\",\"\"));\n        // }\n      } catch (e) {\n        console.log(\"selected text were not tokens\");\n        return;\n      }\n\n      if (!this.classes.length && selection.anchorNode) {\n        alert(\"There are no Tags available. Kindly add some Tags before tagging.\");\n        selection.empty();\n        return;\n      }\n\n      this.tm.addNewBlock(startIdx, endIdx, this.currentClass);\n      selection.empty();\n    },\n    onRemoveBlock: function onRemoveBlock(blockStart) {\n      this.tm.removeBlock(blockStart);\n    },\n    resetBlocks: function resetBlocks() {\n      this.tm.resetBlocks();\n    },\n    saveTags: function saveTags() {\n      var _this = this;\n\n      _axios__WEBPACK_IMPORTED_MODULE_6__[\"default\"].post(\"/detokenize/\", {\n        tokens: this.tm.words\n      }).then(function (res) {\n        _this.$store.commit(\"addAnnotation\", [res.data.text, {\n          entities: _this.tm.exportAsAnnotation()\n        }]);\n      }).catch(function (e) {\n        console.log(e);\n      });\n    }\n  }\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvY2FjaGUtbG9hZGVyL2Rpc3QvY2pzLmpzPyEuL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzIS4vbm9kZV9tb2R1bGVzL2NhY2hlLWxvYWRlci9kaXN0L2Nqcy5qcz8hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci12MTYvZGlzdC9pbmRleC5qcz8hLi9zcmMvY29tcG9uZW50cy9Bbm5vdGF0aW9uUGFnZS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9Bbm5vdGF0aW9uUGFnZS52dWU/ZWUxMCJdLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XG4gIDxkaXYgY2xhc3M9XCJjb2x1bW5zIGlzLWRlc2t0b3BcIj5cbiAgICA8ZGl2IGNsYXNzPVwiY29sdW1uXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwicGFuZWxcIj5cbiAgICAgICAgPHAgY2xhc3M9XCJwYW5lbC1oZWFkaW5nXCI+XG4gICAgICAgICAgPHN0cm9uZz5UYWdnYSB7e3RpdGxlfX08L3N0cm9uZz5cbiAgICAgICAgPC9wPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicGFuZWwtYmxvY2tcIj5cbiAgICAgICAgICA8ZGl2IGlkPVwiZWRpdG9yXCI+XG4gICAgICAgICAgICA8Y29tcG9uZW50XG4gICAgICAgICAgICAgIDppcz1cInQudHlwZSA9PT0gJ3Rva2VuJyA/ICdUb2tlbicgOiAnVG9rZW5CbG9jaydcIlxuICAgICAgICAgICAgICA6aWQ9XCIndCcgKyB0LnN0YXJ0XCJcbiAgICAgICAgICAgICAgdi1mb3I9XCJ0IGluIHRtLnRva2Vuc1wiXG4gICAgICAgICAgICAgIDp0b2tlbj1cInRcIlxuICAgICAgICAgICAgICA6a2V5PVwidC5zdGFydFwiXG4gICAgICAgICAgICAgIDpiYWNrZ3JvdW5kQ29sb3I9XCJ0LmJhY2tncm91bmRDb2xvclwiXG4gICAgICAgICAgICAgIEByZW1vdmUtYmxvY2s9XCJvblJlbW92ZUJsb2NrXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicGFuZWwtYmxvY2tcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZmllbGQgaXMtZ3JvdXBlZFwiPlxuICAgICAgICAgICAgPHAgY2xhc3M9XCJjb250cm9sXCI+XG4gICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidXR0b24gaXMtZGFuZ2VyIGlzLW91dGxpbmVkXCIgQGNsaWNrPVwicmVzZXRCbG9ja3NcIj5cbiAgICAgICAgICAgICAgICBSZXNldFxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDxwIGNsYXNzPVwiY29udHJvbFwiPlxuICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnV0dG9uIGlzLWxpbmtcIiBAY2xpY2s9XCJzYXZlVGFnc1wiPlNhbHZhPC9idXR0b24+XG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8cCBjbGFzcz1cImNvbnRyb2xcIj5cbiAgICAgICAgICAgICAgICA8ZXhwb3J0Lz5cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuaW1wb3J0IHsgbWFwU3RhdGUgfSBmcm9tIFwidnVleFwiO1xuaW1wb3J0IGF4aW9zIGZyb20gXCIuLi9heGlvc1wiO1xuaW1wb3J0IFRva2VuIGZyb20gXCIuL1Rva2VuXCI7XG5pbXBvcnQgVG9rZW5CbG9jayBmcm9tIFwiLi9Ub2tlbkJsb2NrXCI7XG5pbXBvcnQgVG9rZW5NYW5hZ2VyIGZyb20gXCIuL3Rva2VuLW1hbmFnZXJcIjtcbmltcG9ydCBFeHBvcnQgZnJvbSBcIi4vRXhwb3J0LnZ1ZVwiO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6IFwiQW5ub3RhdGlvblBhZ2VcIixcbiAgZGF0YTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRtOiBuZXcgVG9rZW5NYW5hZ2VyKFtdKSxcbiAgICAgIGN1cnJlbnRTZW50ZW5jZToge30sXG4gICAgICByZWRvbmU6IFwiXCIsXG4gICAgfTtcbiAgfSxcbiAgcHJvcHM6IFsndGl0bGUnXSxcbiAgY29tcG9uZW50czoge1xuICAgIFRva2VuLFxuICAgIFRva2VuQmxvY2ssXG4gICAgRXhwb3J0LFxuICB9LFxuICBjb21wdXRlZDoge1xuICAgIC4uLm1hcFN0YXRlKFtcImlucHV0U2VudGVuY2VzXCIsIFwiY2xhc3Nlc1wiLCBcImFubm90YXRpb25zXCIsIFwiY3VycmVudENsYXNzXCJdKSxcbiAgfSxcbiAgd2F0Y2g6IHtcbiAgICBpbnB1dFNlbnRlbmNlcygpIHtcbiAgICAgIHRoaXMudG9rZW5pemVDdXJyZW50U2VudGVuY2UoKTtcbiAgICB9XG5cbiAgfSxcbiAgY3JlYXRlZCgpIHtcbiAgICBpZiAodGhpcy5pbnB1dFNlbnRlbmNlcy5sZW5ndGgpIHtcbiAgICAgIHRoaXMudG9rZW5pemVDdXJyZW50U2VudGVuY2UoKTtcbiAgICB9XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgdGhpcy5zZWxlY3RUb2tlbnMpO1xuICB9LFxuICBiZWZvcmVVbm1vdW50KCkge1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIHRoaXMuc2VsZWN0VG9rZW5zKTtcbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIHRva2VuaXplQ3VycmVudFNlbnRlbmNlKCkge1xuICAgICAgdGhpcy5jdXJyZW50U2VudGVuY2UgPSB0aGlzLmlucHV0U2VudGVuY2VzWzBdO1xuXG4gICAgICBsZXQgd29yZHMgPSB0aGlzLmN1cnJlbnRTZW50ZW5jZVtcInRleHRcIl0uc3BsaXQoXCIgXCIpO1xuICAgICAgbGV0IHRva2VucyA9IFtdO1xuICAgICAgbGV0IGxhc3RfaW5kZXggPSAwO1xuICAgICAgZm9yKGxldCBpPTA7IGk8d29yZHMubGVuZ3RoOyBpKz0xKXtcbiAgICAgICAgICBsZXQgdG9rZW4gPSBbXTtcbiAgICAgICAgICBsZXQgc3RhcnQgPSB0aGlzLmN1cnJlbnRTZW50ZW5jZVtcInRleHRcIl0uaW5kZXhPZih3b3Jkc1tpXSxsYXN0X2luZGV4KTtcbiAgICAgICAgICBsZXQgZW5kID0gc3RhcnQrd29yZHNbaV0ubGVuZ3RoOyBcbiAgICAgICAgICB0b2tlbi5wdXNoKHN0YXJ0KTtcbiAgICAgICAgICB0b2tlbi5wdXNoKGVuZCk7XG4gICAgICAgICAgdG9rZW4ucHVzaCh3b3Jkc1tpXSk7XG5cbiAgICAgICAgICB0b2tlbnMucHVzaCh0b2tlbik7XG5cbiAgICAgICAgICBsYXN0X2luZGV4ID0gZW5kO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnRtID0gbmV3IFRva2VuTWFuYWdlcih0b2tlbnMpO1xuXG4gICAgICAvL2ZvciBlYWNoIGFubm90YXRpb24gaW4gdGhpcy4kc3RvcmUuYW5ub3RhdGlvbnNcbiAgICAgIC8vICAgIHRoaXMudG0uYWRkTmV3QmxvY2soYW5ub3RhdGlvbi5zdGFydElkeCwgYW5ub3RhdGlvbi5lbmRJZHgsIGFubm90YXRpb24uY2xhc3MpO1xuICAgIH0sXG4gICAgc2VsZWN0VG9rZW5zKCkge1xuICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLmNsYXNzZXMpO1xuICAgICAgbGV0IHNlbGVjdGlvbiA9IGRvY3VtZW50LmdldFNlbGVjdGlvbigpO1xuXG4gICAgICBpZiAoXG4gICAgICAgIHNlbGVjdGlvbi5hbmNob3JPZmZzZXQgPT09IHNlbGVjdGlvbi5mb2N1c09mZnNldCAmJlxuICAgICAgICBzZWxlY3Rpb24uYW5jaG9yTm9kZSA9PT0gc2VsZWN0aW9uLmZvY3VzTm9kZVxuICAgICAgKVxuICAgICAgICByZXR1cm47XG4gICAgICBsZXQgc3RhcnRJZHgsIGVuZElkeDtcbiAgICAgIHRyeSB7XG4gICAgICAgIHN0YXJ0SWR4ID0gcGFyc2VJbnQoXG4gICAgICAgICAgc2VsZWN0aW9uLmFuY2hvck5vZGUucGFyZW50RWxlbWVudC5pZC5yZXBsYWNlKFwidFwiLCBcIlwiKVxuICAgICAgICApO1xuICAgICAgICBlbmRJZHggPSBwYXJzZUludChcbiAgICAgICAgICBzZWxlY3Rpb24uZm9jdXNOb2RlLnBhcmVudEVsZW1lbnQuaWQucmVwbGFjZShcInRcIiwgXCJcIilcbiAgICAgICAgKTtcbiAgICAgICAgLy9jaGVjayBpZiBJIGFtIHRyaW5nIHRvIHNlbGVjdCBhIHRva2VuLWJsb2NrXG4gICAgICAgIC8vIGlmIChpc05hTihzdGFydElkeCkpIHtcbiAgICAgICAgLy8gICBzdGFydElkeCA9IHBhcnNlSW50KHNlbGVjdGlvbi5hbmNob3JOb2RlLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5pZC5yZXBsYWNlKFwidFwiLFwiXCIpKTtcbiAgICAgICAgLy8gfVxuICAgICAgICAvLyBpZiAoaXNOYU4oZW5kSWR4KSkge1xuICAgICAgICAvLyAgIGVuZElkeCA9IHBhcnNlSW50KHNlbGVjdGlvbi5mb2N1c05vZGUucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmlkLnJlcGxhY2UoXCJ0XCIsXCJcIikpO1xuICAgICAgICAvLyB9XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwic2VsZWN0ZWQgdGV4dCB3ZXJlIG5vdCB0b2tlbnNcIik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKCF0aGlzLmNsYXNzZXMubGVuZ3RoICYmIHNlbGVjdGlvbi5hbmNob3JOb2RlKSB7XG4gICAgICAgIGFsZXJ0KFxuICAgICAgICAgIFwiVGhlcmUgYXJlIG5vIFRhZ3MgYXZhaWxhYmxlLiBLaW5kbHkgYWRkIHNvbWUgVGFncyBiZWZvcmUgdGFnZ2luZy5cIlxuICAgICAgICApO1xuICAgICAgICBzZWxlY3Rpb24uZW1wdHkoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnRtLmFkZE5ld0Jsb2NrKHN0YXJ0SWR4LCBlbmRJZHgsIHRoaXMuY3VycmVudENsYXNzKTtcbiAgICAgIHNlbGVjdGlvbi5lbXB0eSgpO1xuICAgIH0sXG4gICAgb25SZW1vdmVCbG9jayhibG9ja1N0YXJ0KSB7XG4gICAgICB0aGlzLnRtLnJlbW92ZUJsb2NrKGJsb2NrU3RhcnQpO1xuICAgIH0sXG4gICAgcmVzZXRCbG9ja3MoKSB7XG4gICAgICB0aGlzLnRtLnJlc2V0QmxvY2tzKCk7XG4gICAgfSxcbiAgICBzYXZlVGFncygpIHtcbiAgICAgIGF4aW9zXG4gICAgICAgIC5wb3N0KFwiL2RldG9rZW5pemUvXCIsIHsgdG9rZW5zOiB0aGlzLnRtLndvcmRzIH0pXG4gICAgICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICB0aGlzLiRzdG9yZS5jb21taXQoXCJhZGRBbm5vdGF0aW9uXCIsIFtcbiAgICAgICAgICAgIHJlcy5kYXRhLnRleHQsXG4gICAgICAgICAgICB7IGVudGl0aWVzOiB0aGlzLnRtLmV4cG9ydEFzQW5ub3RhdGlvbigpIH0sXG4gICAgICAgICAgXSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZSkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICB9KTtcbiAgICB9LFxuICB9LFxufTtcbjwvc2NyaXB0PlxuXG48c3R5bGUgbGFuZz1cInNjc3NcIj5cbiNlZGl0b3Ige1xuICBwYWRkaW5nOiAwLjJyZW07XG59XG48L3N0eWxlPlxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBeUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFLQTtBQUNBO0FBQUE7QUFDQTtBQUdBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUVBO0FBRUE7QUFBQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBbkZBO0FBakNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/index.js?!./src/components/AnnotationPage.vue?vue&type=script&lang=js\n");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/index.js?!./src/components/TokenBlock.vue?vue&type=script&lang=js":
false,

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader-v16/dist/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/index.js?!./src/components/TokenBlock.vue?vue&type=template&id=10f65e44&bindings={\"token\":\"props\",\"backgroundColor\":\"props\"}":
false,

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/index.js?!./src/components/TokenBlock.vue?vue&type=style&index=0&lang=scss":
false,

/***/ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/index.js?!./src/components/TokenBlock.vue?vue&type=style&index=0&lang=scss":
false,

/***/ "./src/components/TokenBlock.vue":
/*!***************************************!*\
  !*** ./src/components/TokenBlock.vue ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9Ub2tlbkJsb2NrLnZ1ZS5qcyIsInNvdXJjZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/components/TokenBlock.vue\n");

/***/ }),

/***/ "./src/components/TokenBlock.vue?vue&type=script&lang=js":
false,

/***/ "./src/components/TokenBlock.vue?vue&type=style&index=0&lang=scss":
false,

/***/ "./src/components/TokenBlock.vue?vue&type=template&id=10f65e44&bindings={\"token\":\"props\",\"backgroundColor\":\"props\"}":
false

})