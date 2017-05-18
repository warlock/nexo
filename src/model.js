var type = require('./type');

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
