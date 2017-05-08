var n = {
  "data": {},
  "stack": [],
  "relations": {},
  "events": {},
  "cookies": {
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
  },
  "getParams": function () {
    var paramstr = window.location.search;
    if (!n.empty(paramstr)) {
      paramstr = paramstr.substring(1);
      var parray = paramstr.split('&');
      if (parray.length > 0) {
        var params = {};
        parray.forEach(function (pstr) {
          if (!n.empty(pstr)) {
            var parr = pstr.split('=');
            if (!n.empty(parr[0]) && !n.empty(parr[0].trim()) && !n.empty(parr[1])) {
              parr[1] = parr[1].trim();
              parr[1] = decodeURIComponent(parr[1]).trim();
              if (!n.empty(parr[1])) params[parr[0].trim()] = parr[1];
            }
          }
        });
        return params;
      } else return {};
    } else return {};
  },
  "model": {
    "store": {},
    "create": function (model, data) {
      if (data instanceof Array) n.model.store[model] = data;
      else n.model.store[model] = [data];
      n.model.store[model].name = 'model';
      n.model.store[model].model = model;
    },
    "set": function (model, data) {
      if (data instanceof Array) n.model.store[model] = data;
      else n.model.store[model] = [data];
      n.model.store[model].name = 'model';
      n.model.store[model].model = model;
      n.model.render(model);
    },
    "get": function (model) {
      if (n.empty(n.model.store[model])) {
        n.model.create(model, []);
        return n.model.store[model];
      } else return n.model.store[model];
    },
    "push": function (model, data) {
      if (n.empty(n.model.store[model])) {
        n.model.create(model, []);
        n.model.store[model].push(data);
        n.model.render(model);
      } else {
        n.model.store[model].push(data);
        n.model.render(model);
      }
    },
    "pop": function (model) {
      if (n.empty(n.model.store[model])) throw new Error('Model \'' + model + '\' does not exists.');
      else {
        var ret = n.model.store[model].pop();
        n.model.render(model);
        return ret;
      }
    },
    "shift": function (model) {
      if (n.empty(n.model.store[model])) throw new Error('Model \'' + model + '\' does not exists.');
      else {
        var ret = n.model.store[model].shift();
        n.model.render(model);
        return ret;
      }
    },
    "reverse": function (model) {
      if (n.empty(n.model.store[model])) throw new Error('Model \'' + model + '\' does not exists.');
      else {
        var ret = n.model.store[model].reverse();
        n.model.render(model);
        return ret;
      }
    },
    "size": function (model) {
      if (n.empty(n.model.store[model])) throw new Error('Model \'' + model + '\' does not exists.');
      else return n.model.store[model].length;
    },
    "keys": function (model) {
      if (n.empty(n.model.store[model])) throw new Error('Model \'' + model + '\' does not exists.');
      else return Object.keys(n.model.store[model][0]);
    },
    "length": function (model) {
      if (n.empty(n.model.store[model])) throw new Error('Model \'' + model + '\' does not exists.');
      else return n.model.store[model].length;
    },
    "delete": function (model) {
      if (n.empty(n.model.store[model])) throw new Error('Model \'' + model + '\' does not exists.');
      else delete n.model.store[model];
    },
    "remove": function (model, data) {
      if (n.empty(n.model.store[model])) throw new Error('Model \'' + model + '\' does not exists.');
      else if (n.empty(data)) throw new Error('Remove in \'' + model + '\' need a object or key.');
      else if (typeof data === 'number' || data instanceof Number) {
        n.model.store[model].splice(data, 1);
        n.model.render(model);
      } else if (typeof data === 'object') {
        var keys = Object.keys(data);
        var res =  n.model.store[model].filter(function (e) {
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
        n.model.create(model, res);
        n.model.render(model);
      }
    },
    "clear": function (model) {
      if (n.empty(n.model.store[model])) throw new Error('Model \'' + model + '\' does not exists.');
      else {
        n.model.create(model, []);
        n.model.render(model);
      }
    },
    "index": function (model, index) {
      if (n.empty(n.model.store[model])) throw new Error('Model \'' + model + '\' does not exists.');
      else if (n.empty(n.model.store[model][index])) throw new Error('Model \'' + model + '\' not have index: ' + index);
      else return n.model.store[model][index];
    },
    "first": function (model) {
      if (n.empty(n.model.store[model])) throw new Error('Model \'' + model + '\' does not exists.');
      else return n.model.store[model][0];
    },
    "last": function (model) {
      if (n.empty(n.model.store[model])) throw new Error('Model \'' + model + '\' does not exists.');
      else return n.model.store[model][n.model.store[model].length-1];
    },
    "filter": function (model, obj) {
      if (n.empty(n.model.store[model])) throw new Error('Model \'' + model + '\' does not exists.');
      else if (n.empty(obj) && typeof obj !== 'object') throw new Error('Find in \'' + model + '\' need a object.');
      else {
        var keys = Object.keys(obj);
        var data =  n.model.store[model].filter(function (e) {
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
        for(var k in n.relations) {
          if(n.relations[k].model ===  model) n.render(n.relations[k].comp, k, data);
        }
      }
    },
    "render": function (model) {
      for (var k in n.relations) {
        if(n.relations[k].model ===  model) n.render(n.relations[k].comp, k, n.model.get(model));
      }
    }
  },
  "empty": function (val) {
    return val === undefined || val === null || val === '';
  },
  "id": function (id) {
    if (n.empty(id)) throw new Error('Id without value');
    else return document.getElementById(id);
  },
  "class": function (id) {
    if (n.empty(id)) throw new Error('Class without value');
    else return document.getElementsByClassName(id);
  },
  "run": function () {
    for (var i = 0; i < n.stack.length; i++) n.stack[i].action(n.stack[i].attr[0], n.stack[i].attr[1]);
    n.stack = [];
  },
  "get": function (name, attr) {
    if (n.empty(name)) throw new Error('Get without name');
    else {
      if (!n.empty(n.data[name].action) && typeof n.data[name].action === 'function') n.stack.push({
        "action": n.data[name].action,
        "attr": [n, attr]
      });
      if (!n.empty(n.data[name].load) && typeof n.data[name].load === 'function') n.data[name].load(n, attr);
      return n.data[name].html(n, attr);
    }
  },
  "set": function (name, html, action) {
    if (n.empty(name)) throw new Error('Component without name.');
    else if(typeof name === 'object') {
      var comp = name;
      if (n.empty(comp.name)) throw new Error('Component without name.');
      else if (n.empty(comp.html)) throw new Error('Component \'' + name + '\' without html.');
      else {
        n.data[comp.name] = {};
        n.data[comp.name].html = comp.html;
        if (!n.empty(comp.action) && typeof comp.action === 'function') n.data[comp.name].action = comp.action;
        if (!n.empty(comp.ready) && typeof comp.ready === 'function') n.data[comp.name].action = comp.ready;
        if (!n.empty(comp.load) && typeof comp.load === 'function') n.data[comp.name].load = comp.load;
      }
    } else if (n.empty(html)) throw new Error('Component \'' + name + '\' without html.');
    else {
      n.data[name] = {};
      n.data[name].html = html;
      if (!n.empty(action) && typeof action === 'function') n.data[name].action = action;
    }
  },
  "load": function (comp) {
    if (n.empty(comp)) throw new Error('Not component imported width \'load\'.');
    else {
      if (typeof comp === "object" && comp instanceof Array) {
        comp.forEach(function (el) {
          if (n.empty(el.name) || n.empty(el.html)) throw new Error('Please set \'html\' and \'name\' values.');
          else n.set(el);
        });
      } else {
        if (n.empty(comp.name) || n.empty(comp.html)) throw new Error('Please set \'html\' and \'name\' values.');
        else n.set(comp);
      }
    }
  },
  "destroy": function (name) {
    if (n.empty(name)) throw new Error('Destroy without objective');
    else document.getElementById(name).innerHTML = "";
  },
  "render": function (name, id, attr) {
    if (n.empty(name)) throw new Error('Render without name');
    else if (n.empty(id)) throw new Error('Render without objective');
    else if (n.empty(n.data[name])) throw new Error('Component \'' + name + '\' does not exists.');
    else if (n.empty(n.data[name].html)) throw new Error('The component \'' + name + '\' does not have html.');
    else {
      if (!n.empty(n.data[name].load) && typeof n.data[name].load === 'function') {
        var rend = function (data) {
          if (!n.empty(data) && !n.empty(data.name) && data.name === 'model') n.relations[id] = {
            "comp": name,
            "model": data.model
          };
          else if (!n.empty(n.relations[id])) delete n.relations[id];
          if (!n.empty(n.data[name].action) && typeof n.data[name].action === 'function') n.stack.push({
            "action": n.data[name].action,
            "attr": [n, data]
          });
          document.getElementById(id).innerHTML = n.data[name].html(n, data);
          n.run();
        };

        n.data[name].load(n, attr, rend);
      } else {
        document.getElementById(id).innerHTML = n.data[name].html(n, attr);
        if (!n.empty(attr) && !n.empty(attr.name) && attr.name === 'model') n.relations[id] = {
          "comp": name,
          "model": attr.model
        };
        else if (!n.empty(n.relations[id])) delete n.relations[id];
        if (!n.empty(n.data[name].action) && typeof n.data[name].action === 'function') n.stack.push({
          "action": n.data[name].action,
          "attr": [n, attr]
        });
        n.run();
      }
    }
  },
  "emit": function (ev, data) {
    if (n.empty(ev)) throw new Error('No event selected.');
    else if (ev instanceof Array) {
      for (var i = 0; i < ev.length; i++) {
        if (!n.empty(n.events[ev[i]]) && typeof n.events[ev[i]] === 'function') n.events[ev[i]](data);
      }
    } else if (!n.empty(n.events[ev]) && typeof n.events[ev] === 'function') n.events[ev](data);
  },
  "on": function (obj, eventHandler, callback) {
    if (n.empty(obj)) throw new Error('Event without objective');
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
          if (n.empty(eventHandler) || typeof eventHandler !== 'function') throw new Error('Event needs a function');
          else n.events[obj] = eventHandler;
        }
      } else {
        if (n.empty(eventHandler)) throw new Error('Event without event handler');
        else if (n.empty(callback)) throw new Error('Event without function');
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

if (typeof process === 'object') module.exports = n;
