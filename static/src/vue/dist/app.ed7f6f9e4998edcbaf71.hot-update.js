webpackHotUpdate("app",{

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/index.js?!./src/App.vue?vue&type=script&lang=js":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader-v16/dist??ref--0-1!./src/App.vue?vue&type=script&lang=js ***!
  \*******************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.object.to-string */ \"./node_modules/core-js/modules/es.object.to-string.js\");\n/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.string.iterator */ \"./node_modules/core-js/modules/es.string.iterator.js\");\n/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator */ \"./node_modules/core-js/modules/web.dom-collections.iterator.js\");\n/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var core_js_modules_web_url__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/web.url */ \"./node_modules/core-js/modules/web.url.js\");\n/* harmony import */ var core_js_modules_web_url__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_url__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _home_zerbi_Documents_III_anno_tesi_sentag_ui_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/objectSpread2 */ \"./node_modules/@babel/runtime/helpers/esm/objectSpread2.js\");\n/* harmony import */ var _components_AnnotationPage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/AnnotationPage */ \"./src/components/AnnotationPage.vue\");\n/* harmony import */ var _components_AnnotationPage__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_components_AnnotationPage__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vuex */ \"./node_modules/vuex/dist/vuex.esm-browser.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var _assets_styles_scss__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./assets/styles.scss */ \"./src/assets/styles.scss\");\n/* harmony import */ var _assets_styles_scss__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_assets_styles_scss__WEBPACK_IMPORTED_MODULE_8__);\n\n\n\n\n\n\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: \"App\",\n  data: function data() {\n    return {\n      currentPage: \"annotator\",\n      title: \"\"\n    };\n  },\n  components: {\n    AnnotationPage: _components_AnnotationPage__WEBPACK_IMPORTED_MODULE_5___default.a\n  },\n  methods: Object(_home_zerbi_Documents_III_anno_tesi_sentag_ui_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_4__[\"default\"])({}, Object(vuex__WEBPACK_IMPORTED_MODULE_6__[\"mapMutations\"])([\"setInputSentences\", \"addClass\"])),\n  created: function created() {\n    var _this = this;\n\n    var url = new URL(location.href)['pathname'];\n    var numero_sentenza = url[url.length - 2]; //console.log(numero_sentenza);\n\n    axios__WEBPACK_IMPORTED_MODULE_7___default.a.get(\"/api/\" + numero_sentenza).then(function (res) {\n      _this.setInputSentences(res.data['testo_iniziale']);\n\n      console.log(res.data['nome']);\n      _this.title = res.data['nome'];\n\n      for (var i = 0; i < res.data['tags'].length; i++) {\n        var cls = res.data['tags'][i];\n\n        _this.addClass(cls);\n      } ////console.log(res.data['testo_iniziale']);\n\n    }).catch(function (err) {\n      return alert(err);\n    });\n  }\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvY2FjaGUtbG9hZGVyL2Rpc3QvY2pzLmpzPyEuL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzIS4vbm9kZV9tb2R1bGVzL2NhY2hlLWxvYWRlci9kaXN0L2Nqcy5qcz8hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci12MTYvZGlzdC9pbmRleC5qcz8hLi9zcmMvQXBwLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9BcHAudnVlPzNkZmQiXSwic291cmNlc0NvbnRlbnQiOlsiPHRlbXBsYXRlPlxuICA8ZGl2PlxuICAgIDxBbm5vdGF0aW9uUGFnZSA6dGl0bGU9XCJ0aXRsZVwiLz5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuaW1wb3J0IEFubm90YXRpb25QYWdlIGZyb20gXCIuL2NvbXBvbmVudHMvQW5ub3RhdGlvblBhZ2VcIjtcbmltcG9ydCB7IG1hcE11dGF0aW9ucyB9IGZyb20gXCJ2dWV4XCI7XG5pbXBvcnQgYXhpb3MgZnJvbSBcImF4aW9zXCJcblxuaW1wb3J0IFwiLi9hc3NldHMvc3R5bGVzLnNjc3NcIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiBcIkFwcFwiLFxuICBkYXRhOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY3VycmVudFBhZ2U6IFwiYW5ub3RhdG9yXCIsXG4gICAgICB0aXRsZTogXCJcIixcbiAgICB9O1xuICB9LFxuICBjb21wb25lbnRzOiB7XG4gICAgQW5ub3RhdGlvblBhZ2UsXG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICAuLi5tYXBNdXRhdGlvbnMoW1wic2V0SW5wdXRTZW50ZW5jZXNcIixcImFkZENsYXNzXCJdKSxcbiAgfSxcbiAgY3JlYXRlZCgpIHtcbiAgICBjb25zdCB1cmwgPSBuZXcgVVJMKGxvY2F0aW9uLmhyZWYpWydwYXRobmFtZSddO1xuICAgIGNvbnN0IG51bWVyb19zZW50ZW56YSA9IHVybFt1cmwubGVuZ3RoLTJdXG4gICAgLy9jb25zb2xlLmxvZyhudW1lcm9fc2VudGVuemEpO1xuICAgIGF4aW9zXG4gICAgICAgIC5nZXQoXCIvYXBpL1wiK251bWVyb19zZW50ZW56YSlcbiAgICAgICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgIHRoaXMuc2V0SW5wdXRTZW50ZW5jZXMocmVzLmRhdGFbJ3Rlc3RvX2luaXppYWxlJ10pO1xuICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhWydub21lJ10pO1xuICAgICAgICAgIHRoaXMudGl0bGUgPSByZXMuZGF0YVsnbm9tZSddO1xuICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGk8cmVzLmRhdGFbJ3RhZ3MnXS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIGNscyA9IHJlcy5kYXRhWyd0YWdzJ11baV07XG4gICAgICAgICAgICB0aGlzLmFkZENsYXNzKGNscyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vLy9jb25zb2xlLmxvZyhyZXMuZGF0YVsndGVzdG9faW5pemlhbGUnXSk7XG4gICAgICAgIH0pXG4gICAgLmNhdGNoKChlcnIpID0+IGFsZXJ0KGVycikpO1xuICB9XG5cbn07XG48L3NjcmlwdD5cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU9BO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBR0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUEvQkEiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/index.js?!./src/App.vue?vue&type=script&lang=js\n");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/index.js?!./src/components/AnnotationPage.vue?vue&type=script&lang=js":
false,

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/index.js?!./src/components/Export.vue?vue&type=script&lang=js":
false,

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/index.js?!./src/components/Token.vue?vue&type=script&lang=js":
false,

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/index.js?!./src/components/TokenBlock.vue?vue&type=script&lang=js":
false,

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader-v16/dist/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/index.js?!./src/components/AnnotationPage.vue?vue&type=template&id=de507ce4&bindings={\"title\":\"props\",\"tokenizeCurrentSentence\":\"options\",\"selectTokens\":\"options\",\"onRemoveBlock\":\"options\",\"resetBlocks\":\"options\",\"skipCurrentSentence\":\"options\",\"saveTags\":\"options\"}":
false,

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader-v16/dist/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/index.js?!./src/components/Export.vue?vue&type=template&id=0f128038&bindings={\"generateJSONExport\":\"options\"}":
false,

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader-v16/dist/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/index.js?!./src/components/Token.vue?vue&type=template&id=1195fd0e&bindings={\"token\":\"props\"}":
false,

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader-v16/dist/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/index.js?!./src/components/TokenBlock.vue?vue&type=template&id=10f65e44&bindings={\"token\":\"props\",\"backgroundColor\":\"props\"}":
false,

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/index.js?!./src/components/AnnotationPage.vue?vue&type=style&index=0&lang=scss":
false,

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/index.js?!./src/components/Token.vue?vue&type=style&index=0&lang=scss":
false,

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/index.js?!./src/components/TokenBlock.vue?vue&type=style&index=0&lang=scss":
false,

/***/ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/index.js?!./src/components/AnnotationPage.vue?vue&type=style&index=0&lang=scss":
false,

/***/ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/index.js?!./src/components/Token.vue?vue&type=style&index=0&lang=scss":
false,

/***/ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/index.js?!./src/components/TokenBlock.vue?vue&type=style&index=0&lang=scss":
false,

/***/ "./src/axios.js":
false,

/***/ "./src/components/AnnotationPage.vue":
/*!*******************************************!*\
  !*** ./src/components/AnnotationPage.vue ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9Bbm5vdGF0aW9uUGFnZS52dWUuanMiLCJzb3VyY2VzIjpbXSwibWFwcGluZ3MiOiIiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/components/AnnotationPage.vue\n");

/***/ }),

/***/ "./src/components/AnnotationPage.vue?vue&type=script&lang=js":
false,

/***/ "./src/components/AnnotationPage.vue?vue&type=style&index=0&lang=scss":
false,

/***/ "./src/components/AnnotationPage.vue?vue&type=template&id=de507ce4&bindings={\"title\":\"props\",\"tokenizeCurrentSentence\":\"options\",\"selectTokens\":\"options\",\"onRemoveBlock\":\"options\",\"resetBlocks\":\"options\",\"skipCurrentSentence\":\"options\",\"saveTags\":\"options\"}":
false,

/***/ "./src/components/Export.vue":
false,

/***/ "./src/components/Export.vue?vue&type=script&lang=js":
false,

/***/ "./src/components/Export.vue?vue&type=template&id=0f128038&bindings={\"generateJSONExport\":\"options\"}":
false,

/***/ "./src/components/Token.vue":
false,

/***/ "./src/components/Token.vue?vue&type=script&lang=js":
false,

/***/ "./src/components/Token.vue?vue&type=style&index=0&lang=scss":
false,

/***/ "./src/components/Token.vue?vue&type=template&id=1195fd0e&bindings={\"token\":\"props\"}":
false,

/***/ "./src/components/TokenBlock.vue":
false,

/***/ "./src/components/TokenBlock.vue?vue&type=script&lang=js":
false,

/***/ "./src/components/TokenBlock.vue?vue&type=style&index=0&lang=scss":
false,

/***/ "./src/components/TokenBlock.vue?vue&type=template&id=10f65e44&bindings={\"token\":\"props\",\"backgroundColor\":\"props\"}":
false,

/***/ "./src/components/token-manager.js":
false

})