import type from './type'
import tools from './tools'

export default {
  render (n, name, input) {
    var randId = tools.random()
    n.relations[randId] = {
      name: 'name'
    }

    if (!type.isEmpty(input.data)) {
      n.relations[randId].data = input.data
    } else n.relations[randId].data = {}

    var ret = {
      key: randId,
      data: n.relations[randId].data,
      on: n.on,
      id: n.id,
      class: n.class,
      render: n.render,
      emit: n.emit,
      get: n.get,
      empty: n.empty,
      set: n.set,
      destroy: n.destroy,
      params: n.params,
      cookies: n.cookies
    }

    if (!type.isEmpty(n.components[name].load) && type.isFunction(n.components[name].load)) {
      var cont = data => {
        n.relations[randId].data = data
        document.getElementById(randId).outerHTML = n.components[name].html(ret)
        if (!type.isEmpty(n.components[name].ready) && type.isFunction(n.components[name].ready)) n.components[name].ready(ret)
      }

      if (type.isEmpty(input.element)) {
        setTimeout(() => {
          n.components[name].load(ret, cont)
        })
        return `<div id="${randId}">`
      } else {
        document.querySelector(input.element).innerHTML = `<div id="${randId}">`
        n.components[name].load(ret, cont)
      }
    } else {
      if (type.isEmpty(input.element)) {
        setTimeout(function () {
          if (!type.isEmpty(n.components[name].ready) && type.isFunction(n.components[name].ready)) n.components[name].ready(ret)
        })
        return n.components[name].html(ret)
      } else {
        document.querySelector(input.element).innerHTML = n.components[name].html(ret)
        if (!type.isEmpty(n.components[name].ready) && type.isFunction(n.components[name].ready)) n.components[name].ready(ret)
      }
    }
  }
}
