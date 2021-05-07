webpackHotUpdate("app",{

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/index.js?!./src/App.vue?vue&type=script&lang=js":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader-v16/dist??ref--0-1!./src/App.vue?vue&type=script&lang=js ***!
  \*******************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.object.to-string */ \"./node_modules/core-js/modules/es.object.to-string.js\");\n/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.string.iterator */ \"./node_modules/core-js/modules/es.string.iterator.js\");\n/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator */ \"./node_modules/core-js/modules/web.dom-collections.iterator.js\");\n/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var core_js_modules_web_url__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/web.url */ \"./node_modules/core-js/modules/web.url.js\");\n/* harmony import */ var core_js_modules_web_url__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_url__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _home_zerbi_Documents_III_anno_tesi_sentag_ui_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/objectSpread2 */ \"./node_modules/@babel/runtime/helpers/esm/objectSpread2.js\");\n/* harmony import */ var _components_AnnotationPage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/AnnotationPage */ \"./src/components/AnnotationPage.vue\");\n/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vuex */ \"./node_modules/vuex/dist/vuex.esm-browser.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var _assets_styles_scss__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./assets/styles.scss */ \"./src/assets/styles.scss\");\n/* harmony import */ var _assets_styles_scss__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_assets_styles_scss__WEBPACK_IMPORTED_MODULE_8__);\n\n\n\n\n\n\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: \"App\",\n  data: function data() {\n    return {\n      currentPage: \"annotator\",\n      title: \"\"\n    };\n  },\n  components: {\n    AnnotationPage: _components_AnnotationPage__WEBPACK_IMPORTED_MODULE_5__[\"default\"]\n  },\n  methods: Object(_home_zerbi_Documents_III_anno_tesi_sentag_ui_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_4__[\"default\"])({}, Object(vuex__WEBPACK_IMPORTED_MODULE_6__[\"mapMutations\"])([\"setInputSentences\", \"addClass\"])),\n  created: function created() {\n    var _this = this;\n\n    var url = new URL(location.href)['pathname'];\n    var numero_sentenza = url[url.length - 2]; //console.log(numero_sentenza);\n\n    axios__WEBPACK_IMPORTED_MODULE_7___default.a.get(\"/api/\" + numero_sentenza).then(function (res) {\n      _this.setInputSentences(res.data['testo_iniziale']);\n\n      _this.title = res.data['nome']; //console.log(Object.keys(JSON.parse(res.data['tags'])))\n      // readJsonObject(JSON.parse(res.data['tags']))\n\n      var xml = res.data['tags'];\n      console.log(xml); //let xml = JSON.parse(res.data['tags']);\n\n      var parser = new DOMParser();\n      var xmlDoc = parser.parseFromString(xml, \"text/xml\");\n      console.log(xmlDoc.getElementsByTagName(\"title\")[0].childNodes[0].nodeValue); // for(let cl of Object.values(xml)) {\n      // }\n      // for(let i = 0; i<Object.keys(xml).length; i++) {          \n      //   for(let j = 0; j<Object.keys(Object.keys(xml)[i]).length; j++) {\n      //     let cls = Object.values(Object.keys(xml)[i])[j];\n      //     //console.log(cls);\n      //     this.addClass(cls);\n      //   }\n      // }\n      ////console.log(res.data['testo_iniziale']);\n    }).catch(function (err) {\n      return alert(err);\n    });\n  }\n}); // function readJsonObject(jsonObject) {\n//   if (Array.isArray(jsonObject)) {\n//     for (var el of jsonObject) {\n//       readJsonObject(el)\n//     }\n//     return\n//   } else if (typeof jsonObject === 'object' && jsonObject.constructor === Object) {\n//     for (var key of Object.keys(jsonObject)) {\n//       var value = jsonObject[key];\n//       var toDisplay;\n//       if (value && typeof value === 'object' && value.constructor === Object) {\n//         toDisplay = readJsonObject(value);\n//       } else if (Array.isArray(value)) {\n//         toDisplay = JSON.stringify(value);\n//         readJsonObject(value);\n//       } else {\n//         toDisplay = value;\n//       }\n//      console.log(key + \": \" + toDisplay);\n//     }\n//   }\n//   return jsonObject;\n// }//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvY2FjaGUtbG9hZGVyL2Rpc3QvY2pzLmpzPyEuL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzIS4vbm9kZV9tb2R1bGVzL2NhY2hlLWxvYWRlci9kaXN0L2Nqcy5qcz8hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci12MTYvZGlzdC9pbmRleC5qcz8hLi9zcmMvQXBwLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9BcHAudnVlPzNkZmQiXSwic291cmNlc0NvbnRlbnQiOlsiPHRlbXBsYXRlPlxuICA8ZGl2PlxuICAgIDxBbm5vdGF0aW9uUGFnZSA6dGl0bGU9XCJ0aXRsZVwiLz5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuaW1wb3J0IEFubm90YXRpb25QYWdlIGZyb20gXCIuL2NvbXBvbmVudHMvQW5ub3RhdGlvblBhZ2VcIjtcbmltcG9ydCB7IG1hcE11dGF0aW9ucyB9IGZyb20gXCJ2dWV4XCI7XG5pbXBvcnQgYXhpb3MgZnJvbSBcImF4aW9zXCJcblxuaW1wb3J0IFwiLi9hc3NldHMvc3R5bGVzLnNjc3NcIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiBcIkFwcFwiLFxuICBkYXRhOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY3VycmVudFBhZ2U6IFwiYW5ub3RhdG9yXCIsXG4gICAgICB0aXRsZTogXCJcIixcbiAgICB9O1xuICB9LFxuICBjb21wb25lbnRzOiB7XG4gICAgQW5ub3RhdGlvblBhZ2UsXG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICAuLi5tYXBNdXRhdGlvbnMoW1wic2V0SW5wdXRTZW50ZW5jZXNcIixcImFkZENsYXNzXCJdKSxcbiAgfSxcbiAgY3JlYXRlZCgpIHtcbiAgICBjb25zdCB1cmwgPSBuZXcgVVJMKGxvY2F0aW9uLmhyZWYpWydwYXRobmFtZSddO1xuICAgIGNvbnN0IG51bWVyb19zZW50ZW56YSA9IHVybFt1cmwubGVuZ3RoLTJdXG4gICAgLy9jb25zb2xlLmxvZyhudW1lcm9fc2VudGVuemEpO1xuICAgIGF4aW9zXG4gICAgICAgIC5nZXQoXCIvYXBpL1wiK251bWVyb19zZW50ZW56YSlcbiAgICAgICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgIHRoaXMuc2V0SW5wdXRTZW50ZW5jZXMocmVzLmRhdGFbJ3Rlc3RvX2luaXppYWxlJ10pO1xuICAgICAgICAgIHRoaXMudGl0bGUgPSByZXMuZGF0YVsnbm9tZSddO1xuICAgICAgICAgIC8vY29uc29sZS5sb2coT2JqZWN0LmtleXMoSlNPTi5wYXJzZShyZXMuZGF0YVsndGFncyddKSkpXG4gICAgICAgICAgLy8gcmVhZEpzb25PYmplY3QoSlNPTi5wYXJzZShyZXMuZGF0YVsndGFncyddKSlcbiAgICAgICAgICBsZXQgeG1sID0gcmVzLmRhdGFbJ3RhZ3MnXVxuICAgICAgICAgIGNvbnNvbGUubG9nKHhtbClcbiAgICAgICAgICAvL2xldCB4bWwgPSBKU09OLnBhcnNlKHJlcy5kYXRhWyd0YWdzJ10pO1xuICAgICAgICAgIGxldCBwYXJzZXIgPSBuZXcgRE9NUGFyc2VyKCk7XG4gICAgICAgICAgbGV0IHhtbERvYyA9IHBhcnNlci5wYXJzZUZyb21TdHJpbmcoeG1sLFwidGV4dC94bWxcIik7XG4gICAgICAgICAgY29uc29sZS5sb2coeG1sRG9jLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwidGl0bGVcIilbMF0uY2hpbGROb2Rlc1swXS5ub2RlVmFsdWUpO1xuXG4gICAgICAgICAgLy8gZm9yKGxldCBjbCBvZiBPYmplY3QudmFsdWVzKHhtbCkpIHtcbiAgICAgICAgICAvLyB9XG4gICAgICAgICAgLy8gZm9yKGxldCBpID0gMDsgaTxPYmplY3Qua2V5cyh4bWwpLmxlbmd0aDsgaSsrKSB7ICAgICAgICAgIFxuICAgICAgICAgIC8vICAgZm9yKGxldCBqID0gMDsgajxPYmplY3Qua2V5cyhPYmplY3Qua2V5cyh4bWwpW2ldKS5sZW5ndGg7IGorKykge1xuICAgICAgICAgIC8vICAgICBsZXQgY2xzID0gT2JqZWN0LnZhbHVlcyhPYmplY3Qua2V5cyh4bWwpW2ldKVtqXTtcbiAgICAgICAgICAvLyAgICAgLy9jb25zb2xlLmxvZyhjbHMpO1xuICAgICAgICAgIC8vICAgICB0aGlzLmFkZENsYXNzKGNscyk7XG4gICAgICAgICAgLy8gICB9XG4gICAgICAgICAgLy8gfVxuICAgICAgICAgIC8vLy9jb25zb2xlLmxvZyhyZXMuZGF0YVsndGVzdG9faW5pemlhbGUnXSk7XG4gICAgICAgIH0pXG4gICAgLmNhdGNoKChlcnIpID0+IGFsZXJ0KGVycikpO1xuICB9XG5cbn07XG5cbi8vIGZ1bmN0aW9uIHJlYWRKc29uT2JqZWN0KGpzb25PYmplY3QpIHtcbi8vICAgaWYgKEFycmF5LmlzQXJyYXkoanNvbk9iamVjdCkpIHtcbi8vICAgICBmb3IgKHZhciBlbCBvZiBqc29uT2JqZWN0KSB7XG4vLyAgICAgICByZWFkSnNvbk9iamVjdChlbClcbi8vICAgICB9XG4vLyAgICAgcmV0dXJuXG4vLyAgIH0gZWxzZSBpZiAodHlwZW9mIGpzb25PYmplY3QgPT09ICdvYmplY3QnICYmIGpzb25PYmplY3QuY29uc3RydWN0b3IgPT09IE9iamVjdCkge1xuLy8gICAgIGZvciAodmFyIGtleSBvZiBPYmplY3Qua2V5cyhqc29uT2JqZWN0KSkge1xuLy8gICAgICAgdmFyIHZhbHVlID0ganNvbk9iamVjdFtrZXldO1xuLy8gICAgICAgdmFyIHRvRGlzcGxheTtcblxuLy8gICAgICAgaWYgKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUuY29uc3RydWN0b3IgPT09IE9iamVjdCkge1xuLy8gICAgICAgICB0b0Rpc3BsYXkgPSByZWFkSnNvbk9iamVjdCh2YWx1ZSk7XG4vLyAgICAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4vLyAgICAgICAgIHRvRGlzcGxheSA9IEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcbi8vICAgICAgICAgcmVhZEpzb25PYmplY3QodmFsdWUpO1xuLy8gICAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgdG9EaXNwbGF5ID0gdmFsdWU7XG4vLyAgICAgICB9XG4vLyAgICAgIGNvbnNvbGUubG9nKGtleSArIFwiOiBcIiArIHRvRGlzcGxheSk7XG4vLyAgICAgfVxuLy8gICB9XG5cbi8vICAgcmV0dXJuIGpzb25PYmplY3Q7XG4vLyB9XG48L3NjcmlwdD5cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBT0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFHQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQTVDQTtBQWlEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/index.js?!./src/App.vue?vue&type=script&lang=js\n");

/***/ })

})