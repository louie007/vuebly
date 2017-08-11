// { "framework": "Vue" }
var CSS_UNIT = new Object();
CSS_UNIT.REM = 75;

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function isWeex() {
  return "weex" === 'weex';
}

exports.default = {

  methods: {
    push: function push(path) {
      if (isWeex()) {
        var toUrl = weex.config.bundleUrl.split('/').slice(0, -1).join('/') + '/' + path + '.js';
        weex.requireModule('navigator').push({
          url: toUrl,
          animated: 'true'
        });
      } else {
        this.$router.push(path);
      }
    },
    pop: function pop() {
      if (isWeex()) {
        weex.requireModule('navigator').pop({
          animated: 'true'
        });
      } else {
        window.history.back();
      }
    }
  }

};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(10)
)

/* script */
__vue_exports__ = __webpack_require__(7)

/* template */
var __vue_template__ = __webpack_require__(13)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-b9492d4a"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Hello = __webpack_require__(1);

var _Hello2 = _interopRequireDefault(_Hello);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

new Vue({
  el: '#root',
  render: function render(h) {
    return h(_Hello2.default);
  }
});

/***/ }),
/* 4 */,
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(11)
)

/* script */
__vue_exports__ = __webpack_require__(6)

/* template */
var __vue_template__ = __webpack_require__(14)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-bf9fef8c"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {

  name: 'env',

  data: function data(_) {
    return {
      info: 'Env info...'
    };
  },

  props: {
    title: String
  },

  created: function created() {
    if (weex.config.env) {
      this.info = 'Env ' + this.title + ': ' + weex.config.env[this.title];
    }
  }
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Env = __webpack_require__(5);

var _Env2 = _interopRequireDefault(_Env);

var _mixins = __webpack_require__(0);

var _mixins2 = _interopRequireDefault(_mixins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {

  mixins: [_mixins2.default],

  components: {
    env: _Env2.default
  },

  data: function data(_) {
    return {
      env: 'Web',
      hello: 'This is Hello.vue',
      countdown: 3
    };
  },

  created: function created() {
    var vm = this;
    var timer = setInterval(function () {
      if (vm.countdown === 0) {
        weex.requireModule('storage').getItem('hello', function (_ref) {
          var result = _ref.result,
              data = _ref.data;

          if (result === 'success') {
            vm.hello = data;
          }
        });
        return clearInterval(timer);
      }
      vm.countdown -= 1;
    }, 1000);
  },


  methods: {
    click: function click() {
      this.pop();
    }
  }

};

/***/ }),
/* 8 */,
/* 9 */,
/* 10 */
/***/ (function(module, exports) {

module.exports = {
  "container": {
    "flexDirection": "column",
    "alignItems": "center",
    "justifyContent": "flex-start"
  },
  "vuebly-button": {
    "width": 8 * CSS_UNIT.REM,
    "height": 1.2 * CSS_UNIT.REM,
    "borderRadius": 0.6 * CSS_UNIT.REM,
    "backgroundColor": "#e91e63",
    "justifyContent": "center",
    "alignItems": "center",
    "border": "none"
  },
  "vuebly-button-text": {
    "textAlign": "center",
    "color": "#FFFFFF"
  },
  "vuebly-hello-text": {
    "marginTop": 2 * CSS_UNIT.REM,
    "textAlign": "center",
    "fontSize": 0.5 * CSS_UNIT.REM,
    "height": 1 * CSS_UNIT.REM,
    "color": "#575757"
  },
  "vuebly-countdown-text": {
    "marginBottom": 0.2 * CSS_UNIT.REM,
    "textAlign": "center",
    "fontSize": 0.5 * CSS_UNIT.REM,
    "color": "#e91e63"
  }
}

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = {
  "vuebly-env-info": {
    "marginBottom": 30,
    "textAlign": "center",
    "fontSize": 30,
    "color": "#e91e63"
  }
}

/***/ }),
/* 12 */,
/* 13 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["container"]
  }, [_c('text', {
    staticClass: ["vuebly-hello-text"]
  }, [_vm._v(_vm._s(_vm.hello))]), _c('text', {
    staticClass: ["vuebly-countdown-text"]
  }, [_vm._v("Countdown: " + _vm._s(_vm.countdown) + " ")]), _c('env', {
    attrs: {
      "title": "deviceWidth"
    }
  }), _c('a', {
    staticClass: ["vuebly-button"],
    on: {
      "click": _vm.click
    }
  }, [_c('text', {
    staticClass: ["vuebly-button-text"]
  }, [_vm._v("Go back")])])], 1)
},staticRenderFns: []}

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('text', {
    staticClass: ["vuebly-env-info"]
  }, [_vm._v(_vm._s(_vm.info))])
},staticRenderFns: []}

/***/ })
/******/ ]);