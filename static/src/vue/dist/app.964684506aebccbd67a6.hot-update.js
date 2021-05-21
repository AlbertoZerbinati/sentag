webpackHotUpdate("app",{

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/index.js?!./src/App.vue?vue&type=script&lang=js":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader-v16/dist??ref--0-1!./src/App.vue?vue&type=script&lang=js ***!
  \*******************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.function.name */ \"./node_modules/core-js/modules/es.function.name.js\");\n/* harmony import */ var core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.object.to-string */ \"./node_modules/core-js/modules/es.object.to-string.js\");\n/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.regexp.exec */ \"./node_modules/core-js/modules/es.regexp.exec.js\");\n/* harmony import */ var core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.string.iterator */ \"./node_modules/core-js/modules/es.string.iterator.js\");\n/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var core_js_modules_es_string_split__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.string.split */ \"./node_modules/core-js/modules/es.string.split.js\");\n/* harmony import */ var core_js_modules_es_string_split__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_split__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator */ \"./node_modules/core-js/modules/web.dom-collections.iterator.js\");\n/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var core_js_modules_web_url__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/web.url */ \"./node_modules/core-js/modules/web.url.js\");\n/* harmony import */ var core_js_modules_web_url__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_url__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _home_zerbi_Documents_III_anno_tesi_sentag_ui_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/objectSpread2 */ \"./node_modules/@babel/runtime/helpers/esm/objectSpread2.js\");\n/* harmony import */ var _components_AnnotationPage__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/AnnotationPage */ \"./src/components/AnnotationPage.vue\");\n/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! vuex */ \"./node_modules/vuex/dist/vuex.esm-browser.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_10__);\n/* harmony import */ var _assets_styles_scss__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./assets/styles.scss */ \"./src/assets/styles.scss\");\n/* harmony import */ var _assets_styles_scss__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_assets_styles_scss__WEBPACK_IMPORTED_MODULE_11__);\n\n\n\n\n\n\n\n\n\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: \"App\",\n  data: function data() {\n    return {\n      currentPage: \"annotator\",\n      title: \"\",\n      oldtm: \"\",\n      go: false\n    };\n  },\n  components: {\n    AnnotationPage: _components_AnnotationPage__WEBPACK_IMPORTED_MODULE_8__[\"default\"]\n  },\n  methods: Object(_home_zerbi_Documents_III_anno_tesi_sentag_ui_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_7__[\"default\"])({}, Object(vuex__WEBPACK_IMPORTED_MODULE_9__[\"mapMutations\"])([\"setInputSentences\", \"addClass\"])),\n  created: function created() {\n    var _this = this;\n\n    //ottengo il numero sentenza dall'url\n    var url = new URL(location.href)['pathname'];\n    var numero_sentenza = url.split('/')[2];\n    axios__WEBPACK_IMPORTED_MODULE_10___default.a.get(\"/api/\" + numero_sentenza).then(function (res) {\n      // console.table(res.data)\n      //la risposta contiene:\n      //le parole della sentenza\n      _this.setInputSentences(res.data['initial_text']); //il titolo della sentenza\n\n\n      _this.title = res.data['name']; //il vecchio token manager\n\n      _this.oldtm = res.data['token_manager']; //il fatto che la sentenza sia già stata completata o meno \n      //this.completed = res.sata['completed']\n      //i tag da parsare, perché passati come xsd string\n\n      var xml = res.data['tags'];\n      var parser = new DOMParser();\n      var xmlDoc = parser.parseFromString(xml, \"text/xml\");\n      var elements = xmlDoc.evaluate(\"//xs:element\", xmlDoc, function (prefix) {\n        if (prefix === 'xs') {\n          return 'http://www.w3.org/2001/XMLSchema';\n        } else {\n          return null;\n        }\n      }, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);\n\n      for (var i = 1; i < elements.snapshotLength; i++) {\n        var element = elements.snapshotItem(i); //console.log(element);\n\n        var name = element.getAttribute('name'); //console.log(name);\n        //console.log('//xs:element[@name=\\''+name+'\\']/xs:complexType/xs:attribute')              \n\n        var attributes = xmlDoc.evaluate('//xs:element[@name=\\'' + name + '\\']/xs:complexType/xs:attribute', xmlDoc, function (prefix) {\n          if (prefix === 'xs') {\n            return 'http://www.w3.org/2001/XMLSchema';\n          } else {\n            return null;\n          }\n        }, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);\n\n        if (attributes.snapshotLength == 0) {\n          attributes = xmlDoc.evaluate('//xs:element[@name=\\'' + name + '\\']/xs:complexType/xs:simpleContent/xs:extension/xs:attribute', xmlDoc, function (prefix) {\n            if (prefix === 'xs') {\n              return 'http://www.w3.org/2001/XMLSchema';\n            } else {\n              return null;\n            }\n          }, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);\n        }\n\n        var attrs = [];\n\n        for (var _i = 0; _i < attributes.snapshotLength; _i++) {\n          var attribute = attributes.snapshotItem(_i);\n          var attr = attribute.getAttribute('name'); //console.log(attr);\n\n          attrs.push(attr);\n        }\n\n        _this.addClass([name, attrs]);\n\n        element.setAttribute('name', 'CONSUMED'); //console.log(\"\\n\");\n      }\n\n      _this.go = true;\n    }).catch(function (err) {\n      return alert(err);\n    });\n  }\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvY2FjaGUtbG9hZGVyL2Rpc3QvY2pzLmpzPyEuL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzIS4vbm9kZV9tb2R1bGVzL2NhY2hlLWxvYWRlci9kaXN0L2Nqcy5qcz8hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci12MTYvZGlzdC9pbmRleC5qcz8hLi9zcmMvQXBwLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9BcHAudnVlPzNkZmQiXSwic291cmNlc0NvbnRlbnQiOlsiPHRlbXBsYXRlPlxuICA8ZGl2PlxuICAgIDxBbm5vdGF0aW9uUGFnZSB2LWlmPVwiZ29cIiA6dGl0bGU9XCJ0aXRsZVwiIDpvbGR0bT1cIm9sZHRtXCIvPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5pbXBvcnQgQW5ub3RhdGlvblBhZ2UgZnJvbSBcIi4vY29tcG9uZW50cy9Bbm5vdGF0aW9uUGFnZVwiO1xuaW1wb3J0IHsgbWFwTXV0YXRpb25zIH0gZnJvbSBcInZ1ZXhcIjtcbmltcG9ydCBheGlvcyBmcm9tIFwiYXhpb3NcIlxuXG5pbXBvcnQgXCIuL2Fzc2V0cy9zdHlsZXMuc2Nzc1wiO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6IFwiQXBwXCIsXG4gIGRhdGE6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjdXJyZW50UGFnZTogXCJhbm5vdGF0b3JcIixcbiAgICAgIHRpdGxlOiBcIlwiLFxuICAgICAgb2xkdG06IFwiXCIsXG4gICAgICBnbzpmYWxzZSxcbiAgICB9O1xuICB9LFxuICBjb21wb25lbnRzOiB7XG4gICAgQW5ub3RhdGlvblBhZ2UsXG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICAuLi5tYXBNdXRhdGlvbnMoW1wic2V0SW5wdXRTZW50ZW5jZXNcIixcImFkZENsYXNzXCJdKSxcbiAgfSxcbiAgY3JlYXRlZCgpIHtcbiAgICAvL290dGVuZ28gaWwgbnVtZXJvIHNlbnRlbnphIGRhbGwndXJsXG4gICAgY29uc3QgdXJsID0gbmV3IFVSTChsb2NhdGlvbi5ocmVmKVsncGF0aG5hbWUnXTtcbiAgICBjb25zdCBudW1lcm9fc2VudGVuemEgPSB1cmwuc3BsaXQoJy8nKVsyXVxuICAgIGF4aW9zXG4gICAgICAgIC5nZXQoXCIvYXBpL1wiK251bWVyb19zZW50ZW56YSlcbiAgICAgICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgIC8vIGNvbnNvbGUudGFibGUocmVzLmRhdGEpXG5cbiAgICAgICAgICAvL2xhIHJpc3Bvc3RhIGNvbnRpZW5lOlxuICAgICAgICAgIC8vbGUgcGFyb2xlIGRlbGxhIHNlbnRlbnphXG4gICAgICAgICAgdGhpcy5zZXRJbnB1dFNlbnRlbmNlcyhyZXMuZGF0YVsnaW5pdGlhbF90ZXh0J10pO1xuICAgICAgICAgIC8vaWwgdGl0b2xvIGRlbGxhIHNlbnRlbnphXG4gICAgICAgICAgdGhpcy50aXRsZSA9IHJlcy5kYXRhWyduYW1lJ107XG4gICAgICAgICAgLy9pbCB2ZWNjaGlvIHRva2VuIG1hbmFnZXJcbiAgICAgICAgICB0aGlzLm9sZHRtID0gcmVzLmRhdGFbJ3Rva2VuX21hbmFnZXInXTtcblxuICAgICAgICAgIC8vaWwgZmF0dG8gY2hlIGxhIHNlbnRlbnphIHNpYSBnacOgIHN0YXRhIGNvbXBsZXRhdGEgbyBtZW5vIFxuICAgICAgICAgIC8vdGhpcy5jb21wbGV0ZWQgPSByZXMuc2F0YVsnY29tcGxldGVkJ11cblxuICAgICAgICAgIC8vaSB0YWcgZGEgcGFyc2FyZSwgcGVyY2jDqSBwYXNzYXRpIGNvbWUgeHNkIHN0cmluZ1xuICAgICAgICAgIGxldCB4bWwgPSByZXMuZGF0YVsndGFncyddXG5cbiAgICAgICAgICBsZXQgcGFyc2VyID0gbmV3IERPTVBhcnNlcigpO1xuICAgICAgICAgIGxldCB4bWxEb2MgPSBwYXJzZXIucGFyc2VGcm9tU3RyaW5nKHhtbCxcInRleHQveG1sXCIpO1xuICAgICAgICAgIGxldCBlbGVtZW50cyA9IHhtbERvYy5ldmFsdWF0ZShcIi8veHM6ZWxlbWVudFwiLCB4bWxEb2MsIFxuICAgICAgICAgICAgZnVuY3Rpb24ocHJlZml4KSB7IFxuICAgICAgICAgICAgICBpZiAocHJlZml4ID09PSAneHMnKSB7IFxuICAgICAgICAgICAgICAgIHJldHVybiAnaHR0cDovL3d3dy53My5vcmcvMjAwMS9YTUxTY2hlbWEnOyBcbiAgICAgICAgICAgICAgfSBlbHNlIHsgXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7IFxuICAgICAgICAgICAgICAgIH19LFhQYXRoUmVzdWx0Lk9SREVSRURfTk9ERV9TTkFQU0hPVF9UWVBFLG51bGwpO1xuXG4gICAgICAgICAgZm9yKGxldCBpID0gMTsgaSA8IGVsZW1lbnRzLnNuYXBzaG90TGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBlbGVtZW50ID0gZWxlbWVudHMuc25hcHNob3RJdGVtKGkpO1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhlbGVtZW50KTtcbiAgICAgICAgICAgIGxldCBuYW1lID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ25hbWUnKTtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2cobmFtZSk7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCcvL3hzOmVsZW1lbnRbQG5hbWU9XFwnJytuYW1lKydcXCddL3hzOmNvbXBsZXhUeXBlL3hzOmF0dHJpYnV0ZScpICAgICAgICAgICAgICBcbiAgICAgICAgICAgIGxldCBhdHRyaWJ1dGVzID0geG1sRG9jLmV2YWx1YXRlKCcvL3hzOmVsZW1lbnRbQG5hbWU9XFwnJytuYW1lKydcXCddL3hzOmNvbXBsZXhUeXBlL3hzOmF0dHJpYnV0ZScsIHhtbERvYywgXG4gICAgICAgICAgICBmdW5jdGlvbihwcmVmaXgpIHsgXG4gICAgICAgICAgICAgIGlmIChwcmVmaXggPT09ICd4cycpIHsgXG4gICAgICAgICAgICAgICAgcmV0dXJuICdodHRwOi8vd3d3LnczLm9yZy8yMDAxL1hNTFNjaGVtYSc7XG4gICAgICAgICAgICAgIH0gZWxzZSB7IFxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFhQYXRoUmVzdWx0Lk9SREVSRURfTk9ERV9TTkFQU0hPVF9UWVBFLG51bGwpO1xuICAgICAgICAgICAgaWYgKGF0dHJpYnV0ZXMuc25hcHNob3RMZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgICBhdHRyaWJ1dGVzID0geG1sRG9jLmV2YWx1YXRlKCcvL3hzOmVsZW1lbnRbQG5hbWU9XFwnJytuYW1lKydcXCddL3hzOmNvbXBsZXhUeXBlL3hzOnNpbXBsZUNvbnRlbnQveHM6ZXh0ZW5zaW9uL3hzOmF0dHJpYnV0ZScsIHhtbERvYywgXG4gICAgICAgICAgICAgIGZ1bmN0aW9uKHByZWZpeCkgeyBcbiAgICAgICAgICAgICAgICBpZiAocHJlZml4ID09PSAneHMnKSB7IFxuICAgICAgICAgICAgICAgICAgcmV0dXJuICdodHRwOi8vd3d3LnczLm9yZy8yMDAxL1hNTFNjaGVtYSc7IFxuICAgICAgICAgICAgICAgIH0gZWxzZSB7IFxuICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7IFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSxYUGF0aFJlc3VsdC5PUkRFUkVEX05PREVfU05BUFNIT1RfVFlQRSxudWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBhdHRycyA9IFtdXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgYXR0cmlidXRlcy5zbmFwc2hvdExlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgIGxldCBhdHRyaWJ1dGUgPSBhdHRyaWJ1dGVzLnNuYXBzaG90SXRlbShpKTsgXG4gICAgICAgICAgICAgIGxldCBhdHRyID0gYXR0cmlidXRlLmdldEF0dHJpYnV0ZSgnbmFtZScpO1xuICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKGF0dHIpO1xuICAgICAgICAgICAgICBhdHRycy5wdXNoKGF0dHIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5hZGRDbGFzcyhbbmFtZSxhdHRyc10pXG4gICAgICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnbmFtZScsJ0NPTlNVTUVEJylcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIlxcblwiKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5nbz10cnVlO1xuICAgICAgICB9KVxuICAgIC5jYXRjaCgoZXJyKSA9PiBhbGVydChlcnIpKTtcbiAgfVxuXG59O1xuPC9zY3JpcHQ+XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU9BO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBTUE7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUdBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBR0E7QUFFQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUdBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBeEZBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/index.js?!./src/App.vue?vue&type=script&lang=js\n");

/***/ })

})