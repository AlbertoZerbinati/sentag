webpackHotUpdate("app",{

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/index.js?!./src/App.vue?vue&type=script&lang=js":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader-v16/dist??ref--0-1!./src/App.vue?vue&type=script&lang=js ***!
  \*******************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.object.to-string */ \"./node_modules/core-js/modules/es.object.to-string.js\");\n/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.string.iterator */ \"./node_modules/core-js/modules/es.string.iterator.js\");\n/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator */ \"./node_modules/core-js/modules/web.dom-collections.iterator.js\");\n/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var core_js_modules_web_url__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/web.url */ \"./node_modules/core-js/modules/web.url.js\");\n/* harmony import */ var core_js_modules_web_url__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_url__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _home_zerbi_Documents_III_anno_tesi_sentag_ui_node_modules_babel_runtime_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/typeof */ \"./node_modules/@babel/runtime/helpers/esm/typeof.js\");\n/* harmony import */ var _home_zerbi_Documents_III_anno_tesi_sentag_ui_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/objectSpread2 */ \"./node_modules/@babel/runtime/helpers/esm/objectSpread2.js\");\n/* harmony import */ var _components_AnnotationPage__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/AnnotationPage */ \"./src/components/AnnotationPage.vue\");\n/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vuex */ \"./node_modules/vuex/dist/vuex.esm-browser.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var _assets_styles_scss__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./assets/styles.scss */ \"./src/assets/styles.scss\");\n/* harmony import */ var _assets_styles_scss__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_assets_styles_scss__WEBPACK_IMPORTED_MODULE_9__);\n\n\n\n\n\n\n\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: \"App\",\n  data: function data() {\n    return {\n      currentPage: \"annotator\",\n      title: \"\"\n    };\n  },\n  components: {\n    AnnotationPage: _components_AnnotationPage__WEBPACK_IMPORTED_MODULE_6__[\"default\"]\n  },\n  methods: Object(_home_zerbi_Documents_III_anno_tesi_sentag_ui_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_5__[\"default\"])({}, Object(vuex__WEBPACK_IMPORTED_MODULE_7__[\"mapMutations\"])([\"setInputSentences\", \"addClass\"])),\n  created: function created() {\n    var _this = this;\n\n    //ottengo il numero sentenza dall'url\n    var url = new URL(location.href)['pathname'];\n    var numero_sentenza = url[url.length - 2];\n    axios__WEBPACK_IMPORTED_MODULE_8___default.a.get(\"/api/\" + numero_sentenza).then(function (res) {\n      //la risposta contiene:\n      //le parole della sentenza\n      _this.setInputSentences(res.data['testo_iniziale']); //il titolo della sentenza\n\n\n      _this.title = res.data['nome']; //i tag da parsare, perché passati come xsd string\n\n      var xml = res.data['tags']; //console.log(xml)\n\n      var parser = new DOMParser();\n      var xmlDoc = parser.parseFromString(xml, \"text/xml\");\n      var elements = xmlDoc.evaluate(\"//xs:element\", xmlDoc, function (prefix) {\n        if (prefix === 'xs') {\n          return 'http://www.w3.org/2001/XMLSchema';\n        } else {\n          return null;\n        }\n      }, XPathResult.ANY_TYPE, null);\n      var element = elements.iterateNext(); //ROOT\n\n      while (element) {\n        element = elements.iterateNext();\n        console.log(Object(_home_zerbi_Documents_III_anno_tesi_sentag_ui_node_modules_babel_runtime_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(element));\n        var attributes = element.evaluate(\"//xs:attribute\", element, function (prefix) {\n          if (prefix === 'xs') {\n            return 'http://www.w3.org/2001/XMLSchema';\n          } else {\n            return null;\n          }\n        }, XPathResult.ANY_TYPE, null);\n        console.log(element);\n        console.log(attributes);\n        console.log(\"\\n\\n\");\n      } //this.addClass(element.getAttribute(\"name\"))\n\n    }).catch(function (err) {\n      return alert(err);\n    });\n  }\n}); // function readJsonObject(jsonObject) {\n//   if (Array.isArray(jsonObject)) {\n//     for (var el of jsonObject) {\n//       readJsonObject(el)\n//     }\n//     return\n//   } else if (typeof jsonObject === 'object' && jsonObject.constructor === Object) {\n//     for (var key of Object.keys(jsonObject)) {\n//       var value = jsonObject[key];\n//       var toDisplay;\n//       if (value && typeof value === 'object' && value.constructor === Object) {\n//         toDisplay = readJsonObject(value);\n//       } else if (Array.isArray(value)) {\n//         toDisplay = JSON.stringify(value);\n//         readJsonObject(value);\n//       } else {\n//         toDisplay = value;\n//       }\n//      console.log(key + \": \" + toDisplay);\n//     }\n//   }\n//   return jsonObject;\n// }//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvY2FjaGUtbG9hZGVyL2Rpc3QvY2pzLmpzPyEuL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzIS4vbm9kZV9tb2R1bGVzL2NhY2hlLWxvYWRlci9kaXN0L2Nqcy5qcz8hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci12MTYvZGlzdC9pbmRleC5qcz8hLi9zcmMvQXBwLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9BcHAudnVlPzNkZmQiXSwic291cmNlc0NvbnRlbnQiOlsiPHRlbXBsYXRlPlxuICA8ZGl2PlxuICAgIDxBbm5vdGF0aW9uUGFnZSA6dGl0bGU9XCJ0aXRsZVwiLz5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuaW1wb3J0IEFubm90YXRpb25QYWdlIGZyb20gXCIuL2NvbXBvbmVudHMvQW5ub3RhdGlvblBhZ2VcIjtcbmltcG9ydCB7IG1hcE11dGF0aW9ucyB9IGZyb20gXCJ2dWV4XCI7XG5pbXBvcnQgYXhpb3MgZnJvbSBcImF4aW9zXCJcblxuaW1wb3J0IFwiLi9hc3NldHMvc3R5bGVzLnNjc3NcIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiBcIkFwcFwiLFxuICBkYXRhOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY3VycmVudFBhZ2U6IFwiYW5ub3RhdG9yXCIsXG4gICAgICB0aXRsZTogXCJcIixcbiAgICB9O1xuICB9LFxuICBjb21wb25lbnRzOiB7XG4gICAgQW5ub3RhdGlvblBhZ2UsXG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICAuLi5tYXBNdXRhdGlvbnMoW1wic2V0SW5wdXRTZW50ZW5jZXNcIixcImFkZENsYXNzXCJdKSxcbiAgfSxcbiAgY3JlYXRlZCgpIHtcbiAgICAvL290dGVuZ28gaWwgbnVtZXJvIHNlbnRlbnphIGRhbGwndXJsXG4gICAgY29uc3QgdXJsID0gbmV3IFVSTChsb2NhdGlvbi5ocmVmKVsncGF0aG5hbWUnXTtcbiAgICBjb25zdCBudW1lcm9fc2VudGVuemEgPSB1cmxbdXJsLmxlbmd0aC0yXVxuICAgIGF4aW9zXG4gICAgICAgIC5nZXQoXCIvYXBpL1wiK251bWVyb19zZW50ZW56YSlcbiAgICAgICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgIC8vbGEgcmlzcG9zdGEgY29udGllbmU6XG4gICAgICAgICAgLy9sZSBwYXJvbGUgZGVsbGEgc2VudGVuemFcbiAgICAgICAgICB0aGlzLnNldElucHV0U2VudGVuY2VzKHJlcy5kYXRhWyd0ZXN0b19pbml6aWFsZSddKTtcbiAgICAgICAgICAvL2lsIHRpdG9sbyBkZWxsYSBzZW50ZW56YVxuICAgICAgICAgIHRoaXMudGl0bGUgPSByZXMuZGF0YVsnbm9tZSddO1xuXG4gICAgICAgICAgLy9pIHRhZyBkYSBwYXJzYXJlLCBwZXJjaMOpIHBhc3NhdGkgY29tZSB4c2Qgc3RyaW5nXG4gICAgICAgICAgbGV0IHhtbCA9IHJlcy5kYXRhWyd0YWdzJ11cbiAgICAgICAgICAvL2NvbnNvbGUubG9nKHhtbClcbiAgICAgICAgICBsZXQgcGFyc2VyID0gbmV3IERPTVBhcnNlcigpO1xuICAgICAgICAgIGxldCB4bWxEb2MgPSBwYXJzZXIucGFyc2VGcm9tU3RyaW5nKHhtbCxcInRleHQveG1sXCIpO1xuICAgICAgICAgIGxldCBlbGVtZW50cyA9IHhtbERvYy5ldmFsdWF0ZShcIi8veHM6ZWxlbWVudFwiLCB4bWxEb2MsIFxuICAgICAgICAgICAgZnVuY3Rpb24ocHJlZml4KSB7IFxuICAgICAgICAgICAgICBpZiAocHJlZml4ID09PSAneHMnKSB7IFxuICAgICAgICAgICAgICAgIHJldHVybiAnaHR0cDovL3d3dy53My5vcmcvMjAwMS9YTUxTY2hlbWEnOyBcbiAgICAgICAgICAgICAgfSBlbHNlIHsgXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7IFxuICAgICAgICAgICAgICAgIH19LFhQYXRoUmVzdWx0LkFOWV9UWVBFLG51bGwpO1xuXG4gICAgICAgICAgbGV0IGVsZW1lbnQgPSBlbGVtZW50cy5pdGVyYXRlTmV4dCgpOyAvL1JPT1RcbiAgICAgICAgICB3aGlsZShlbGVtZW50KSB7XG4gICAgICAgICAgICBlbGVtZW50ID0gZWxlbWVudHMuaXRlcmF0ZU5leHQoKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHR5cGVvZiBlbGVtZW50KVxuICAgICAgICAgICAgbGV0IGF0dHJpYnV0ZXMgPSBlbGVtZW50LmV2YWx1YXRlKFwiLy94czphdHRyaWJ1dGVcIiwgZWxlbWVudCwgXG4gICAgICAgICAgICBmdW5jdGlvbihwcmVmaXgpIHsgXG4gICAgICAgICAgICAgIGlmIChwcmVmaXggPT09ICd4cycpIHsgXG4gICAgICAgICAgICAgICAgcmV0dXJuICdodHRwOi8vd3d3LnczLm9yZy8yMDAxL1hNTFNjaGVtYSc7IFxuICAgICAgICAgICAgICB9IGVsc2UgeyBcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDsgXG4gICAgICAgICAgICAgICAgfX0sWFBhdGhSZXN1bHQuQU5ZX1RZUEUsbnVsbCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlbGVtZW50KTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGF0dHJpYnV0ZXMpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJcXG5cXG5cIik7XG4gICAgICAgICAgfVxuXG5cbiAgICAgICAgICAvL3RoaXMuYWRkQ2xhc3MoZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJuYW1lXCIpKVxuICAgICAgICB9KVxuICAgIC5jYXRjaCgoZXJyKSA9PiBhbGVydChlcnIpKTtcbiAgfVxuXG59O1xuXG4vLyBmdW5jdGlvbiByZWFkSnNvbk9iamVjdChqc29uT2JqZWN0KSB7XG4vLyAgIGlmIChBcnJheS5pc0FycmF5KGpzb25PYmplY3QpKSB7XG4vLyAgICAgZm9yICh2YXIgZWwgb2YganNvbk9iamVjdCkge1xuLy8gICAgICAgcmVhZEpzb25PYmplY3QoZWwpXG4vLyAgICAgfVxuLy8gICAgIHJldHVyblxuLy8gICB9IGVsc2UgaWYgKHR5cGVvZiBqc29uT2JqZWN0ID09PSAnb2JqZWN0JyAmJiBqc29uT2JqZWN0LmNvbnN0cnVjdG9yID09PSBPYmplY3QpIHtcbi8vICAgICBmb3IgKHZhciBrZXkgb2YgT2JqZWN0LmtleXMoanNvbk9iamVjdCkpIHtcbi8vICAgICAgIHZhciB2YWx1ZSA9IGpzb25PYmplY3Rba2V5XTtcbi8vICAgICAgIHZhciB0b0Rpc3BsYXk7XG5cbi8vICAgICAgIGlmICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlLmNvbnN0cnVjdG9yID09PSBPYmplY3QpIHtcbi8vICAgICAgICAgdG9EaXNwbGF5ID0gcmVhZEpzb25PYmplY3QodmFsdWUpO1xuLy8gICAgICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuLy8gICAgICAgICB0b0Rpc3BsYXkgPSBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XG4vLyAgICAgICAgIHJlYWRKc29uT2JqZWN0KHZhbHVlKTtcbi8vICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgIHRvRGlzcGxheSA9IHZhbHVlO1xuLy8gICAgICAgfVxuLy8gICAgICBjb25zb2xlLmxvZyhrZXkgKyBcIjogXCIgKyB0b0Rpc3BsYXkpO1xuLy8gICAgIH1cbi8vICAgfVxuXG4vLyAgIHJldHVybiBqc29uT2JqZWN0O1xuLy8gfVxuPC9zY3JpcHQ+XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBT0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFHQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQUE7QUFDQTtBQTVEQTtBQWlFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/index.js?!./src/App.vue?vue&type=script&lang=js\n");

/***/ })

})