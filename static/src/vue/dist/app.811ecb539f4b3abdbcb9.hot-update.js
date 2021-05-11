webpackHotUpdate("app",{

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/index.js?!./src/App.vue?vue&type=script&lang=js":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader-v16/dist??ref--0-1!./src/App.vue?vue&type=script&lang=js ***!
  \*******************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.object.to-string */ \"./node_modules/core-js/modules/es.object.to-string.js\");\n/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.string.iterator */ \"./node_modules/core-js/modules/es.string.iterator.js\");\n/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator */ \"./node_modules/core-js/modules/web.dom-collections.iterator.js\");\n/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var core_js_modules_web_url__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/web.url */ \"./node_modules/core-js/modules/web.url.js\");\n/* harmony import */ var core_js_modules_web_url__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_url__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _home_zerbi_Documents_III_anno_tesi_sentag_ui_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/objectSpread2 */ \"./node_modules/@babel/runtime/helpers/esm/objectSpread2.js\");\n/* harmony import */ var _components_AnnotationPage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/AnnotationPage */ \"./src/components/AnnotationPage.vue\");\n/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vuex */ \"./node_modules/vuex/dist/vuex.esm-browser.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var _assets_styles_scss__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./assets/styles.scss */ \"./src/assets/styles.scss\");\n/* harmony import */ var _assets_styles_scss__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_assets_styles_scss__WEBPACK_IMPORTED_MODULE_8__);\n\n\n\n\n\n\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: \"App\",\n  data: function data() {\n    return {\n      currentPage: \"annotator\",\n      title: \"\"\n    };\n  },\n  components: {\n    AnnotationPage: _components_AnnotationPage__WEBPACK_IMPORTED_MODULE_5__[\"default\"]\n  },\n  methods: Object(_home_zerbi_Documents_III_anno_tesi_sentag_ui_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_4__[\"default\"])({}, Object(vuex__WEBPACK_IMPORTED_MODULE_6__[\"mapMutations\"])([\"setInputSentences\", \"addClass\"])),\n  created: function created() {\n    var _this = this;\n\n    //ottengo il numero sentenza dall'url\n    var url = new URL(location.href)['pathname'];\n    var numero_sentenza = url[url.length - 2];\n    axios__WEBPACK_IMPORTED_MODULE_7___default.a.get(\"/api/\" + numero_sentenza).then(function (res) {\n      //la risposta contiene:\n      //le parole della sentenza\n      _this.setInputSentences(res.data['testo_iniziale']); //il titolo della sentenza\n\n\n      _this.title = res.data['nome']; //i tag da parsare, perché passati come xsd string\n\n      var xml = res.data['tags']; //console.log(xml)\n\n      var parser = new DOMParser();\n      var xmlDoc = parser.parseFromString(xml, \"text/xml\");\n      var elements = xmlDoc.evaluate(\"//xs:element\", xmlDoc, function (prefix) {\n        if (prefix === 'xs') {\n          return 'http://www.w3.org/2001/XMLSchema';\n        } else {\n          return null;\n        }\n      }, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);\n      var element = elements.snapshotItem(0); //ROOT\n\n      for (var i = 1; i < elements.snapshotLength; i++) {\n        element = elements.snapshotItem(i);\n        console.log(element);\n\n        if (element != null) {\n          var name = element.getAttribute('name'); //console.log(name);\n          //xs:element[@name='proc']//xs:attribute[not(parent::xs:extension)]\n\n          console.log('//xs:element[@name=\\'' + name + '\\']/xs:complexType/xs:attribute');\n          var attributes = xmlDoc.evaluate('//xs:element[@name=\\'' + name + '\\']/xs:complexType/xs:attribute', xmlDoc, function (prefix) {\n            if (prefix === 'xs') {\n              return 'http://www.w3.org/2001/XMLSchema';\n            } else {\n              return null;\n            }\n          }, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);\n          var attribute = attributes.snapshotItem(0);\n          console.log(attribute);\n\n          if (attribute == null) {\n            attributes = xmlDoc.evaluate('//xs:element[@name=\\'' + name + '\\']/xs:complexType/xs:simpleContent/xs:extension/xs:attribute', xmlDoc, function (prefix) {\n              if (prefix === 'xs') {\n                return 'http://www.w3.org/2001/XMLSchema';\n              } else {\n                return null;\n              }\n            }, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);\n            attribute = attributes.snapshotItem(0);\n          }\n\n          var attrs = [];\n\n          while (attribute) {\n            if (attribute != null) {\n              var attr = attribute.getAttribute('name'); //console.log(attr);\n\n              attrs.push(attr);\n            }\n\n            attribute = attributes.snapshotItem(0);\n          }\n\n          _this.addClass([name, attrs]);\n\n          element.setAttribute('name', 'CONSUMED');\n        } //console.log(\"\\n\");\n\n      } //this.addClass(element.getAttribute(\"name\"))\n\n    }).catch(function (err) {\n      return alert(err);\n    });\n  }\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvY2FjaGUtbG9hZGVyL2Rpc3QvY2pzLmpzPyEuL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzIS4vbm9kZV9tb2R1bGVzL2NhY2hlLWxvYWRlci9kaXN0L2Nqcy5qcz8hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci12MTYvZGlzdC9pbmRleC5qcz8hLi9zcmMvQXBwLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9BcHAudnVlPzNkZmQiXSwic291cmNlc0NvbnRlbnQiOlsiPHRlbXBsYXRlPlxuICA8ZGl2PlxuICAgIDxBbm5vdGF0aW9uUGFnZSA6dGl0bGU9XCJ0aXRsZVwiLz5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuaW1wb3J0IEFubm90YXRpb25QYWdlIGZyb20gXCIuL2NvbXBvbmVudHMvQW5ub3RhdGlvblBhZ2VcIjtcbmltcG9ydCB7IG1hcE11dGF0aW9ucyB9IGZyb20gXCJ2dWV4XCI7XG5pbXBvcnQgYXhpb3MgZnJvbSBcImF4aW9zXCJcblxuaW1wb3J0IFwiLi9hc3NldHMvc3R5bGVzLnNjc3NcIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiBcIkFwcFwiLFxuICBkYXRhOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY3VycmVudFBhZ2U6IFwiYW5ub3RhdG9yXCIsXG4gICAgICB0aXRsZTogXCJcIixcbiAgICB9O1xuICB9LFxuICBjb21wb25lbnRzOiB7XG4gICAgQW5ub3RhdGlvblBhZ2UsXG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICAuLi5tYXBNdXRhdGlvbnMoW1wic2V0SW5wdXRTZW50ZW5jZXNcIixcImFkZENsYXNzXCJdKSxcbiAgfSxcbiAgY3JlYXRlZCgpIHtcbiAgICAvL290dGVuZ28gaWwgbnVtZXJvIHNlbnRlbnphIGRhbGwndXJsXG4gICAgY29uc3QgdXJsID0gbmV3IFVSTChsb2NhdGlvbi5ocmVmKVsncGF0aG5hbWUnXTtcbiAgICBjb25zdCBudW1lcm9fc2VudGVuemEgPSB1cmxbdXJsLmxlbmd0aC0yXVxuICAgIGF4aW9zXG4gICAgICAgIC5nZXQoXCIvYXBpL1wiK251bWVyb19zZW50ZW56YSlcbiAgICAgICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgIC8vbGEgcmlzcG9zdGEgY29udGllbmU6XG4gICAgICAgICAgLy9sZSBwYXJvbGUgZGVsbGEgc2VudGVuemFcbiAgICAgICAgICB0aGlzLnNldElucHV0U2VudGVuY2VzKHJlcy5kYXRhWyd0ZXN0b19pbml6aWFsZSddKTtcbiAgICAgICAgICAvL2lsIHRpdG9sbyBkZWxsYSBzZW50ZW56YVxuICAgICAgICAgIHRoaXMudGl0bGUgPSByZXMuZGF0YVsnbm9tZSddO1xuXG4gICAgICAgICAgLy9pIHRhZyBkYSBwYXJzYXJlLCBwZXJjaMOpIHBhc3NhdGkgY29tZSB4c2Qgc3RyaW5nXG4gICAgICAgICAgbGV0IHhtbCA9IHJlcy5kYXRhWyd0YWdzJ11cbiAgICAgICAgICAvL2NvbnNvbGUubG9nKHhtbClcbiAgICAgICAgICBsZXQgcGFyc2VyID0gbmV3IERPTVBhcnNlcigpO1xuICAgICAgICAgIGxldCB4bWxEb2MgPSBwYXJzZXIucGFyc2VGcm9tU3RyaW5nKHhtbCxcInRleHQveG1sXCIpO1xuICAgICAgICAgIGxldCBlbGVtZW50cyA9IHhtbERvYy5ldmFsdWF0ZShcIi8veHM6ZWxlbWVudFwiLCB4bWxEb2MsIFxuICAgICAgICAgICAgZnVuY3Rpb24ocHJlZml4KSB7IFxuICAgICAgICAgICAgICBpZiAocHJlZml4ID09PSAneHMnKSB7IFxuICAgICAgICAgICAgICAgIHJldHVybiAnaHR0cDovL3d3dy53My5vcmcvMjAwMS9YTUxTY2hlbWEnOyBcbiAgICAgICAgICAgICAgfSBlbHNlIHsgXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7IFxuICAgICAgICAgICAgICAgIH19LFhQYXRoUmVzdWx0Lk9SREVSRURfTk9ERV9TTkFQU0hPVF9UWVBFLG51bGwpO1xuICAgICAgICAgIGxldCBlbGVtZW50ID0gZWxlbWVudHMuc25hcHNob3RJdGVtKDApOyAvL1JPT1RcblxuICAgICAgICAgIGZvcihsZXQgaSA9IDE7IGkgPCBlbGVtZW50cy5zbmFwc2hvdExlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBlbGVtZW50ID0gZWxlbWVudHMuc25hcHNob3RJdGVtKGkpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZWxlbWVudCk7XG4gICAgICAgICAgICBpZihlbGVtZW50ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgbGV0IG5hbWUgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnbmFtZScpO1xuICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKG5hbWUpO1xuICAgICAgICAgICAgICAvL3hzOmVsZW1lbnRbQG5hbWU9J3Byb2MnXS8veHM6YXR0cmlidXRlW25vdChwYXJlbnQ6OnhzOmV4dGVuc2lvbildXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCcvL3hzOmVsZW1lbnRbQG5hbWU9XFwnJytuYW1lKydcXCddL3hzOmNvbXBsZXhUeXBlL3hzOmF0dHJpYnV0ZScpICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgbGV0IGF0dHJpYnV0ZXMgPSB4bWxEb2MuZXZhbHVhdGUoJy8veHM6ZWxlbWVudFtAbmFtZT1cXCcnK25hbWUrJ1xcJ10veHM6Y29tcGxleFR5cGUveHM6YXR0cmlidXRlJywgeG1sRG9jLCBcbiAgICAgICAgICAgICAgZnVuY3Rpb24ocHJlZml4KSB7IFxuICAgICAgICAgICAgICAgIGlmIChwcmVmaXggPT09ICd4cycpIHsgXG4gICAgICAgICAgICAgICAgICByZXR1cm4gJ2h0dHA6Ly93d3cudzMub3JnLzIwMDEvWE1MU2NoZW1hJztcbiAgICAgICAgICAgICAgICB9IGVsc2UgeyBcbiAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsOyBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0sWFBhdGhSZXN1bHQuT1JERVJFRF9OT0RFX1NOQVBTSE9UX1RZUEUsbnVsbCk7XG4gICAgICAgICAgICAgIGxldCBhdHRyaWJ1dGUgPSBhdHRyaWJ1dGVzLnNuYXBzaG90SXRlbSgwKTtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coYXR0cmlidXRlKVxuICAgICAgICAgICAgICBpZiAoYXR0cmlidXRlID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzID0geG1sRG9jLmV2YWx1YXRlKCcvL3hzOmVsZW1lbnRbQG5hbWU9XFwnJytuYW1lKydcXCddL3hzOmNvbXBsZXhUeXBlL3hzOnNpbXBsZUNvbnRlbnQveHM6ZXh0ZW5zaW9uL3hzOmF0dHJpYnV0ZScsIHhtbERvYywgXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24ocHJlZml4KSB7IFxuICAgICAgICAgICAgICAgICAgaWYgKHByZWZpeCA9PT0gJ3hzJykgeyBcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdodHRwOi8vd3d3LnczLm9yZy8yMDAxL1hNTFNjaGVtYSc7IFxuICAgICAgICAgICAgICAgICAgfSBlbHNlIHsgXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsOyBcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFhQYXRoUmVzdWx0Lk9SREVSRURfTk9ERV9TTkFQU0hPVF9UWVBFLG51bGwpO1xuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZSA9IGF0dHJpYnV0ZXMuc25hcHNob3RJdGVtKDApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGxldCBhdHRycyA9IFtdXG4gICAgICAgICAgICAgIHdoaWxlKGF0dHJpYnV0ZSl7XG4gICAgICAgICAgICAgICAgaWYoYXR0cmlidXRlICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgIGxldCBhdHRyID0gYXR0cmlidXRlLmdldEF0dHJpYnV0ZSgnbmFtZScpO1xuICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhhdHRyKTtcbiAgICAgICAgICAgICAgICAgIGF0dHJzLnB1c2goYXR0cik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZSA9IGF0dHJpYnV0ZXMuc25hcHNob3RJdGVtKDApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHRoaXMuYWRkQ2xhc3MoW25hbWUsYXR0cnNdKVxuICAgICAgICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnbmFtZScsJ0NPTlNVTUVEJylcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIlxcblwiKTtcbiAgICAgICAgICB9XG5cblxuICAgICAgICAgIC8vdGhpcy5hZGRDbGFzcyhlbGVtZW50LmdldEF0dHJpYnV0ZShcIm5hbWVcIikpXG4gICAgICAgIH0pXG4gICAgLmNhdGNoKChlcnIpID0+IGFsZXJ0KGVycikpO1xuICB9XG5cbn07XG48L3NjcmlwdD5cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBT0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFHQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFFQTtBQUNBO0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUdBO0FBQ0E7QUFBQTtBQUNBO0FBMUZBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/index.js?!./src/App.vue?vue&type=script&lang=js\n");

/***/ })

})