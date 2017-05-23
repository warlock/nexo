var type = require('./type');

var comp = {
  "rand": function () {
    return Math.random().toString(36).substr(2, 10);
  },
  "render": function (n, name, element) {
    var ret = {
      "state": n.component[name].state,
      "on": n.on,
      "id": n.id,
      "class": n.class,
      "render": n.render,
      "emit": n.emit,
      "get": n.get,
      "empty": n.empty,
      "set": n.set,
      "destroy": n.destroy,
      "params": n.params,
      "cookies": n.cookies,
      "model": n.model
    };

    if (!type.isEmpty(n.component[name].load) && type.isFunction(n.component[name].load)) {
      var randId = comp.rand();

      var cont = function (data) {
        ret.state = data;
        document.getElementById(randId).outerHTML = n.component[name].html(ret);
        if (!type.isEmpty(n.component[name].ready) && type.isFunction(n.component[name].ready)) n.component[name].ready(ret);
        for (var i = 0; i < n.stack.length; i++) n.stack[i](ret);
        n.stack = [];
      };

      if (type.isEmpty(element)) {
        setTimeout(function () {
          n.component[name].load(ret, cont);
        });
        return "<div id=\"" + randId + "\">";
      } else {
        document.querySelector(element).innerHTML = "<div id=\"" + randId + "\">";
        n.component[name].load(ret, cont);
      }
    } else {
      if (type.isEmpty(element)) {
        if (!type.isEmpty(n.component[name].ready) && type.isFunction(n.component[name].ready)) n.stack.push(n.component[name].ready);
        return n.component[name].html(ret);
      } else {
        document.querySelector(element).innerHTML = n.component[name].html(n);
        if (!type.isEmpty(n.component[name].ready) && type.isFunction(n.component[name].ready)) n.stack.push(n.component[name].ready);
        for (var i = 0; i < n.stack.length; i++) n.stack[i](ret);
        n.stack = [];
      }
    }
  }
};

module.exports = comp;
