var cookies = require('./cookies');
var type = require('./type');
var params = require('./params');
var Model = require('./model');
var comp = require('./comp');

var n = {
  "comp": comp,
  "component": {},
  "stack": [],
  //"relations": {}, // RELATIONS FOR MODELS
  "events": {},
  "cookies": cookies,
  "getParams": params,
  "store": {},
  "model": function (name) {
    if (type.isEmpty(name) && !type.isString(name)) throw new Error('Model without name.');
    else return new Model(name, n);
  },
  "empty": function (val) {
    return val === undefined || val === null || val === '';
  },
  "get": function (element) {
    if (type.isEmpty(element)) throw new Error('Can get this element');
    else return document.querySelector(element);
  },
  "id": function (element) {
    if (type.isEmpty(element)) throw new Error('Can get this element id.');
    else return document.getElementById(element);
  },
  "class": function (element) {
    if (type.isEmpty(element)) throw new Error('Can get this element class.');
    else return document.getElementsByClassName(element);
  },
  "run": function () {
    for (var i = 0; i < n.stack.length; i++) n.stack[i](n);
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
    if (type.isEmpty(name)) throw new Error('Need a valid name component');
    else if (type.isEmpty(n.component[name])) throw new Error('The component ' + name + ' no exists.');
    else if (type.isEmpty(data)) {
      if (type.isEmpty(n.component[name].html)) throw new Error('The component ' + name + ' no have a valid html.');
      else return n.comp.render(n, name);
    } else {
      if (!type.isEmpty(data.status)) n.store[name] = data.status;

      if (type.isEmpty(data.element)) {
        return n.comp.render(n, name);
      } else {
        n.comp.render(n, name, data.element);
      }
    }
  },
  "load": function (comps) {
    if (!type.isEmpty(comps)) {
      if (!type.isArray(comps)) n.set(comps);
      else {
        for (var i = 0; i < comps.length; i++) n.set(comps[i]);
      }
    }
  },
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
