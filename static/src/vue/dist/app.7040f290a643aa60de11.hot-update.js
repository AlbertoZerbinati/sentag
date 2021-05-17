webpackHotUpdate("app",{

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader-v16/dist/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/index.js?!./src/components/TokenBlock.vue?vue&type=template&id=10f65e44":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader-v16/dist??ref--0-1!./src/components/TokenBlock.vue?vue&type=template&id=10f65e44 ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.esm-bundler.js\");\n\nvar _hoisted_1 = {\n  class: \"tag is-light is-info is-small\"\n};\nvar _hoisted_2 = {\n  style: {\n    color: 'lightblue'\n  }\n};\nfunction render(_ctx, _cache, $props, $setup, $data, $options) {\n  return Object(vue__WEBPACK_IMPORTED_MODULE_0__[\"openBlock\"])(), Object(vue__WEBPACK_IMPORTED_MODULE_0__[\"createBlock\"])(\"mark\", {\n    class: [\"is-multiline is-rounded\", {\n      'current': $props.isCurrent\n    }],\n    style: {\n      backgroundColor: $props.backgroundColor\n    },\n    id: 'tb' + $props.token.start,\n    onClick: _cache[2] || (_cache[2] = Object(vue__WEBPACK_IMPORTED_MODULE_0__[\"withModifiers\"])(function ($event) {\n      return _ctx.setCurrentBlock($props.token);\n    }, [\"stop\"]))\n  }, [(Object(vue__WEBPACK_IMPORTED_MODULE_0__[\"openBlock\"])(true), Object(vue__WEBPACK_IMPORTED_MODULE_0__[\"createBlock\"])(vue__WEBPACK_IMPORTED_MODULE_0__[\"Fragment\"], null, Object(vue__WEBPACK_IMPORTED_MODULE_0__[\"renderList\"])($props.token.tokens, function (t) {\n    return Object(vue__WEBPACK_IMPORTED_MODULE_0__[\"openBlock\"])(), Object(vue__WEBPACK_IMPORTED_MODULE_0__[\"createBlock\"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__[\"resolveDynamicComponent\"])(t.type === 'token' ? 'Token' : 'TokenBlock'), {\n      token: t,\n      key: t.start,\n      backgroundColor: t.backgroundColor,\n      isCurrent: t.id === _ctx.currentBlock.id,\n      onRemoveBlock: $options.removeBlock\n    }, null, 8\n    /* PROPS */\n    , [\"token\", \"backgroundColor\", \"isCurrent\", \"onRemoveBlock\"]);\n  }), 128\n  /* KEYED_FRAGMENT */\n  )), Object(vue__WEBPACK_IMPORTED_MODULE_0__[\"createVNode\"])(\"span\", _hoisted_1, [Object(vue__WEBPACK_IMPORTED_MODULE_0__[\"createVNode\"])(\"span\", null, [Object(vue__WEBPACK_IMPORTED_MODULE_0__[\"createVNode\"])(\"strong\", _hoisted_2, Object(vue__WEBPACK_IMPORTED_MODULE_0__[\"toDisplayString\"])($props.token.label), 1\n  /* TEXT */\n  )]), Object(vue__WEBPACK_IMPORTED_MODULE_0__[\"createVNode\"])(\"a\", {\n    class: \"tag delete is-small is-danger\",\n    onClick: _cache[1] || (_cache[1] = Object(vue__WEBPACK_IMPORTED_MODULE_0__[\"withModifiers\"])(function ($event) {\n      _ctx.$emit('remove-block', {\n        start: $props.token.start,\n        end: $props.token.end\n      });\n    }, [\"stop\"]))\n  })])], 14\n  /* CLASS, STYLE, PROPS */\n  , [\"id\"]);\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvY2FjaGUtbG9hZGVyL2Rpc3QvY2pzLmpzPyEuL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXItdjE2L2Rpc3QvdGVtcGxhdGVMb2FkZXIuanM/IS4vbm9kZV9tb2R1bGVzL2NhY2hlLWxvYWRlci9kaXN0L2Nqcy5qcz8hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci12MTYvZGlzdC9pbmRleC5qcz8hLi9zcmMvY29tcG9uZW50cy9Ub2tlbkJsb2NrLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0xMGY2NWU0NC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL1Rva2VuQmxvY2sudnVlPzFjNzIiXSwic291cmNlc0NvbnRlbnQiOlsiPHRlbXBsYXRlPlxuICA8bWFyayBcbiAgICBjbGFzcz1cImlzLW11bHRpbGluZSBpcy1yb3VuZGVkXCJcbiAgICA6c3R5bGU9XCJ7YmFja2dyb3VuZENvbG9yOmJhY2tncm91bmRDb2xvcn1cIlxuICAgIDppZD1cIid0YicgKyB0b2tlbi5zdGFydFwiXG4gICAgOmNsYXNzPVwieyAnY3VycmVudCc6IGlzQ3VycmVudH1cIlxuICAgIEBjbGljay5zdG9wPVwic2V0Q3VycmVudEJsb2NrKHRva2VuKVwiXG4gICAgPlxuICAgICAgPGNvbXBvbmVudCBcbiAgICAgICAgdi1mb3I9XCJ0IGluIHRva2VuLnRva2Vuc1wiIFxuICAgICAgICA6aXM9XCJ0LnR5cGUgPT09ICd0b2tlbicgPyAnVG9rZW4nIDogJ1Rva2VuQmxvY2snXCJcbiAgICAgICAgOnRva2VuPVwidFwiIFxuICAgICAgICA6a2V5PVwidC5zdGFydFwiIFxuICAgICAgICA6YmFja2dyb3VuZENvbG9yPVwidC5iYWNrZ3JvdW5kQ29sb3JcIlxuICAgICAgICA6aXNDdXJyZW50PVwidC5pZCA9PT0gY3VycmVudEJsb2NrLmlkXCJcbiAgICAgICAgQHJlbW92ZS1ibG9jaz1cInJlbW92ZUJsb2NrXCJcbiAgICAgIC8+XG4gICAgPHNwYW4gY2xhc3M9XCJ0YWcgaXMtbGlnaHQgaXMtaW5mbyBpcy1zbWFsbFwiXG4gICAgPlxuICAgICAgPHNwYW4+PHN0cm9uZyA6c3R5bGU9XCJ7IGNvbG9yOiAnbGlnaHRibHVlJyB9XCI+e3sgdG9rZW4ubGFiZWwgfX08L3N0cm9uZz48L3NwYW4+XG4gICAgICBcbiAgICAgIDxhIGNsYXNzPVwidGFnIGRlbGV0ZSBpcy1zbWFsbCBpcy1kYW5nZXJcIiBcbiAgICAgIEBjbGljay5zdG9wPVwiJGVtaXQoJ3JlbW92ZS1ibG9jaycsIHtzdGFydDp0b2tlbi5zdGFydCwgZW5kOnRva2VuLmVuZH0pOyBcIj5cbiAgICAgIDwvYT5cbiAgICA8L3NwYW4+XG4gIDwvbWFyaz5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5pbXBvcnQgVG9rZW4gZnJvbSBcIi4vVG9rZW5cIjtcbmltcG9ydCB7IG1hcFN0YXRlLCBtYXBNdXRhdGlvbnMgfSBmcm9tIFwidnVleFwiO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6IFwiVG9rZW5CbG9ja1wiLFxuICBlbWl0czogW1wicmVtb3ZlLWJsb2NrXCJdLFxuICBkYXRhOmZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICBzaG93Q2xvc2U6IGZhbHNlLFxuICAgIH1cbiAgfSxcbiAgcHJvcHM6IHtcbiAgICB0b2tlbjoge1xuICAgICAgdHlwZTogT2JqZWN0LFxuICAgICAgcmVxdXJpZWQ6IHRydWVcbiAgICB9LFxuICAgIGJhY2tncm91bmRDb2xvcjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgcmVxdWlyZWQ6IGZhbHNlXG4gICAgfSxcbiAgICBpc0N1cnJlbnQ6e1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIHJlcXVpcmVkOiB0cnVlXG4gICAgfVxuICB9LFxuICBjb21wdXRlZDoge1xuICAgIC4uLm1hcFN0YXRlKFtcImN1cnJlbnRCbG9ja1wiXSksXG4gIH0sXG4gIGNvbXBvbmVudHM6IHtcbiAgICBUb2tlblxuICB9LFxuICBtZXRob2RzOiB7XG4gICAgLi4ubWFwTXV0YXRpb25zKFtcInNldEN1cnJlbnRCbG9ja1wiXSksXG4gICAgcmVtb3ZlQmxvY2s6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgIHRoaXMuJGVtaXQoXCJyZW1vdmUtYmxvY2tcIixkYXRhKVxuICAgIH1cbiAgfVxufVxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBsYW5nPVwic2Nzc1wiPlxubWFyayB7XG4gIHBhZGRpbmc6IDAuM3JlbTtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBib3JkZXItcmFkaXVzOjhweDtcbiAgJjo6YWZ0ZXIge1xuICAgIGNvbnRlbnQ6IHZhcigtLXRhZyk7XG4gICAgcGFkZGluZzogMC4ycmVtO1xuICAgIGNvbG9yOiBkYXJrc2xhdGVncmF5O1xuICAgIGZvbnQtc2l6ZTogc21hbGw7XG4gIH1cbn1cbi5kZWxldGUge1xuICBtYXJnaW4tbGVmdDogNHB4O1xufVxuLmN1cnJlbnQge1xuICBib3JkZXI6IDNweCBzb2xpZCB5ZWxsb3c7XG59XG48L3N0eWxlPiJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFpQkE7OztBQUVBO0FBQUE7QUFBQTs7O0FBbEJBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFFQTtBQUFBO0FBQUE7QUFtQkE7QUFqQkE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7O0FBRkE7QUFRQTs7QUFSQTtBQVdBO0FBQUE7QUFFQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBOztBQXRCQTtBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader-v16/dist/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/index.js?!./src/components/TokenBlock.vue?vue&type=template&id=10f65e44\n");

/***/ })

})