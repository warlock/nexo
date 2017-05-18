var type = require('./type');

module.exports = {
  "mark": function (element, randId) {
    if (type.isEmpty(randId)) {
      randId = element;
      return "<div id=\"" + randId + "\">";
    } else {
      document.querySelector(element).innerHTML = "<div id=\"" + randId + "\">";
    }
  },
  "render": function (n, name, randId) {
    if (!type.isEmpty(n.component[name].load) && type.isFunction(n.component[name].load)) {
      var cont = function (data) {
        n.model.set(name, data);
        document.getElementById(randId).innerHTML = n.component[name].html(n);
        //n.stack.push(n.component[name].ready);
        if (!type.isEmpty(n.component[name].ready) && type.isFunction(n.component[name].ready)) n.component[name].ready(n);
      };
      n.component[name].load(n, cont);
    } else {
      document.getElementById(randId).innerHTML = n.component[name].html(n);
      //n.stack.push(n.component[name].ready);
      if (!type.isEmpty(n.component[name].ready) && type.isFunction(n.component[name].ready)) n.component[name].ready(n);
    }
  }
};
