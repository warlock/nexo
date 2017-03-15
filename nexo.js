var n = {
  "data": {},
  "stack": [],
  "relations": {},
  "model": {
    "store": {},
    "set": function (model, data) {
      if (data instanceof Array) n.model.store[model] = data;
      else n.model.store[model] = [data];
      n.model.store[model].name = 'model';
      n.model.store[model].model = model;
      n.model.render(model);
    },
    "get": function (model) {
      if (n.empty(n.model.store[model])) throw new Error('Model \'' + model + '\' does not exists.');
      else return n.model.store[model];
    },
    "push": function (model, data) {
      if (n.empty(n.model.store[model])) throw new Error('Model \'' + model + '\' does not exists.');
      else {
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
        n.model.store[model] = res;
        n.model.store[model].name = 'model';
        n.model.store[model].model = model;
        n.model.render(model);
      }
    },
    "clear": function (model) {
      if (n.empty(n.model.store[model])) throw new Error('Model \'' + model + '\' does not exists.');
      else {
        n.model.store[model] = [];
        n.model.store[model].name = 'model';
        n.model.store[model].model = model;
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
    "find": function (model, obj) {
      if (n.empty(n.model.store[model])) throw new Error('Model \'' + model + '\' does not exists.');
      else if (n.empty(obj) && typeof obj !== 'object') throw new Error('Find in \'' + model + '\' need a object.');
      else {
        var keys = Object.keys(obj);
        var data =  n.model.store[model].filter(function (e) {
          var chck = true;
          keys.forEach(function (k) {
            if(e[k] !== obj[k]) chck = false;
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
    "filter": function (model, obj) {
      if (n.empty(n.model.store[model])) throw new Error('Model \'' + model + '\' does not exists.');
      else if (n.empty(obj) && typeof obj !== 'object') throw new Error('Find in \'' + model + '\' need a object.');
      else {
        var keys = Object.keys(obj);
        var data =  n.model.store[model].filter(function (e) {
          var chck = true;
          keys.forEach(function (k) {
            if (typeof e[k] === 'string') {
              if(e[k].indexOf(obj[k]) < 0) chck = false;
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
      if (typeof n.data[name].action === 'function') n.stack.push({
        "action": n.data[name].action,
        "attr": [this, attr]
      });
      return n.data[name].html(this, attr);
    }
  },
  "set": function (name, html, action) {
    if (n.empty(name)) throw new Error('Component without name.');
    else if (n.empty(html)) throw new Error('Component \'' + name + '\' without html.');
    else {
      n.data[name] = {};
      n.data[name].html = html;
      if (typeof action === 'function') n.data[name].action = action;
    }
  },
  "load": function (comp) {
    if (n.empty(comp)) throw new Error('Not component imported width \'load\'.');
    else {
      if (typeof comp === "object" && comp instanceof Array) {
        comp.forEach(function (el) {
          if (n.empty(el.name) || n.empty(el.html)) throw new Error('Please set \'html\' and \'name\' values.');
          else {
            n.data[el.name] = {};
            n.data[el.name].html = el.html;
            if (typeof el.action === 'function') n.data[el.name].action = el.action;
          }
        });
      } else {
        if (n.empty(comp.name) || n.empty(comp.html)) throw new Error('Please set \'html\' and \'name\' values.');
        else {
          n.data[comp.name] = {};
          n.data[comp.name].html = comp.html;
          if (typeof comp.action === 'function') n.data[comp.name].action = comp.action;
        }
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
      document.getElementById(id).innerHTML = n.data[name].html(this, attr);
      if (!n.empty(attr) && !n.empty(attr.name) && attr.name === 'model') n.relations[id] = {
        "comp": name,
        "model": attr.model
      };
      else if (!n.empty(n.relations[id])) delete n.relations[id];
      if (typeof n.data[name].action === 'function') n.stack.push({
        "action": n.data[name].action,
        "attr": [this, attr]
      });
      n.run();
    }
  },
  "on": function (obj, eventHandler, callback) {
    if (n.empty(obj)) throw new Error('Event without objective');
    else if (n.empty(eventHandler)) throw new Error('Event without event handler');
    else if (n.empty(callback)) throw new Error('Event without function');
    else {
      if (Array.isArray(obj)) {
        for (var i = 0; i < obj.length; i++) {
          obj[i].addEventListener(eventHandler, callback);
        }
      } else {
        obj.addEventListener(eventHandler,callback);
      }
    }
  },
  "ready": function (callback) {
    document.addEventListener("DOMContentLoaded", callback);
  }
};

if (typeof process === 'object') module.exports = n;
