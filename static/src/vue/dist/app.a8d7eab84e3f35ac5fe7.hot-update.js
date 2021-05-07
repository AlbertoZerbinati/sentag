webpackHotUpdate("app",{

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/index.js?!./src/App.vue?vue&type=script&lang=js":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader-v16/dist??ref--0-1!./src/App.vue?vue&type=script&lang=js ***!
  \*******************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.object.to-string */ \"./node_modules/core-js/modules/es.object.to-string.js\");\n/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.string.iterator */ \"./node_modules/core-js/modules/es.string.iterator.js\");\n/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator */ \"./node_modules/core-js/modules/web.dom-collections.iterator.js\");\n/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var core_js_modules_web_url__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/web.url */ \"./node_modules/core-js/modules/web.url.js\");\n/* harmony import */ var core_js_modules_web_url__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_url__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _home_zerbi_Documents_III_anno_tesi_sentag_ui_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/objectSpread2 */ \"./node_modules/@babel/runtime/helpers/esm/objectSpread2.js\");\n/* harmony import */ var _components_AnnotationPage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/AnnotationPage */ \"./src/components/AnnotationPage.vue\");\n/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vuex */ \"./node_modules/vuex/dist/vuex.esm-browser.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var _assets_styles_scss__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./assets/styles.scss */ \"./src/assets/styles.scss\");\n/* harmony import */ var _assets_styles_scss__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_assets_styles_scss__WEBPACK_IMPORTED_MODULE_8__);\n\n\n\n\n\n\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: \"App\",\n  data: function data() {\n    return {\n      currentPage: \"annotator\",\n      title: \"\"\n    };\n  },\n  components: {\n    AnnotationPage: _components_AnnotationPage__WEBPACK_IMPORTED_MODULE_5__[\"default\"]\n  },\n  methods: Object(_home_zerbi_Documents_III_anno_tesi_sentag_ui_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_4__[\"default\"])({}, Object(vuex__WEBPACK_IMPORTED_MODULE_6__[\"mapMutations\"])([\"setInputSentences\", \"addClass\"])),\n  created: function created() {\n    var _this = this;\n\n    var url = new URL(location.href)['pathname'];\n    var numero_sentenza = url[url.length - 2]; //console.log(numero_sentenza);\n\n    axios__WEBPACK_IMPORTED_MODULE_7___default.a.get(\"/api/\" + numero_sentenza).then(function (res) {\n      _this.setInputSentences(res.data['testo_iniziale']);\n\n      _this.title = res.data['nome']; //console.log(Object.keys(JSON.parse(res.data['tags'])))\n      // readJsonObject(JSON.parse(res.data['tags']))\n\n      var xml = res.data['tags'];\n      console.log(xml); //let xml = JSON.parse(res.data['tags']);\n\n      var parser = new DOMParser();\n      var xmlDoc = parser.parseFromString(text, \"text/xml\");\n      console.log(xmlDoc.getElementsByTagName(\"title\")[0].childNodes[0].nodeValue); // for(let cl of Object.values(xml)) {\n      // }\n      // for(let i = 0; i<Object.keys(xml).length; i++) {          \n      //   for(let j = 0; j<Object.keys(Object.keys(xml)[i]).length; j++) {\n      //     let cls = Object.values(Object.keys(xml)[i])[j];\n      //     //console.log(cls);\n      //     this.addClass(cls);\n      //   }\n      // }\n      ////console.log(res.data['testo_iniziale']);\n    }).catch(function (err) {\n      return alert(err);\n    });\n  }\n}); // function readJsonObject(jsonObject) {\n//   if (Array.isArray(jsonObject)) {\n//     for (var el of jsonObject) {\n//       readJsonObject(el)\n//     }\n//     return\n//   } else if (typeof jsonObject === 'object' && jsonObject.constructor === Object) {\n//     for (var key of Object.keys(jsonObject)) {\n//       var value = jsonObject[key];\n//       var toDisplay;\n//       if (value && typeof value === 'object' && value.constructor === Object) {\n//         toDisplay = readJsonObject(value);\n//       } else if (Array.isArray(value)) {\n//         toDisplay = JSON.stringify(value);\n//         readJsonObject(value);\n//       } else {\n//         toDisplay = value;\n//       }\n//      console.log(key + \": \" + toDisplay);\n//     }\n//   }\n//   return jsonObject;\n// }//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvY2FjaGUtbG9hZGVyL2Rpc3QvY2pzLmpzPyEuL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzIS4vbm9kZV9tb2R1bGVzL2NhY2hlLWxvYWRlci9kaXN0L2Nqcy5qcz8hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci12MTYvZGlzdC9pbmRleC5qcz8hLi9zcmMvQXBwLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9BcHAudnVlPzNkZmQiXSwic291cmNlc0NvbnRlbnQiOlsiPHRlbXBsYXRlPlxuICA8ZGl2PlxuICAgIDxBbm5vdGF0aW9uUGFnZSA6dGl0bGU9XCJ0aXRsZVwiLz5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuaW1wb3J0IEFubm90YXRpb25QYWdlIGZyb20gXCIuL2NvbXBvbmVudHMvQW5ub3RhdGlvblBhZ2VcIjtcbmltcG9ydCB7IG1hcE11dGF0aW9ucyB9IGZyb20gXCJ2dWV4XCI7XG5pbXBvcnQgYXhpb3MgZnJvbSBcImF4aW9zXCJcblxuaW1wb3J0IFwiLi9hc3NldHMvc3R5bGVzLnNjc3NcIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiBcIkFwcFwiLFxuICBkYXRhOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY3VycmVudFBhZ2U6IFwiYW5ub3RhdG9yXCIsXG4gICAgICB0aXRsZTogXCJcIixcbiAgICB9O1xuICB9LFxuICBjb21wb25lbnRzOiB7XG4gICAgQW5ub3RhdGlvblBhZ2UsXG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICAuLi5tYXBNdXRhdGlvbnMoW1wic2V0SW5wdXRTZW50ZW5jZXNcIixcImFkZENsYXNzXCJdKSxcbiAgfSxcbiAgY3JlYXRlZCgpIHtcbiAgICBjb25zdCB1cmwgPSBuZXcgVVJMKGxvY2F0aW9uLmhyZWYpWydwYXRobmFtZSddO1xuICAgIGNvbnN0IG51bWVyb19zZW50ZW56YSA9IHVybFt1cmwubGVuZ3RoLTJdXG4gICAgLy9jb25zb2xlLmxvZyhudW1lcm9fc2VudGVuemEpO1xuICAgIGF4aW9zXG4gICAgICAgIC5nZXQoXCIvYXBpL1wiK251bWVyb19zZW50ZW56YSlcbiAgICAgICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgIHRoaXMuc2V0SW5wdXRTZW50ZW5jZXMocmVzLmRhdGFbJ3Rlc3RvX2luaXppYWxlJ10pO1xuICAgICAgICAgIHRoaXMudGl0bGUgPSByZXMuZGF0YVsnbm9tZSddO1xuICAgICAgICAgIC8vY29uc29sZS5sb2coT2JqZWN0LmtleXMoSlNPTi5wYXJzZShyZXMuZGF0YVsndGFncyddKSkpXG4gICAgICAgICAgLy8gcmVhZEpzb25PYmplY3QoSlNPTi5wYXJzZShyZXMuZGF0YVsndGFncyddKSlcbiAgICAgICAgICBsZXQgeG1sID0gcmVzLmRhdGFbJ3RhZ3MnXVxuICAgICAgICAgIGNvbnNvbGUubG9nKHhtbClcbiAgICAgICAgICAvL2xldCB4bWwgPSBKU09OLnBhcnNlKHJlcy5kYXRhWyd0YWdzJ10pO1xuICAgICAgICAgIGxldCBwYXJzZXIgPSBuZXcgRE9NUGFyc2VyKCk7XG4gICAgICAgICAgbGV0IHhtbERvYyA9IHBhcnNlci5wYXJzZUZyb21TdHJpbmcodGV4dCxcInRleHQveG1sXCIpO1xuICAgICAgICAgIGNvbnNvbGUubG9nKHhtbERvYy5nZXRFbGVtZW50c0J5VGFnTmFtZShcInRpdGxlXCIpWzBdLmNoaWxkTm9kZXNbMF0ubm9kZVZhbHVlKTtcblxuICAgICAgICAgIC8vIGZvcihsZXQgY2wgb2YgT2JqZWN0LnZhbHVlcyh4bWwpKSB7XG4gICAgICAgICAgLy8gfVxuICAgICAgICAgIC8vIGZvcihsZXQgaSA9IDA7IGk8T2JqZWN0LmtleXMoeG1sKS5sZW5ndGg7IGkrKykgeyAgICAgICAgICBcbiAgICAgICAgICAvLyAgIGZvcihsZXQgaiA9IDA7IGo8T2JqZWN0LmtleXMoT2JqZWN0LmtleXMoeG1sKVtpXSkubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAvLyAgICAgbGV0IGNscyA9IE9iamVjdC52YWx1ZXMoT2JqZWN0LmtleXMoeG1sKVtpXSlbal07XG4gICAgICAgICAgLy8gICAgIC8vY29uc29sZS5sb2coY2xzKTtcbiAgICAgICAgICAvLyAgICAgdGhpcy5hZGRDbGFzcyhjbHMpO1xuICAgICAgICAgIC8vICAgfVxuICAgICAgICAgIC8vIH1cbiAgICAgICAgICAvLy8vY29uc29sZS5sb2cocmVzLmRhdGFbJ3Rlc3RvX2luaXppYWxlJ10pO1xuICAgICAgICB9KVxuICAgIC5jYXRjaCgoZXJyKSA9PiBhbGVydChlcnIpKTtcbiAgfVxuXG59O1xuXG4vLyBmdW5jdGlvbiByZWFkSnNvbk9iamVjdChqc29uT2JqZWN0KSB7XG4vLyAgIGlmIChBcnJheS5pc0FycmF5KGpzb25PYmplY3QpKSB7XG4vLyAgICAgZm9yICh2YXIgZWwgb2YganNvbk9iamVjdCkge1xuLy8gICAgICAgcmVhZEpzb25PYmplY3QoZWwpXG4vLyAgICAgfVxuLy8gICAgIHJldHVyblxuLy8gICB9IGVsc2UgaWYgKHR5cGVvZiBqc29uT2JqZWN0ID09PSAnb2JqZWN0JyAmJiBqc29uT2JqZWN0LmNvbnN0cnVjdG9yID09PSBPYmplY3QpIHtcbi8vICAgICBmb3IgKHZhciBrZXkgb2YgT2JqZWN0LmtleXMoanNvbk9iamVjdCkpIHtcbi8vICAgICAgIHZhciB2YWx1ZSA9IGpzb25PYmplY3Rba2V5XTtcbi8vICAgICAgIHZhciB0b0Rpc3BsYXk7XG5cbi8vICAgICAgIGlmICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlLmNvbnN0cnVjdG9yID09PSBPYmplY3QpIHtcbi8vICAgICAgICAgdG9EaXNwbGF5ID0gcmVhZEpzb25PYmplY3QodmFsdWUpO1xuLy8gICAgICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuLy8gICAgICAgICB0b0Rpc3BsYXkgPSBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XG4vLyAgICAgICAgIHJlYWRKc29uT2JqZWN0KHZhbHVlKTtcbi8vICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgIHRvRGlzcGxheSA9IHZhbHVlO1xuLy8gICAgICAgfVxuLy8gICAgICBjb25zb2xlLmxvZyhrZXkgKyBcIjogXCIgKyB0b0Rpc3BsYXkpO1xuLy8gICAgIH1cbi8vICAgfVxuXG4vLyAgIHJldHVybiBqc29uT2JqZWN0O1xuLy8gfVxuPC9zY3JpcHQ+XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU9BO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBR0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUE1Q0E7QUFpREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/index.js?!./src/App.vue?vue&type=script&lang=js\n");

/***/ })

})