var type = require('./type');

module.exports = function (name, n) {
  if (type.isEmpty(n.store[name])) n.store[name] = [];

  this.get = function () {
    return n.store[name];
  };

  this.render = function (compName, element) {
    n.render(compName, {
      "element": element,
      "data": n.store[name]
    });
  };

  this.set = function (data) {
    if (!type.isEmpty(data)) n.store[name] = data;
    return this;
  };

  this.push = function (data) {
    if (type.isEmpty(n.store[name])) n.store[name] = [];
    if (type.isArray(n.store[name])) {
      n.store[name].push(data);
      return this;
    } else throw new Error('Model ' + name + ' is not array.');
  };

  this.pop = function () {
    if (type.isArray(n.store[name])) {
      n.store[name].pop();
      return this;
    } else throw new Error('Model ' + name + ' is not array.');
  };

  this.shift = function () {
    if (type.isArray(n.store[name])) {
      n.store[name].shift();
      return this;
    } else throw new Error('Model ' + name + ' is not array.');
  };

  this.sort = function (by) {
    if (type.isEmpty(by)) throw new Error('Can\'t sort \'' + name + '\' by undefined param.');
    else {
      var ret = n.store[name].sort(function (a, b) {
        if (a[by] > b[by]) return 1;
        if (a[by] < b[by]) return -1;
        return 0;
      });
      n.store[name] = ret;
      return this;
    }
  };

  this.reverse = function () {
    n.store[name] = n.store[name].reverse();
    return this;
  };

  this.size = function (name) {
    if (type.isEmpty(name.store[name])) throw new Error('Model \'' + name + '\' does not exists.');
    else return n.store[name].length;
  };

  this.keys = function () {
    if (type.isEmpty(name.store[name])) throw new Error('Model \'' + name + '\' does not exists.');
    else return Object.keys(name.store[name][0]);
  };

  this.length = function () {
    if (type.isEmpty(name.store[name])) throw new Error('Model \'' + name + '\' does not exists.');
    else return n.store[name].length;
  };

  this.delete = function () {
    if (type.isEmpty(name.store[name])) throw new Error('Model \'' + name + '\' does not exists.');
    else delete n.store[name];
  };

  this.remove = function (data) {
    if (type.isEmpty(data)) n.store[name] = [];
    else if (type.isNumber(data)) {
      n.store[name].splice(data, 1);
    } else if (typeof data === 'object') {
      var keys = Object.keys(data);
      var res =  n.store[name].filter(function (e) {
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
      n.store[name] = res;
    }
    return this;
  };

  this.clear = function () {
    if (type.isEmpty(name.store[name])) throw new Error('Model \'' + name + '\' does not exists.');
    n.store[name] = [];
    return this;
  };

  this.index = function (index) {
    if (type.isEmpty(name.store[name])) throw new Error('Model \'' + name + '\' does not exists.');
    return n.store[name][index];
  };

  this.first = function () {
    if (type.isEmpty(name.store[name])) throw new Error('Model \'' + name + '\' does not exists.');
    return n.store[name][0];
  };

  this.last = function () {
    if (type.isEmpty(name.store[name])) throw new Error('Model \'' + name + '\' does not exists.');
    return n.store[name][n.store[name].length-1];
  };

  this.filter = function (obj) {
    if (type.isEmpty(name.store[name])) throw new Error('Model \'' + name + '\' does not exists.');
    else if (type.isEmpty(obj) && typeof obj !== 'object') throw new Error('Find in \'' + name + '\' need a object.');
    else {
      var keys = Object.keys(obj);
      var data =  n.store[name].filter(function (e) {
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
  };

};
