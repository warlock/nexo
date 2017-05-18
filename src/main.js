var cookies = require('./cookies');
var type = require('./type');
var params = require('./params');
var model = require('./model');
var comp = require('./comp');
var randid = require('./randid');

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
        n.model.create(name, []);
      } else throw new Error('Need a object for create a component.');
    } else if (type.isObject(name)) {
      object = name;
      n.component[object.name] = object;
      n.model.create(object.name, []);
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
        n.model.create(name, data.status);
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
