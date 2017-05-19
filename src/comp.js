var type = require('./type');

var comp = {
  "rand": function () {
    return Math.random().toString(36).substr(2, 10);
  },
  "render": function (n, name, element) {
    if (!type.isEmpty(n.component[name].load) && type.isFunction(n.component[name].load)) {
      var randId = comp.rand();

      var cont = function (data) {
        //n.model.set(name, data);
        n.model(name).set(data);
        document.getElementById(randId).outerHTML = n.component[name].html(n);
        if (!type.isEmpty(n.component[name].ready) && type.isFunction(n.component[name].ready)) n.component[name].ready(n);
      };

      if (type.isEmpty(element)) {
        setTimeout(function () {
          n.component[name].load(n, cont);
        });
        return "<div id=\"" + randId + "\">";
      } else {
        document.querySelector(element).innerHTML = "<div id=\"" + randId + "\">";
        n.component[name].load(n, cont);
      }
    } else {
      if (type.isEmpty(element)) {
        if (!type.isEmpty(n.component[name].ready) && type.isFunction(n.component[name].ready)) n.stack.push(n.component[name].ready);
        return n.component[name].html(n);
      } else {
        document.querySelector(element).innerHTML = n.component[name].html(n);
        if (!type.isEmpty(n.component[name].ready) && type.isFunction(n.component[name].ready)) n.stack.push(n.component[name].ready);
      }
    }
  }
};

module.exports = comp;
