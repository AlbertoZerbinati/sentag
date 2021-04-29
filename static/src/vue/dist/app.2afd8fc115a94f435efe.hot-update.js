webpackHotUpdate("app",{

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/index.js?!./src/components/AnnotationPage.vue?vue&type=script&lang=js":
/*!*****************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader-v16/dist??ref--0-1!./src/components/AnnotationPage.vue?vue&type=script&lang=js ***!
  \*****************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var core_js_modules_es_array_index_of__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.index-of */ \"./node_modules/core-js/modules/es.array.index-of.js\");\n/* harmony import */ var core_js_modules_es_array_index_of__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_index_of__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.regexp.exec */ \"./node_modules/core-js/modules/es.regexp.exec.js\");\n/* harmony import */ var core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.string.replace */ \"./node_modules/core-js/modules/es.string.replace.js\");\n/* harmony import */ var core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var core_js_modules_es_string_split__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.string.split */ \"./node_modules/core-js/modules/es.string.split.js\");\n/* harmony import */ var core_js_modules_es_string_split__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_split__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _home_zerbi_Documents_III_anno_tesi_sentag_ui_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/objectSpread2 */ \"./node_modules/@babel/runtime/helpers/esm/objectSpread2.js\");\n/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vuex */ \"./node_modules/vuex/dist/vuex.esm-browser.js\");\n/* harmony import */ var _axios__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../axios */ \"./src/axios.js\");\n/* harmony import */ var _Token__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Token */ \"./src/components/Token.vue\");\n/* harmony import */ var _TokenBlock__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./TokenBlock */ \"./src/components/TokenBlock.vue\");\n/* harmony import */ var _token_manager__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./token-manager */ \"./src/components/token-manager.js\");\n/* harmony import */ var _Export_vue__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Export.vue */ \"./src/components/Export.vue\");\n\n\n\n\n\n\n\n\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: \"AnnotationPage\",\n  data: function data() {\n    return {\n      tm: new _token_manager__WEBPACK_IMPORTED_MODULE_9__[\"default\"]([]),\n      currentSentence: {},\n      currentIndex: 0,\n      redone: \"\"\n    };\n  },\n  components: {\n    Token: _Token__WEBPACK_IMPORTED_MODULE_7__[\"default\"],\n    TokenBlock: _TokenBlock__WEBPACK_IMPORTED_MODULE_8__[\"default\"],\n    Export: _Export_vue__WEBPACK_IMPORTED_MODULE_10__[\"default\"]\n  },\n  computed: Object(_home_zerbi_Documents_III_anno_tesi_sentag_ui_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_4__[\"default\"])({}, Object(vuex__WEBPACK_IMPORTED_MODULE_5__[\"mapState\"])([\"inputSentences\", \"classes\", \"annotations\", \"currentClass\"])),\n  watch: {\n    inputSentences: function inputSentences() {\n      this.currentIndex = 0;\n      this.tokenizeCurrentSentence();\n    }\n  },\n  created: function created() {\n    if (this.inputSentences.length) {\n      this.tokenizeCurrentSentence();\n    }\n\n    document.addEventListener(\"mouseup\", this.selectTokens);\n  },\n  beforeUnmount: function beforeUnmount() {\n    document.removeEventListener(\"mouseup\", this.selectTokens);\n  },\n  methods: {\n    tokenizeCurrentSentence: function tokenizeCurrentSentence() {\n      if (this.currentIndex >= this.inputSentences.length) {\n        // TODO show completed message\n        alert(\"You have completed all the sentences\");\n        return;\n      }\n\n      this.currentSentence = this.inputSentences[this.currentIndex];\n      var words = this.currentSentence[\"text\"].split(\" \");\n      var tokens = [];\n      var last_index = 0;\n\n      for (var i = 0; i < words.length; i += 1) {\n        var token = [];\n        var start = this.currentSentence[\"text\"].indexOf(words[i], last_index);\n        var end = start + words[i].length;\n        token.push(start);\n        token.push(end);\n        token.push(words[i]);\n        tokens.push(token);\n        last_index = end;\n      }\n\n      this.tm = new _token_manager__WEBPACK_IMPORTED_MODULE_9__[\"default\"](tokens); //for each annotation in this.$store.annotations\n      //    this.tm.addNewBlock(annotation.startIdx, annotation.endIdx, annotation.class);\n    },\n    selectTokens: function selectTokens() {\n      //console.log(this.classes);\n      var selection = document.getSelection();\n      if (selection.anchorOffset === selection.focusOffset && selection.anchorNode === selection.focusNode) return;\n      var startIdx, endIdx;\n\n      try {\n        startIdx = parseInt(selection.anchorNode.parentElement.id.replace(\"t\", \"\"));\n        endIdx = parseInt(selection.focusNode.parentElement.id.replace(\"t\", \"\"));\n      } catch (e) {\n        console.log(\"selected text were not tokens\");\n        return;\n      }\n\n      if (!this.classes.length && selection.anchorNode) {\n        alert(\"There are no Tags available. Kindly add some Tags before tagging.\");\n        selection.empty();\n        return;\n      }\n\n      this.tm.addNewBlock(startIdx, endIdx, this.currentClass);\n      selection.empty();\n    },\n    onRemoveBlock: function onRemoveBlock(blockStart) {\n      this.tm.removeBlock(blockStart);\n    },\n    resetBlocks: function resetBlocks() {\n      this.tm.resetBlocks();\n    },\n    skipCurrentSentence: function skipCurrentSentence() {\n      this.currentIndex++;\n      this.tokenizeCurrentSentence();\n    },\n    saveTags: function saveTags() {\n      var _this = this;\n\n      _axios__WEBPACK_IMPORTED_MODULE_6__[\"default\"].post(\"/detokenize/\", {\n        tokens: this.tm.words\n      }).then(function (res) {\n        _this.$store.commit(\"addAnnotation\", [res.data.text, {\n          entities: _this.tm.exportAsAnnotation()\n        }]);\n\n        _this.currentIndex++;\n\n        _this.tokenizeCurrentSentence();\n      }).catch(function (e) {\n        console.log(e);\n      });\n    }\n  }\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvY2FjaGUtbG9hZGVyL2Rpc3QvY2pzLmpzPyEuL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzIS4vbm9kZV9tb2R1bGVzL2NhY2hlLWxvYWRlci9kaXN0L2Nqcy5qcz8hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci12MTYvZGlzdC9pbmRleC5qcz8hLi9zcmMvY29tcG9uZW50cy9Bbm5vdGF0aW9uUGFnZS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9Bbm5vdGF0aW9uUGFnZS52dWU/ZWUxMCJdLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XG4gIDxkaXYgY2xhc3M9XCJjb2x1bW5zIGlzLWRlc2t0b3BcIj5cbiAgICA8ZGl2IGNsYXNzPVwiY29sdW1uXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwicGFuZWwgbS00XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJwYW5lbC1ibG9ja1wiPlxuICAgICAgICAgIDxkaXYgaWQ9XCJlZGl0b3JcIj5cbiAgICAgICAgICAgIDxjb21wb25lbnRcbiAgICAgICAgICAgICAgOmlzPVwidC50eXBlID09PSAndG9rZW4nID8gJ1Rva2VuJyA6ICdUb2tlbkJsb2NrJ1wiXG4gICAgICAgICAgICAgIDppZD1cIid0JyArIHQuc3RhcnRcIlxuICAgICAgICAgICAgICB2LWZvcj1cInQgaW4gdG0udG9rZW5zXCJcbiAgICAgICAgICAgICAgOnRva2VuPVwidFwiXG4gICAgICAgICAgICAgIDprZXk9XCJ0LnN0YXJ0XCJcbiAgICAgICAgICAgICAgOmJhY2tncm91bmRDb2xvcj1cInQuYmFja2dyb3VuZENvbG9yXCJcbiAgICAgICAgICAgICAgQHJlbW92ZS1ibG9jaz1cIm9uUmVtb3ZlQmxvY2tcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJwYW5lbC1ibG9ja1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJmaWVsZCBpcy1ncm91cGVkXCI+XG4gICAgICAgICAgICA8cCBjbGFzcz1cImNvbnRyb2xcIj5cbiAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ1dHRvbiBpcy1kYW5nZXIgaXMtb3V0bGluZWRcIiBAY2xpY2s9XCJyZXNldEJsb2Nrc1wiPlxuICAgICAgICAgICAgICAgIFJlc2V0XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPHAgY2xhc3M9XCJjb250cm9sXCI+XG4gICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidXR0b24gaXMtbGlua1wiIEBjbGljaz1cInNhdmVUYWdzXCI+U2F2ZTwvYnV0dG9uPlxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPHAgY2xhc3M9XCJjb250cm9sXCI+XG4gICAgICAgICAgICAgICAgPGV4cG9ydC8+XG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cbjxzY3JpcHQ+XG5pbXBvcnQgeyBtYXBTdGF0ZSB9IGZyb20gXCJ2dWV4XCI7XG5pbXBvcnQgYXhpb3MgZnJvbSBcIi4uL2F4aW9zXCI7XG5pbXBvcnQgVG9rZW4gZnJvbSBcIi4vVG9rZW5cIjtcbmltcG9ydCBUb2tlbkJsb2NrIGZyb20gXCIuL1Rva2VuQmxvY2tcIjtcbmltcG9ydCBUb2tlbk1hbmFnZXIgZnJvbSBcIi4vdG9rZW4tbWFuYWdlclwiO1xuaW1wb3J0IEV4cG9ydCBmcm9tIFwiLi9FeHBvcnQudnVlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogXCJBbm5vdGF0aW9uUGFnZVwiLFxuICBkYXRhOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdG06IG5ldyBUb2tlbk1hbmFnZXIoW10pLFxuICAgICAgY3VycmVudFNlbnRlbmNlOiB7fSxcbiAgICAgIGN1cnJlbnRJbmRleDogMCxcbiAgICAgIHJlZG9uZTogXCJcIixcbiAgICB9O1xuICB9LFxuICBjb21wb25lbnRzOiB7XG4gICAgVG9rZW4sXG4gICAgVG9rZW5CbG9jayxcbiAgICBFeHBvcnQsXG4gIH0sXG4gIGNvbXB1dGVkOiB7XG4gICAgLi4ubWFwU3RhdGUoW1wiaW5wdXRTZW50ZW5jZXNcIiwgXCJjbGFzc2VzXCIsIFwiYW5ub3RhdGlvbnNcIiwgXCJjdXJyZW50Q2xhc3NcIl0pLFxuICB9LFxuICB3YXRjaDoge1xuICAgIGlucHV0U2VudGVuY2VzKCkge1xuICAgICAgdGhpcy5jdXJyZW50SW5kZXggPSAwO1xuICAgICAgdGhpcy50b2tlbml6ZUN1cnJlbnRTZW50ZW5jZSgpO1xuICAgIH1cblxuICB9LFxuICBjcmVhdGVkKCkge1xuICAgIGlmICh0aGlzLmlucHV0U2VudGVuY2VzLmxlbmd0aCkge1xuICAgICAgdGhpcy50b2tlbml6ZUN1cnJlbnRTZW50ZW5jZSgpO1xuICAgIH1cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCB0aGlzLnNlbGVjdFRva2Vucyk7XG4gIH0sXG4gIGJlZm9yZVVubW91bnQoKSB7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgdGhpcy5zZWxlY3RUb2tlbnMpO1xuICB9LFxuICBtZXRob2RzOiB7XG4gICAgdG9rZW5pemVDdXJyZW50U2VudGVuY2UoKSB7XG4gICAgICBpZiAodGhpcy5jdXJyZW50SW5kZXggPj0gdGhpcy5pbnB1dFNlbnRlbmNlcy5sZW5ndGgpIHtcbiAgICAgICAgLy8gVE9ETyBzaG93IGNvbXBsZXRlZCBtZXNzYWdlXG4gICAgICAgIGFsZXJ0KFwiWW91IGhhdmUgY29tcGxldGVkIGFsbCB0aGUgc2VudGVuY2VzXCIpXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5jdXJyZW50U2VudGVuY2UgPSB0aGlzLmlucHV0U2VudGVuY2VzW3RoaXMuY3VycmVudEluZGV4XTtcblxuICAgICAgdmFyIHdvcmRzID0gdGhpcy5jdXJyZW50U2VudGVuY2VbXCJ0ZXh0XCJdLnNwbGl0KFwiIFwiKTtcbiAgICAgIHZhciB0b2tlbnMgPSBbXTtcbiAgICAgIHZhciBsYXN0X2luZGV4ID0gMDtcbiAgICAgIGZvcih2YXIgaT0wOyBpPHdvcmRzLmxlbmd0aDsgaSs9MSl7XG4gICAgICAgICAgdmFyIHRva2VuID0gW107XG4gICAgICAgICAgdmFyIHN0YXJ0ID0gdGhpcy5jdXJyZW50U2VudGVuY2VbXCJ0ZXh0XCJdLmluZGV4T2Yod29yZHNbaV0sbGFzdF9pbmRleCk7XG4gICAgICAgICAgdmFyIGVuZCA9IHN0YXJ0K3dvcmRzW2ldLmxlbmd0aDsgXG4gICAgICAgICAgdG9rZW4ucHVzaChzdGFydCk7XG4gICAgICAgICAgdG9rZW4ucHVzaChlbmQpO1xuICAgICAgICAgIHRva2VuLnB1c2god29yZHNbaV0pO1xuXG4gICAgICAgICAgdG9rZW5zLnB1c2godG9rZW4pO1xuXG4gICAgICAgICAgbGFzdF9pbmRleCA9IGVuZDtcbiAgICAgIH1cblxuICAgICAgdGhpcy50bSA9IG5ldyBUb2tlbk1hbmFnZXIodG9rZW5zKTtcblxuICAgICAgLy9mb3IgZWFjaCBhbm5vdGF0aW9uIGluIHRoaXMuJHN0b3JlLmFubm90YXRpb25zXG4gICAgICAvLyAgICB0aGlzLnRtLmFkZE5ld0Jsb2NrKGFubm90YXRpb24uc3RhcnRJZHgsIGFubm90YXRpb24uZW5kSWR4LCBhbm5vdGF0aW9uLmNsYXNzKTtcbiAgICB9LFxuICAgIHNlbGVjdFRva2VucygpIHtcbiAgICAgIC8vY29uc29sZS5sb2codGhpcy5jbGFzc2VzKTtcbiAgICAgIGxldCBzZWxlY3Rpb24gPSBkb2N1bWVudC5nZXRTZWxlY3Rpb24oKTtcblxuICAgICAgaWYgKFxuICAgICAgICBzZWxlY3Rpb24uYW5jaG9yT2Zmc2V0ID09PSBzZWxlY3Rpb24uZm9jdXNPZmZzZXQgJiZcbiAgICAgICAgc2VsZWN0aW9uLmFuY2hvck5vZGUgPT09IHNlbGVjdGlvbi5mb2N1c05vZGVcbiAgICAgIClcbiAgICAgICAgcmV0dXJuO1xuICAgICAgbGV0IHN0YXJ0SWR4LCBlbmRJZHg7XG4gICAgICB0cnkge1xuICAgICAgICBzdGFydElkeCA9IHBhcnNlSW50KFxuICAgICAgICAgIHNlbGVjdGlvbi5hbmNob3JOb2RlLnBhcmVudEVsZW1lbnQuaWQucmVwbGFjZShcInRcIiwgXCJcIilcbiAgICAgICAgKTtcbiAgICAgICAgZW5kSWR4ID0gcGFyc2VJbnQoXG4gICAgICAgICAgc2VsZWN0aW9uLmZvY3VzTm9kZS5wYXJlbnRFbGVtZW50LmlkLnJlcGxhY2UoXCJ0XCIsIFwiXCIpXG4gICAgICAgICk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwic2VsZWN0ZWQgdGV4dCB3ZXJlIG5vdCB0b2tlbnNcIik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKCF0aGlzLmNsYXNzZXMubGVuZ3RoICYmIHNlbGVjdGlvbi5hbmNob3JOb2RlKSB7XG4gICAgICAgIGFsZXJ0KFxuICAgICAgICAgIFwiVGhlcmUgYXJlIG5vIFRhZ3MgYXZhaWxhYmxlLiBLaW5kbHkgYWRkIHNvbWUgVGFncyBiZWZvcmUgdGFnZ2luZy5cIlxuICAgICAgICApO1xuICAgICAgICBzZWxlY3Rpb24uZW1wdHkoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnRtLmFkZE5ld0Jsb2NrKHN0YXJ0SWR4LCBlbmRJZHgsIHRoaXMuY3VycmVudENsYXNzKTtcbiAgICAgIHNlbGVjdGlvbi5lbXB0eSgpO1xuICAgIH0sXG4gICAgb25SZW1vdmVCbG9jayhibG9ja1N0YXJ0KSB7XG4gICAgICB0aGlzLnRtLnJlbW92ZUJsb2NrKGJsb2NrU3RhcnQpO1xuICAgIH0sXG4gICAgcmVzZXRCbG9ja3MoKSB7XG4gICAgICB0aGlzLnRtLnJlc2V0QmxvY2tzKCk7XG4gICAgfSxcbiAgICBza2lwQ3VycmVudFNlbnRlbmNlKCkge1xuICAgICAgdGhpcy5jdXJyZW50SW5kZXgrKztcbiAgICAgIHRoaXMudG9rZW5pemVDdXJyZW50U2VudGVuY2UoKTtcbiAgICB9LFxuICAgIHNhdmVUYWdzKCkge1xuICAgICAgYXhpb3NcbiAgICAgICAgLnBvc3QoXCIvZGV0b2tlbml6ZS9cIiwgeyB0b2tlbnM6IHRoaXMudG0ud29yZHMgfSlcbiAgICAgICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgIHRoaXMuJHN0b3JlLmNvbW1pdChcImFkZEFubm90YXRpb25cIiwgW1xuICAgICAgICAgICAgcmVzLmRhdGEudGV4dCxcbiAgICAgICAgICAgIHsgZW50aXRpZXM6IHRoaXMudG0uZXhwb3J0QXNBbm5vdGF0aW9uKCkgfSxcbiAgICAgICAgICBdKTtcbiAgICAgICAgICB0aGlzLmN1cnJlbnRJbmRleCsrO1xuICAgICAgICAgIHRoaXMudG9rZW5pemVDdXJyZW50U2VudGVuY2UoKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgIH0pO1xuICAgIH0sXG4gIH0sXG59O1xuPC9zY3JpcHQ+XG5cbjxzdHlsZSBsYW5nPVwic2Nzc1wiPlxuI2VkaXRvciB7XG4gIHBhZGRpbmc6IDAuMnJlbTtcbn1cbjwvc3R5bGU+XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFLQTtBQUNBO0FBQUE7QUFDQTtBQUdBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBRUE7QUFFQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQXhGQTtBQWxDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/index.js?!./src/components/AnnotationPage.vue?vue&type=script&lang=js\n");

/***/ })

})