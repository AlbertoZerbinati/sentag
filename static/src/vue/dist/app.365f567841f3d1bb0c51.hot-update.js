webpackHotUpdate("app",{

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader-v16/dist/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/index.js?!./src/components/ClassesBlock.vue?vue&type=template&id=5df20692&scoped=true&bindings={\"attr\":\"props\"}":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader-v16/dist??ref--0-1!./src/components/ClassesBlock.vue?vue&type=template&id=5df20692&scoped=true&bindings={"attr":"props"} ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony import */ var core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.function.name */ \"./node_modules/core-js/modules/es.function.name.js\");\n/* harmony import */ var core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.esm-bundler.js\");\n\n\n\nvar _withId = /*#__PURE__*/Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"withScopeId\"])(\"data-v-5df20692\");\n\nObject(vue__WEBPACK_IMPORTED_MODULE_1__[\"pushScopeId\"])(\"data-v-5df20692\");\n\nvar _hoisted_1 = {\n  key: 0,\n  class: \"columns is-multiline\"\n};\nvar _hoisted_2 = {\n  class: \"tags is-medium\"\n};\n\nvar _hoisted_3 = /*#__PURE__*/Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"createVNode\"])(\"br\", null, null, -1\n/* HOISTED */\n);\n\nvar _hoisted_4 = {\n  key: 1,\n  class: \"columns is-multiline\"\n};\nvar _hoisted_5 = {\n  class: \"tags is-medium\"\n};\n\nvar _hoisted_6 = /*#__PURE__*/Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"createVNode\"])(\"input\", {\n  class: \"input\"\n}, null, -1\n/* HOISTED */\n);\n\nObject(vue__WEBPACK_IMPORTED_MODULE_1__[\"popScopeId\"])();\n\nvar render = /*#__PURE__*/_withId(function render(_ctx, _cache, $props, $setup, $data, $options) {\n  return Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"openBlock\"])(), Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"createBlock\"])(vue__WEBPACK_IMPORTED_MODULE_1__[\"Fragment\"], null, [!$props.attr ? (Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"openBlock\"])(), Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"createBlock\"])(\"div\", _hoisted_1, [Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"createVNode\"])(\"div\", _hoisted_2, [(Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"openBlock\"])(true), Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"createBlock\"])(vue__WEBPACK_IMPORTED_MODULE_1__[\"Fragment\"], null, Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"renderList\"])(_ctx.classes, function (cl) {\n    return Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"openBlock\"])(), Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"createBlock\"])(\"div\", {\n      class: \"column is-one-half\",\n      key: cl.id\n    }, [Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"createVNode\"])(\"a\", {\n      style: {\n        border: cl.color\n      },\n      class: [\"tag is-medium\", {\n        'is-info': cl.id === _ctx.currentClass.id\n      }],\n      onClick: function onClick($event) {\n        return _ctx.setCurrentClass(cl.id);\n      }\n    }, [Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"createVNode\"])(\"span\", {\n      class: \"panel-icon color-box\",\n      style: {\n        backgroundColor: cl.color\n      }\n    }, null, 4\n    /* STYLE */\n    ), Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"createTextVNode\"])(\" \" + Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"toDisplayString\"])(cl.name), 1\n    /* TEXT */\n    )], 14\n    /* CLASS, STYLE, PROPS */\n    , [\"onClick\"])]);\n  }), 128\n  /* KEYED_FRAGMENT */\n  ))])])) : Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"createCommentVNode\"])(\"v-if\", true), _hoisted_3, $props.attr ? (Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"openBlock\"])(), Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"createBlock\"])(\"div\", _hoisted_4, [Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"createVNode\"])(\"div\", _hoisted_5, [(Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"openBlock\"])(true), Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"createBlock\"])(vue__WEBPACK_IMPORTED_MODULE_1__[\"Fragment\"], null, Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"renderList\"])(_ctx.currentClass.attributes, function (at) {\n    return Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"openBlock\"])(), Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"createBlock\"])(\"div\", {\n      class: \"column is-one-half\",\n      key: at.id\n    }, [Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"createVNode\"])(\"span\", {\n      class: \"panel-icon color-box\",\n      style: {\n        backgroundColor: _ctx.currentClass.color\n      }\n    }, null, 4\n    /* STYLE */\n    ), Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"createTextVNode\"])(\" \" + Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"toDisplayString\"])(at) + \" \", 1\n    /* TEXT */\n    ), _hoisted_6]);\n  }), 128\n  /* KEYED_FRAGMENT */\n  ))])])) : Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"createCommentVNode\"])(\"v-if\", true)], 64\n  /* STABLE_FRAGMENT */\n  );\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvY2FjaGUtbG9hZGVyL2Rpc3QvY2pzLmpzPyEuL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXItdjE2L2Rpc3QvdGVtcGxhdGVMb2FkZXIuanM/IS4vbm9kZV9tb2R1bGVzL2NhY2hlLWxvYWRlci9kaXN0L2Nqcy5qcz8hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci12MTYvZGlzdC9pbmRleC5qcz8hLi9zcmMvY29tcG9uZW50cy9DbGFzc2VzQmxvY2sudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTVkZjIwNjkyJnNjb3BlZD10cnVlJmJpbmRpbmdzPXtcImF0dHJcIjpcInByb3BzXCJ9LmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvQ2xhc3Nlc0Jsb2NrLnZ1ZT8yY2Q5Il0sInNvdXJjZXNDb250ZW50IjpbIjx0ZW1wbGF0ZT5cbiAgPGRpdiBjbGFzcz1cImNvbHVtbnMgaXMtbXVsdGlsaW5lXCIgdi1pZj1cIiFhdHRyXCI+XG4gICAgPGRpdiBjbGFzcz1cInRhZ3MgaXMtbWVkaXVtXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiY29sdW1uIGlzLW9uZS1oYWxmXCIgdi1mb3I9XCJjbCBpbiBjbGFzc2VzXCIgOmtleT1cImNsLmlkXCI+XG4gICAgICAgIDxhXG4gICAgICAgICAgOnN0eWxlPVwieyBib3JkZXI6IGNsLmNvbG9yfVwiICAgXG4gICAgICAgICAgY2xhc3M9XCJ0YWcgaXMtbWVkaXVtXCJcbiAgICAgICAgICA6Y2xhc3M9XCJ7ICdpcy1pbmZvJzogY2wuaWQgPT09IGN1cnJlbnRDbGFzcy5pZH1cIlxuICAgICAgICAgIEBjbGljaz1cInNldEN1cnJlbnRDbGFzcyhjbC5pZClcIlxuICAgICAgICA+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJwYW5lbC1pY29uIGNvbG9yLWJveFwiIDpzdHlsZT1cInsgYmFja2dyb3VuZENvbG9yOiBjbC5jb2xvciB9XCI+PC9zcGFuPlxuICAgICAgICAgICAge3sgY2wubmFtZSB9fVxuICAgICAgICA8L2E+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDxicj5cbiAgPGRpdiBjbGFzcz1cImNvbHVtbnMgaXMtbXVsdGlsaW5lXCIgdi1pZj1cImF0dHJcIj5cbiAgICA8ZGl2IGNsYXNzPVwidGFncyBpcy1tZWRpdW1cIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjb2x1bW4gaXMtb25lLWhhbGZcIiB2LWZvcj1cImF0IGluIGN1cnJlbnRDbGFzcy5hdHRyaWJ1dGVzXCIgOmtleT1cImF0LmlkXCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJwYW5lbC1pY29uIGNvbG9yLWJveFwiIDpzdHlsZT1cInsgYmFja2dyb3VuZENvbG9yOiBjdXJyZW50Q2xhc3MuY29sb3IgfVwiPjwvc3Bhbj5cbiAgICAgICAgICB7e2F0fX1cbiAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJpbnB1dFwiLz5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG4gICAgICAgICAgLy8gOnN0eWxlPVwieyBib3JkZXI6IGNsLmNvbG9yfVwiICAgXG4gICAgICAgICAgLy8gQGNsaWNrPVwic2V0Q3VycmVudENsYXNzKGNsLmlkKVwiXG5pbXBvcnQgeyBtYXBTdGF0ZSwgbWFwTXV0YXRpb25zIH0gZnJvbSBcInZ1ZXhcIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiBcIkNsYXNzZXNCbG9ja1wiLFxuICBwcm9wczpbJ2F0dHInXSxcbiAgY29tcHV0ZWQ6IHtcbiAgICAuLi5tYXBTdGF0ZShbXCJjbGFzc2VzXCIsIFwiY3VycmVudENsYXNzXCJdKSxcbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIC4uLm1hcE11dGF0aW9ucyhbXCJyZW1vdmVDbGFzc1wiLCBcInNldEN1cnJlbnRDbGFzc1wiXSksXG4gICAgXG4gIH0sXG59O1xuPC9zY3JpcHQ+XG5cbjxzdHlsZSBsYW5nPVwiY3NzXCIgc2NvcGVkPlxuLmNvbG9yLWJveCB7XG4gIHdpZHRoOiAxLjJyZW07XG4gIGhlaWdodDogMS4ycmVtO1xuICBtYXJnaW4tcmlnaHQ6IDFyZW07XG4gIGJvcmRlci1yYWRpdXM6NXB4O1xufVxuPC9zdHlsZT4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQ0E7OztBQUNBOzs7QUFjQTtBQUFBO0FBQUE7QUFDQTs7O0FBQUE7OztBQUNBOzs7QUFJQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7Ozs7QUF0QkE7QUFFQTtBQUFBO0FBQUE7QUFVQTtBQVJBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUVBO0FBQUE7QUFBQTtBQUlBO0FBRkE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUNBO0FBUEE7O0FBQUE7QUFTQTs7QUFWQTtBQWdCQTtBQUFBO0FBQUE7QUFJQTtBQUhBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFFQTtBQUFBO0FBQ0E7O0FBSkE7OztBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader-v16/dist/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/index.js?!./src/components/ClassesBlock.vue?vue&type=template&id=5df20692&scoped=true&bindings={\"attr\":\"props\"}\n");

/***/ })

})