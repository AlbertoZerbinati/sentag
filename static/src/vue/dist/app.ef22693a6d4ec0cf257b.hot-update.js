webpackHotUpdate("app",{

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/index.js?!./src/App.vue?vue&type=script&lang=js":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader-v16/dist??ref--0-1!./src/App.vue?vue&type=script&lang=js ***!
  \*******************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.object.to-string */ \"./node_modules/core-js/modules/es.object.to-string.js\");\n/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.string.iterator */ \"./node_modules/core-js/modules/es.string.iterator.js\");\n/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator */ \"./node_modules/core-js/modules/web.dom-collections.iterator.js\");\n/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var core_js_modules_web_url__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/web.url */ \"./node_modules/core-js/modules/web.url.js\");\n/* harmony import */ var core_js_modules_web_url__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_url__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _home_zerbi_Documents_III_anno_tesi_sentag_ui_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper */ \"./node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper.js\");\n/* harmony import */ var _home_zerbi_Documents_III_anno_tesi_sentag_ui_node_modules_babel_runtime_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/typeof */ \"./node_modules/@babel/runtime/helpers/esm/typeof.js\");\n/* harmony import */ var _home_zerbi_Documents_III_anno_tesi_sentag_ui_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/objectSpread2 */ \"./node_modules/@babel/runtime/helpers/esm/objectSpread2.js\");\n/* harmony import */ var _components_AnnotationPage__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/AnnotationPage */ \"./src/components/AnnotationPage.vue\");\n/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! vuex */ \"./node_modules/vuex/dist/vuex.esm-browser.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_9__);\n/* harmony import */ var _assets_styles_scss__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./assets/styles.scss */ \"./src/assets/styles.scss\");\n/* harmony import */ var _assets_styles_scss__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_assets_styles_scss__WEBPACK_IMPORTED_MODULE_10__);\n\n\n\n\n\n\n\n\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: \"App\",\n  data: function data() {\n    return {\n      currentPage: \"annotator\",\n      title: \"\"\n    };\n  },\n  components: {\n    AnnotationPage: _components_AnnotationPage__WEBPACK_IMPORTED_MODULE_7__[\"default\"]\n  },\n  methods: Object(_home_zerbi_Documents_III_anno_tesi_sentag_ui_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_6__[\"default\"])({}, Object(vuex__WEBPACK_IMPORTED_MODULE_8__[\"mapMutations\"])([\"setInputSentences\", \"addClass\"])),\n  created: function created() {\n    var _this = this;\n\n    //ottengo il numero sentenza dall'url\n    var url = new URL(location.href)['pathname'];\n    var numero_sentenza = url[url.length - 2];\n    axios__WEBPACK_IMPORTED_MODULE_9___default.a.get(\"/api/\" + numero_sentenza).then(function (res) {\n      //la risposta contiene:\n      //le parole della sentenza\n      _this.setInputSentences(res.data['testo_iniziale']); //il titolo della sentenza\n\n\n      _this.title = res.data['nome']; //i tag da parsare, perché passati come xsd string\n\n      var xml = res.data['tags'];\n      console.log(xml);\n      var parser = new DOMParser();\n      var xmlDoc = parser.parseFromString(xml, \"text/xml\");\n      var elements = xmlDoc.getElementsByTagName(\"xs:element\");\n      console.log(Object(_home_zerbi_Documents_III_anno_tesi_sentag_ui_node_modules_babel_runtime_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(elements));\n\n      var _iterator = Object(_home_zerbi_Documents_III_anno_tesi_sentag_ui_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(elements),\n          _step;\n\n      try {\n        for (_iterator.s(); !(_step = _iterator.n()).done;) {\n          var element = _step.value;\n\n          _this.addClass(element.getAttribute(\"name\"));\n\n          console.log(element.getAttribute(\"name\"));\n        }\n      } catch (err) {\n        _iterator.e(err);\n      } finally {\n        _iterator.f();\n      }\n    }).catch(function (err) {\n      return alert(err);\n    });\n  }\n}); // function readJsonObject(jsonObject) {\n//   if (Array.isArray(jsonObject)) {\n//     for (var el of jsonObject) {\n//       readJsonObject(el)\n//     }\n//     return\n//   } else if (typeof jsonObject === 'object' && jsonObject.constructor === Object) {\n//     for (var key of Object.keys(jsonObject)) {\n//       var value = jsonObject[key];\n//       var toDisplay;\n//       if (value && typeof value === 'object' && value.constructor === Object) {\n//         toDisplay = readJsonObject(value);\n//       } else if (Array.isArray(value)) {\n//         toDisplay = JSON.stringify(value);\n//         readJsonObject(value);\n//       } else {\n//         toDisplay = value;\n//       }\n//      console.log(key + \": \" + toDisplay);\n//     }\n//   }\n//   return jsonObject;\n// }//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvY2FjaGUtbG9hZGVyL2Rpc3QvY2pzLmpzPyEuL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzIS4vbm9kZV9tb2R1bGVzL2NhY2hlLWxvYWRlci9kaXN0L2Nqcy5qcz8hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci12MTYvZGlzdC9pbmRleC5qcz8hLi9zcmMvQXBwLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9BcHAudnVlPzNkZmQiXSwic291cmNlc0NvbnRlbnQiOlsiPHRlbXBsYXRlPlxuICA8ZGl2PlxuICAgIDxBbm5vdGF0aW9uUGFnZSA6dGl0bGU9XCJ0aXRsZVwiLz5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuaW1wb3J0IEFubm90YXRpb25QYWdlIGZyb20gXCIuL2NvbXBvbmVudHMvQW5ub3RhdGlvblBhZ2VcIjtcbmltcG9ydCB7IG1hcE11dGF0aW9ucyB9IGZyb20gXCJ2dWV4XCI7XG5pbXBvcnQgYXhpb3MgZnJvbSBcImF4aW9zXCJcblxuaW1wb3J0IFwiLi9hc3NldHMvc3R5bGVzLnNjc3NcIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiBcIkFwcFwiLFxuICBkYXRhOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY3VycmVudFBhZ2U6IFwiYW5ub3RhdG9yXCIsXG4gICAgICB0aXRsZTogXCJcIixcbiAgICB9O1xuICB9LFxuICBjb21wb25lbnRzOiB7XG4gICAgQW5ub3RhdGlvblBhZ2UsXG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICAuLi5tYXBNdXRhdGlvbnMoW1wic2V0SW5wdXRTZW50ZW5jZXNcIixcImFkZENsYXNzXCJdKSxcbiAgfSxcbiAgY3JlYXRlZCgpIHtcbiAgICAvL290dGVuZ28gaWwgbnVtZXJvIHNlbnRlbnphIGRhbGwndXJsXG4gICAgY29uc3QgdXJsID0gbmV3IFVSTChsb2NhdGlvbi5ocmVmKVsncGF0aG5hbWUnXTtcbiAgICBjb25zdCBudW1lcm9fc2VudGVuemEgPSB1cmxbdXJsLmxlbmd0aC0yXVxuICAgIGF4aW9zXG4gICAgICAgIC5nZXQoXCIvYXBpL1wiK251bWVyb19zZW50ZW56YSlcbiAgICAgICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgIC8vbGEgcmlzcG9zdGEgY29udGllbmU6XG4gICAgICAgICAgLy9sZSBwYXJvbGUgZGVsbGEgc2VudGVuemFcbiAgICAgICAgICB0aGlzLnNldElucHV0U2VudGVuY2VzKHJlcy5kYXRhWyd0ZXN0b19pbml6aWFsZSddKTtcbiAgICAgICAgICAvL2lsIHRpdG9sbyBkZWxsYSBzZW50ZW56YVxuICAgICAgICAgIHRoaXMudGl0bGUgPSByZXMuZGF0YVsnbm9tZSddO1xuXG4gICAgICAgICAgLy9pIHRhZyBkYSBwYXJzYXJlLCBwZXJjaMOpIHBhc3NhdGkgY29tZSB4c2Qgc3RyaW5nXG4gICAgICAgICAgbGV0IHhtbCA9IHJlcy5kYXRhWyd0YWdzJ11cbiAgICAgICAgICBjb25zb2xlLmxvZyh4bWwpXG4gICAgICAgICAgbGV0IHBhcnNlciA9IG5ldyBET01QYXJzZXIoKTtcbiAgICAgICAgICBsZXQgeG1sRG9jID0gcGFyc2VyLnBhcnNlRnJvbVN0cmluZyh4bWwsXCJ0ZXh0L3htbFwiKTtcbiAgICAgICAgICBsZXQgZWxlbWVudHMgPSB4bWxEb2MuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJ4czplbGVtZW50XCIpO1xuICAgICAgICAgIGNvbnNvbGUubG9nKHR5cGVvZiBlbGVtZW50cylcbiAgICAgICAgICBmb3IgKGxldCBlbGVtZW50IG9mIGVsZW1lbnRzKSB7XG4gICAgICAgICAgICB0aGlzLmFkZENsYXNzKGVsZW1lbnQuZ2V0QXR0cmlidXRlKFwibmFtZVwiKSlcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVsZW1lbnQuZ2V0QXR0cmlidXRlKFwibmFtZVwiKSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgIH0pXG4gICAgLmNhdGNoKChlcnIpID0+IGFsZXJ0KGVycikpO1xuICB9XG5cbn07XG5cbi8vIGZ1bmN0aW9uIHJlYWRKc29uT2JqZWN0KGpzb25PYmplY3QpIHtcbi8vICAgaWYgKEFycmF5LmlzQXJyYXkoanNvbk9iamVjdCkpIHtcbi8vICAgICBmb3IgKHZhciBlbCBvZiBqc29uT2JqZWN0KSB7XG4vLyAgICAgICByZWFkSnNvbk9iamVjdChlbClcbi8vICAgICB9XG4vLyAgICAgcmV0dXJuXG4vLyAgIH0gZWxzZSBpZiAodHlwZW9mIGpzb25PYmplY3QgPT09ICdvYmplY3QnICYmIGpzb25PYmplY3QuY29uc3RydWN0b3IgPT09IE9iamVjdCkge1xuLy8gICAgIGZvciAodmFyIGtleSBvZiBPYmplY3Qua2V5cyhqc29uT2JqZWN0KSkge1xuLy8gICAgICAgdmFyIHZhbHVlID0ganNvbk9iamVjdFtrZXldO1xuLy8gICAgICAgdmFyIHRvRGlzcGxheTtcblxuLy8gICAgICAgaWYgKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUuY29uc3RydWN0b3IgPT09IE9iamVjdCkge1xuLy8gICAgICAgICB0b0Rpc3BsYXkgPSByZWFkSnNvbk9iamVjdCh2YWx1ZSk7XG4vLyAgICAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4vLyAgICAgICAgIHRvRGlzcGxheSA9IEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcbi8vICAgICAgICAgcmVhZEpzb25PYmplY3QodmFsdWUpO1xuLy8gICAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgdG9EaXNwbGF5ID0gdmFsdWU7XG4vLyAgICAgICB9XG4vLyAgICAgIGNvbnNvbGUubG9nKGtleSArIFwiOiBcIiArIHRvRGlzcGxheSk7XG4vLyAgICAgfVxuLy8gICB9XG5cbi8vICAgcmV0dXJuIGpzb25PYmplY3Q7XG4vLyB9XG48L3NjcmlwdD5cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU9BO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBR0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBZEE7QUFBQTtBQUNBO0FBREE7QUFjQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQWpCQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBbUJBO0FBQ0E7QUFBQTtBQUNBO0FBekNBO0FBOENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/index.js?!./src/App.vue?vue&type=script&lang=js\n");

/***/ })

})