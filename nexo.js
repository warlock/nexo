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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = {
  'isFunction': function (fn) {
    return typeof fn === 'function';
  },
  'isArray': function (obj) {
    return typeof obj === "object" && obj instanceof Array;
  },
  'isObject': function (obj) {
    return (typeof obj === "object") && !(obj instanceof Array) && obj !== null;
  },
  'isNumber': function (obj) {
    return typeof obj === "number" || obj instanceof Number;
  },
  'isString': function (obj ) {
    return typeof obj === "string" || obj instanceof String;
  },
  'isBoolean': function (obj) {
    return typeof obj === "boolean";
  },
  'isInteger': function (obj) {
    if (this.isNumber(obj)) return obj % 1 === 0;
    else return false;
  },
  'isEmpty': function (data) {
    return (data === null || data === "" || data === undefined);
  },
  'isNull': function (data) {
    return data === null;
  },
  'isNaN': function (data) {
    return isNaN(data);
  },
  'isUndefined': function (data) {
    return data === undefined;
  }
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var type = __webpack_require__(0);

module.exports = {
  "mark": function (element, randId) {
    if (type.isEmpty(randId)) {
      randId = element;
      return "<div id=\"" + randId + "\">";
    } else {
      document.querySelector(element).innerHTML = "<div id=\"" + randId + "\">";
    }
  },
  "render": function (n, name, randId) {
    if (!type.isEmpty(n.component[name].load) && type.isFunction(n.component[name].load)) {
      var cont = function (data) {
        n.model.set(name, data);
        document.getElementById(randId).innerHTML = n.component[name].html(n);
        //n.stack.push(n.component[name].ready);
        if (!type.isEmpty(n.component[name].ready) && type.isFunction(n.component[name].ready)) n.component[name].ready(n);
      };
      n.component[name].load(n, cont);
    } else {
      document.getElementById(randId).innerHTML = n.component[name].html(n);
      //n.stack.push(n.component[name].ready);
      if (!type.isEmpty(n.component[name].ready) && type.isFunction(n.component[name].ready)) n.component[name].ready(n);
    }
  }
};


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = {
  "set": function (key, value, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = key + "=" + value + ";" + expires + ";path=/";
  },
  "get": function (key) {
    var value = "";
    document.cookie.split('; ').forEach(function (e) {
      var x = e.split('=');
      if (x[0] === key) value = x[1];
    });
    return value;
  }
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var type = __webpack_require__(0);

var model = {
  "store": {},
  "create": function (model, data) {
    if (type.isEmpty(model) && !type.isString(model)) throw new Error('Model without name.');
    if (type.isArray(data)) model.store[model] = data;
    else model.store[model] = [data];
    model.store[model].name = 'model';
    model.store[model].model = model;
  },
  "set": function (model, data) {
    model.create(model, data);
    //model.render(model);
  },
  "get": function (model) {
    if (type.isEmpty(model.store[model])) {
      model.create(model, []);
      return model.store[model];
    } else return model.store[model];
  },
  "push": function (model, data) {
    if (type.isEmpty(model.store[model])) {
      if (model.store[model] === undefined) model.create(model, []);
      model.store[model].push(data);
      //model.render(model);
    } else {
      model.store[model].push(data);
      //model.render(model);
    }
  },
  "pop": function (model) {
    if (type.isEmpty(model.store[model])) throw new Error('Model \'' + model + '\' does not exists.');
    else {
      var ret = model.store[model].pop();
      //model.render(model);
      return ret;
    }
  },
  "shift": function (model) {
    if (type.isEmpty(model.store[model])) throw new Error('Model \'' + model + '\' does not exists.');
    else {
      var ret = model.store[model].shift();
      //model.render(model);
      return ret;
    }
  },
  "sort": function (model,by) {
    if (type.isEmpty(model.store[model])) throw new Error('Can\'t sort. Model \'' + model + '\' does not exists.');
    else if (type.isEmpty(by)) throw new Error('Can\'t sort \'' + model + '\' by undefined param.');
    else {
      var ret = model.store[model].sort(function (a, b) {
        if (a[by] > b[by]) return 1;
        if (a[by] < b[by]) return -1;
        return 0;
      });
      //model.render(model);
      return ret;
    }
  },
  "sortReverse": function (model,by) {
    if (type.isEmpty(model.store[model])) throw new Error('Can\'t sort. Model \'' + model + '\' does not exists.');
    else if (type.isEmpty(by)) throw new Error('Can\'t sort \'' + model + '\' by undefined param.');
    else {
      var ret = model.store[model].sort(function (a, b) {
        if (a[by] < b[by]) return 1;
        if (a[by] > b[by]) return -1;
        return 0;
      });
      //model.render(model);
      return ret;
    }
  },
  "reverse": function (model) {
    if (type.isEmpty(model.store[model])) throw new Error('Can\'t reverse. Model \'' + model + '\' does not exists.');
    else {
      var ret = model.store[model].reverse();
      //model.render(model);
      return ret;
    }
  },
  "size": function (model) {
    if (type.isEmpty(model.store[model])) throw new Error('Model \'' + model + '\' does not exists.');
    else return model.store[model].length;
  },
  "keys": function (model) {
    if (type.isEmpty(model.store[model])) throw new Error('Model \'' + model + '\' does not exists.');
    else return Object.keys(model.store[model][0]);
  },
  "length": function (model) {
    if (type.isEmpty(model.store[model])) throw new Error('Model \'' + model + '\' does not exists.');
    else return model.store[model].length;
  },
  "delete": function (model) {
    if (type.isEmpty(model.store[model])) throw new Error('Model \'' + model + '\' does not exists.');
    else delete model.store[model];
  },
  "remove": function (model, data) {
    if (type.isEmpty(model.store[model])) throw new Error('Model \'' + model + '\' does not exists.');
    else if (type.isEmpty(data)) throw new Error('Remove in \'' + model + '\' need a object or key.');
    else if (typeof data === 'number' || data instanceof Number) {
      model.store[model].splice(data, 1);
      //model.render(model);
    } else if (typeof data === 'object') {
      var keys = Object.keys(data);
      var res =  model.store[model].filter(function (e) {
        var chck = true;
        keys.forEach(function (k) {
          if (typeof e[k] === 'string') {
            if(e[k].indexOf(data[k]) >= 0) chck = false;
          } else {
            if(e[k] === data[k]) chck = false;
          }
        });
        return chck;
      });
      model.create(model, res);
      //model.render(model);
    }
  },
  "clear": function (model) {
    if (type.isEmpty(model.store[model])) throw new Error('Model \'' + model + '\' does not exists.');
    else {
      model.create(model, []);
      //model.render(model);
    }
  },
  "index": function (model, index) {
    if (type.isEmpty(model.store[model])) throw new Error('Model \'' + model + '\' does not exists.');
    else if (type.isEmpty(model.store[model][index])) throw new Error('Model \'' + model + '\' not have index: ' + index);
    else return model.store[model][index];
  },
  "first": function (model) {
    if (type.isEmpty(model.store[model])) throw new Error('Model \'' + model + '\' does not exists.');
    else return model.store[model][0];
  },
  "last": function (model) {
    if (type.isEmpty(model.store[model])) throw new Error('Model \'' + model + '\' does not exists.');
    else return model.store[model][model.store[model].length-1];
  },
  "filter": function (model, obj) {
    if (type.isEmpty(model.store[model])) throw new Error('Model \'' + model + '\' does not exists.');
    else if (type.isEmpty(obj) && typeof obj !== 'object') throw new Error('Find in \'' + model + '\' need a object.');
    else {
      var keys = Object.keys(obj);
      var data =  model.store[model].filter(function (e) {
        var chck = true;
        keys.forEach(function (k) {
          if (typeof e[k] === 'string') {
            if(e[k].toLowerCase().indexOf(obj[k].toLowerCase()) < 0) chck = false;
          } else {
            if(e[k] !== obj[k]) chck = false;
          }
        });
        return chck;
      });
      data.name = 'model';
      data.model = model;

      /*
      for(var k in n.relations) {
        if(n.relations[k].model ===  model) n.render(n.relations[k].comp, k, data);
      }
      */
    }
  }

  /*,
  "render": function (model) {
    for (var k in n.relations) {
      if(n.relations[k].model ===  model) n.render(n.relations[k].comp, k, model.get(model));
    }
  }
  */
};

module.exports = model;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var type = __webpack_require__(0);

module.exports = function () {
  var paramstr = window.location.search;
  if (!type.isEmpty(paramstr)) {
    paramstr = paramstr.substring(1);
    var parray = paramstr.split('&');
    if (parray.length > 0) {
      var params = {};
      parray.forEach(function (pstr) {
        if (!type.isEmpty(pstr)) {
          var parr = pstr.split('=');
          if (!type.isEmpty(parr[0]) && !type.isEmpty(parr[0].trim()) && !type.isEmpty(parr[1])) {
            parr[1] = parr[1].trim();
            parr[1] = decodeURIComponent(parr[1]).trim();
            if (!type.isEmpty(parr[1])) params[parr[0].trim()] = parr[1];
          }
        }
      });
      return params;
    } else return {};
  } else return {};
}

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = function () {
  return Math.random().toString(36).substr(2, 10);
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var cookies = __webpack_require__(2);
var type = __webpack_require__(0);
var params = __webpack_require__(4);
var model = __webpack_require__(3);
var comp = __webpack_require__(1);
var randid = __webpack_require__(5);

var n = {
  "comp": comp,
  "component": {},
  "stack": [],
  //"relations": {}, // RELATIONS FOR MODELS
  "events": {},
  "cookies": cookies,
  "getParams": params,
  "model": model,
  "empty": function (val) {
    return val === undefined || val === null || val === '';
  },
  "get": function (element) {
    if (type.isEmpty(element)) throw new Error('Can get this element');
    else return document.querySelector(element);
  },
  "run": function () {
    for (var i = 0; i < n.stack.length; i++) n.stack[i].action(n.stack[i].attr[0], n.stack[i].attr[1]);
    n.stack = [];
  },
  "set": function (name, object) {
    if (type.isEmpty(name)) throw new Error('Need a name or object for create a component');
    else if (type.isString(name)) {
      if (type.isObject(object)) {
        object.name = name;
        n.component[name] = object;
      } else throw new Error('Need a object for create a component.');
    } else if (type.isObject(name)) {
      object = name;
      n.component[object.name] = object;
    } else throw new Error('Need a parameters for create a component.');
  },
  "render": function (name, data) {
    //render component
    var randId = randid();
    if (type.isEmpty(name)) throw new Error('Need a valid name component');
    else if (type.isEmpty(n.component[name])) throw new Error('The component ' + name + ' no exists.');
    else if (type.isEmpty(data)) {
      if (type.isEmpty(n.component[name].html)) throw new Error('The component ' + name + ' no have a valid html.');
      else {
        n.comp.render(n, name, randId);
        return n.comp.mark(randId, name, n);
      }
    } else {
      if (!type.isEmpty(data.status)) {
        n.model.set(name, data.status);
      }
      if (!type.isEmpty(data.element)) {
        n.comp.mark(data.element, randId);
        n.comp.render(n, name, randId);
      } else {
        n.comp.render(n, name, randId);
        return comp.mark(randId);
      }
    }
  },
  //"load": function (comp) {
    //LOAD COMPONENT
  //},
  "destroy": function (name) {
    if (type.isEmpty(name)) throw new Error('Destroy without objective');
    else document.querySelector(name).innerHTML = "";
  },
  "emit": function (ev, data) {
    if (type.isEmpty(ev)) throw new Error('No event selected.');
    else if (ev instanceof Array) {
      for (var i = 0; i < ev.length; i++) {
        if (!type.isEmpty(n.events[ev[i]]) && typeof n.events[ev[i]] === 'function') n.events[ev[i]](data);
      }
    } else if (!type.isEmpty(n.events[ev]) && typeof n.events[ev] === 'function') n.events[ev](data);
  },
  "on": function (obj, eventHandler, callback) {
    if (type.isEmpty(obj)) throw new Error('Event without objective');
    else {
      if (typeof obj === "string" || obj instanceof String) {
        if (obj[0] === '#') {
          var nid = document.getElementById(obj.slice(1,obj.length));
          nid.addEventListener(eventHandler, callback);
        } else if (obj[0] === '.') {
          var ncl = document.getElementsByClassName(obj.slice(1,obj.length));
          for (var ic = 0; ic < ncl.length; ic++) {
            ncl[ic].addEventListener(eventHandler, callback);
          }
        } else {
          if (type.isEmpty(eventHandler) || typeof eventHandler !== 'function') throw new Error('Event needs a function');
          else n.events[obj] = eventHandler;
        }
      } else {
        if (type.isEmpty(eventHandler)) throw new Error('Event without event handler');
        else if (type.isEmpty(callback)) throw new Error('Event without function');
        else if (Array.isArray(obj)) {
          for (var i = 0; i < obj.length; i++) {
            obj[i].addEventListener(eventHandler, callback);
          }
        } else obj.addEventListener(eventHandler,callback);
      }
    }
  },
  "ready": function (callback) {
    document.addEventListener("DOMContentLoaded", callback);
  }
};

n.params = n.getParams();

module.exports = n;


/***/ })
/******/ ]);
});