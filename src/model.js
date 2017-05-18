var type = require('./type');

var model = {
  "store": {},
  "create": function (name, data) {
    if (type.isEmpty(name) && !type.isString(name)) throw new Error('Model without name.');
    if (type.isArray(data)) model.store[name] = data;
    else model.store[name] = [data];
    model.store[name].name = 'model';
    model.store[name].model = name;
  },
  "set": function (name, data) {
    model.create(name, data);
    //model.render(name);
  },
  "get": function (name) {
    if (type.isEmpty(model.store[name])) {
      model.create(name, []);
      return model.store[name];
    } else return model.store[name];
  },
  "push": function (name, data) {
    if (type.isEmpty(name.store[name])) {
      if (name.store[name] === undefined) model.create(name, []);
      model.store[name].push(data);
      //model.render(name);
    } else {
      model.store[name].push(data);
      //model.render(name);
    }
  },
  "pop": function (name) {
    if (type.isEmpty(name.store[name])) throw new Error('Model \'' + name + '\' does not exists.');
    else {
      var ret = model.store[name].pop();
      //model.render(name);
      return ret;
    }
  },
  "shift": function (name) {
    if (type.isEmpty(name.store[name])) throw new Error('Model \'' + name + '\' does not exists.');
    else {
      var ret = model.store[name].shift();
      //model.render(name);
      return ret;
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
      //model.render(name);
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
      //model.render(name);
      return ret;
    }
  },
  "reverse": function (name) {
    if (type.isEmpty(name.store[name])) throw new Error('Can\'t reverse. Model \'' + name + '\' does not exists.');
    else {
      var ret = model.store[name].reverse();
      //model.render(name);
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
    else if (typeof data === 'number' || data instanceof Number) {
      model.store[name].splice(data, 1);
      //model.render(name);
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
      model.create(name, res);
      //model.render(name);
    }
  },
  "clear": function (name) {
    if (type.isEmpty(name.store[name])) throw new Error('Model \'' + name + '\' does not exists.');
    else {
      model.create(name, []);
      //model.render(name);
    }
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
      data.name = 'model';
      data.model = name;

      /*
      for(var k in n.relations) {
        if(n.relations[k].model ===  model) n.render(n.relations[k].comp, k, data);
      }
      */
    }
  }

  /*,
  "render": function (name) {
    for (var k in n.relations) {
      if(n.relations[k].model ===  model) n.render(n.relations[k].comp, k, model.get(name));
    }
  }
  */
};

module.exports = model;
