var type = require('./type');

var model = {
  "store": {},
  "set": function (name, data) {
    if (type.isEmpty(name) && !type.isString(name)) throw new Error('Model without name.');
    if (type.isEmpty(data)) model.store[name] = [];
    else model.store[name] = data;
  },
  "get": function (name) {
    if (type.isEmpty(name) && !type.isString(name)) throw new Error('Model without name.');
    if (type.isEmpty(model.store[name])) model.set(name);
    return model.store[name];
  },
  "push": function (name, data) {
    if (type.isEmpty(name) && !type.isString(name)) throw new Error('Model without name.');
    if (type.isEmpty(name.store[name])) model.set(name, []);
    if (type.isArray(model.store[name])) model.store[name].push(data);
    else throw new Error('Model ' + name + ' is not array.');
  },
  "pop": function (name) {
    if (type.isEmpty(name.store[name])) throw new Error('Model \'' + name + '\' does not exists.');
    else {
      if (type.isArray(model.store[name])) {
        model.store[name].pop();
        var ret = model.store[name].pop();
        return ret;
      } else throw new Error('Model ' + name + ' is not array.');
    }
  },
  "shift": function (name) {
    if (type.isEmpty(name.store[name])) throw new Error('Model \'' + name + '\' does not exists.');
    else {
      if (type.isArray(model.store[name])) {
        var ret = model.store[name].shift();
        return ret;
      } else throw new Error('Model ' + name + ' is not array.');
    }
  },
  "sort": function (name,by) {
    if (type.isEmpty(name.store[name])) throw new Error('Can\'t sort. Model \'' + name + '\' does not exists.');
    else if (type.isEmpty(by)) throw new Error('Can\'t sort \'' + name + '\' by undefined param.');
    else {
      var ret = model.store[name].sort(function (a, b) {
        if (a[by] > b[by]) return 1;
        if (a[by] < b[by]) return -1;
        return 0;
      });
      return ret;
    }
  },
  "sortReverse": function (name,by) {
    if (type.isEmpty(name.store[name])) throw new Error('Can\'t sort. Model \'' + name + '\' does not exists.');
    else if (type.isEmpty(by)) throw new Error('Can\'t sort \'' + name + '\' by undefined param.');
    else {
      var ret = model.store[name].sort(function (a, b) {
        if (a[by] < b[by]) return 1;
        if (a[by] > b[by]) return -1;
        return 0;
      });
      return ret;
    }
  },
  "reverse": function (name) {
    if (type.isEmpty(name.store[name])) throw new Error('Can\'t reverse. Model \'' + name + '\' does not exists.');
    else {
      var ret = model.store[name].reverse();
      return ret;
    }
  },
  "size": function (name) {
    if (type.isEmpty(name.store[name])) throw new Error('Model \'' + name + '\' does not exists.');
    else return model.store[name].length;
  },
  "keys": function (name) {
    if (type.isEmpty(name.store[name])) throw new Error('Model \'' + name + '\' does not exists.');
    else return Object.keys(name.store[name][0]);
  },
  "length": function (name) {
    if (type.isEmpty(name.store[name])) throw new Error('Model \'' + name + '\' does not exists.');
    else return model.store[name].length;
  },
  "delete": function (name) {
    if (type.isEmpty(name.store[name])) throw new Error('Model \'' + name + '\' does not exists.');
    else delete model.store[name];
  },
  "remove": function (name, data) {
    if (type.isEmpty(name.store[name])) throw new Error('Model \'' + name + '\' does not exists.');
    else if (type.isEmpty(data)) throw new Error('Remove in \'' + name + '\' need a object or key.');
    else if (type.isNumber(data)) {
      model.store[name].splice(data, 1);
    } else if (typeof data === 'object') {
      var keys = Object.keys(data);
      var res =  model.store[name].filter(function (e) {
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
      model.set(name, res);
    }
  },
  "clear": function (name) {
    if (type.isEmpty(name.store[name])) throw new Error('Model \'' + name + '\' does not exists.');
    else model.set(name, []);
  },
  "index": function (name, index) {
    if (type.isEmpty(name.store[name])) throw new Error('Model \'' + name + '\' does not exists.');
    else if (type.isEmpty(name.store[name][index])) throw new Error('Model \'' + name + '\' not have index: ' + index);
    else return model.store[name][index];
  },
  "first": function (name) {
    if (type.isEmpty(name.store[name])) throw new Error('Model \'' + name + '\' does not exists.');
    else return model.store[name][0];
  },
  "last": function (name) {
    if (type.isEmpty(name.store[name])) throw new Error('Model \'' + name + '\' does not exists.');
    else return model.store[name][model.store[name].length-1];
  },
  "filter": function (name, obj) {
    if (type.isEmpty(name.store[name])) throw new Error('Model \'' + name + '\' does not exists.');
    else if (type.isEmpty(obj) && typeof obj !== 'object') throw new Error('Find in \'' + name + '\' need a object.');
    else {
      var keys = Object.keys(obj);
      var data =  model.store[name].filter(function (e) {
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

      return data;
    }
  }
};

module.exports = model;
