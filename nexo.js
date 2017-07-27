(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["n"] = factory();
	else
		root["n"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  isFunction: fn => {
    return typeof fn === 'function'
  },
  isArray: obj => {
    return typeof obj === 'object' && obj instanceof Array
  },
  isObject: obj => {
    return (typeof obj === 'object') && !(obj instanceof Array) && obj !== null
  },
  isNumber: obj => {
    return typeof obj === 'number' || obj instanceof Number
  },
  isString: obj => {
    return typeof obj === 'string' || obj instanceof String
  },
  isBoolean: obj => {
    return typeof obj === 'boolean'
  },
  isInteger: obj => {
    if (this.isNumber(obj)) return obj % 1 === 0
    else return false
  },
  isEmpty: data => {
    return (data === null || data === '' || data === undefined)
  },
  isNull: data => {
    return data === null
  },
  isNaN: data => {
    return isNaN(data)
  },
  isUndefined: data => {
    return data === undefined
  }
});



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__type__ = __webpack_require__(0);


/* harmony default export */ __webpack_exports__["a"] = ({
  params () {
    var paramstr = window.location.search
    if (!__WEBPACK_IMPORTED_MODULE_0__type__["a" /* default */].isEmpty(paramstr)) {
      paramstr = paramstr.substring(1)
      var parray = paramstr.split('&')
      if (parray.length > 0) {
        var params = {}
        parray.forEach(function (pstr) {
          if (!__WEBPACK_IMPORTED_MODULE_0__type__["a" /* default */].isEmpty(pstr)) {
            var parr = pstr.split('=')
            if (!__WEBPACK_IMPORTED_MODULE_0__type__["a" /* default */].isEmpty(parr[0]) && !__WEBPACK_IMPORTED_MODULE_0__type__["a" /* default */].isEmpty(parr[0].trim()) && !__WEBPACK_IMPORTED_MODULE_0__type__["a" /* default */].isEmpty(parr[1])) {
              parr[1] = parr[1].trim()
              parr[1] = decodeURIComponent(parr[1]).trim()
              if (!__WEBPACK_IMPORTED_MODULE_0__type__["a" /* default */].isEmpty(parr[1])) params[parr[0].trim()] = parr[1]
            }
          }
        })
        return params
      } else return {}
    } else return {}
  },
  random () {
    return Math.random().toString(36).substr(2, 10)
  }
});


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__type__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__cookies__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tools__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__comp__ = __webpack_require__(4);






const n = {
  events: {},
  store: {},
  components: {},
  relations: {},
  empty: __WEBPACK_IMPORTED_MODULE_0__type__["a" /* default */].isEmpty,
  cookies: __WEBPACK_IMPORTED_MODULE_1__cookies__["a" /* default */],
  get: document.querySelector,
  id: document.getElementById,
  class: document.getElementsByClassName,
  comp: __WEBPACK_IMPORTED_MODULE_3__comp__["a" /* default */],
  getParams () {
    return __WEBPACK_IMPORTED_MODULE_2__tools__["a" /* default */].params
  },
  set (object) {
    if (__WEBPACK_IMPORTED_MODULE_0__type__["a" /* default */].isEmpty(object) && !__WEBPACK_IMPORTED_MODULE_0__type__["a" /* default */].isObject(object)) throw new Error('Need object for create a component')
    else n.components[object.name] = object
  },
  load (components) {
    if (!__WEBPACK_IMPORTED_MODULE_0__type__["a" /* default */].isEmpty(components)) {
      if (!__WEBPACK_IMPORTED_MODULE_0__type__["a" /* default */].isArray(components)) {
        for (var i = 0; i < components.length; i++) n.set(components[i])
      } else n.set(components)
    }
  },
  emit (ev, data) {
    if (__WEBPACK_IMPORTED_MODULE_0__type__["a" /* default */].isEmpty(ev)) throw new Error('No event selected.')
    else if (__WEBPACK_IMPORTED_MODULE_0__type__["a" /* default */].isArray(ev)) {
      ev.forEach(trigger => {
        if (!__WEBPACK_IMPORTED_MODULE_0__type__["a" /* default */].isEmpty(n.events[trigger]) && __WEBPACK_IMPORTED_MODULE_0__type__["a" /* default */].isFunction(n.events[trigger])) n.events[trigger](data)
      })
    } else if (!__WEBPACK_IMPORTED_MODULE_0__type__["a" /* default */].isEmpty(n.events[ev]) && __WEBPACK_IMPORTED_MODULE_0__type__["a" /* default */].isFunction(n.events[ev])) n.events[ev](data)
  },
  on (trigger, callback) {
    if (__WEBPACK_IMPORTED_MODULE_0__type__["a" /* default */].isEmpty(trigger)) throw new Error('Event without objective')
    else {
      if (__WEBPACK_IMPORTED_MODULE_0__type__["a" /* default */].isEmpty(callback)) throw new Error('Event without function')
      else {
        if (__WEBPACK_IMPORTED_MODULE_0__type__["a" /* default */].isArray(trigger)) {
          trigger.forEach(trig => {
            n.events[trig] = callback
          })
        } else n.events[trigger] = callback
      }
    }
  },
  ready (callback) {
    document.addEventListener('DOMContentLoaded', callback)
  },
  render (name, data) {
    if (__WEBPACK_IMPORTED_MODULE_0__type__["a" /* default */].isEmpty(name) && !__WEBPACK_IMPORTED_MODULE_0__type__["a" /* default */].isString(name)) throw new Error('Need a valid name component')
    else if (__WEBPACK_IMPORTED_MODULE_0__type__["a" /* default */].isEmpty(n.components[name])) throw new Error(`The component '${name}' no exists.`)
    else {
      n.comp.render(n, 'name', data)
    }
  }
}

/* harmony default export */ __webpack_exports__["default"] = (n);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  set (key, value, exdays) {
    var d = new Date()
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
    var expires = `expires=${d.toUTCString()}`
    document.cookie = `${key}=${value};${expires};path=/`
  },
  get (key) {
    var value = ''
    document.cookie.split('; ').forEach(e => {
      var x = e.split('=')
      if (x[0] === key) value = x[1]
    })
    return value
  }
});


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__type__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tools__ = __webpack_require__(1);



/* harmony default export */ __webpack_exports__["a"] = ({
  render (n, name, input) {
    var randId = __WEBPACK_IMPORTED_MODULE_1__tools__["a" /* default */].random()
    n.relations[randId] = {
      name: 'name'
    }

    if (!__WEBPACK_IMPORTED_MODULE_0__type__["a" /* default */].isEmpty(input.data)) {
      n.relations[randId].data = input.data
    } else n.relations[randId].data = {}

    var ret = {
      key: randId,
      data: n.relations[randId].data,
      on: n.on,
      id: n.id,
      class: n.class,
      render: n.render,
      emit: n.emit,
      get: n.get,
      empty: n.empty,
      set: n.set,
      destroy: n.destroy,
      params: n.params,
      cookies: n.cookies
    }

    if (!__WEBPACK_IMPORTED_MODULE_0__type__["a" /* default */].isEmpty(n.components[name].load) && __WEBPACK_IMPORTED_MODULE_0__type__["a" /* default */].isFunction(n.components[name].load)) {
      var cont = data => {
        n.relations[randId].data = data
        document.getElementById(randId).outerHTML = n.components[name].html(ret)
        if (!__WEBPACK_IMPORTED_MODULE_0__type__["a" /* default */].isEmpty(n.components[name].ready) && __WEBPACK_IMPORTED_MODULE_0__type__["a" /* default */].isFunction(n.components[name].ready)) n.components[name].ready(ret)
      }

      if (__WEBPACK_IMPORTED_MODULE_0__type__["a" /* default */].isEmpty(input.element)) {
        setTimeout(() => {
          n.components[name].load(ret, cont)
        })
        return `<div id="${randId}">`
      } else {
        document.querySelector(input.element).innerHTML = `<div id="${randId}">`
        n.components[name].load(ret, cont)
      }
    } else {
      if (__WEBPACK_IMPORTED_MODULE_0__type__["a" /* default */].isEmpty(input.element)) {
        setTimeout(function () {
          if (!__WEBPACK_IMPORTED_MODULE_0__type__["a" /* default */].isEmpty(n.components[name].ready) && __WEBPACK_IMPORTED_MODULE_0__type__["a" /* default */].isFunction(n.components[name].ready)) n.components[name].ready(ret)
        })
        return n.components[name].html(ret)
      } else {
        document.querySelector(input.element).innerHTML = n.components[name].html(ret)
        if (!__WEBPACK_IMPORTED_MODULE_0__type__["a" /* default */].isEmpty(n.components[name].ready) && __WEBPACK_IMPORTED_MODULE_0__type__["a" /* default */].isFunction(n.components[name].ready)) n.components[name].ready(ret)
      }
    }
  }
});


/***/ })
/******/ ]);
});