'use strict'
import type from './type'
import cookies from './cookies'
import tools from './tools'
import comp from './comp'

const n = {
  events: {},
  store: {},
  components: {},
  relations: {},
  empty: type.isEmpty,
  cookies: cookies,
  get: document.querySelector,
  id: document.getElementById,
  class: document.getElementsByClassName,
  comp: comp,
  getParams () {
    return tools.params
  },
  set (object) {
    if (type.isEmpty(object) && !type.isObject(object)) throw new Error('Need object for create a component')
    else n.components[object.name] = object
  },
  load (components) {
    if (!type.isEmpty(components)) {
      if (!type.isArray(components)) {
        for (var i = 0; i < components.length; i++) n.set(components[i])
      } else n.set(components)
    }
  },
  emit (ev, data) {
    if (type.isEmpty(ev)) throw new Error('No event selected.')
    else if (type.isArray(ev)) {
      ev.forEach(trigger => {
        if (!type.isEmpty(n.events[trigger]) && type.isFunction(n.events[trigger])) n.events[trigger](data)
      })
    } else if (!type.isEmpty(n.events[ev]) && type.isFunction(n.events[ev])) n.events[ev](data)
  },
  on (trigger, callback) {
    if (type.isEmpty(trigger)) throw new Error('Event without objective')
    else {
      if (type.isEmpty(callback)) throw new Error('Event without function')
      else {
        if (type.isArray(trigger)) {
          trigger.forEach(trig => {
            n.events[trig] = callback
          })
        } else n.events[trigger] = callback
      }
    }
  },
  ready (callback) {
    document.addEventListener('DOMContentLoaded', callback)
  },
  render (name, data) {
    if (type.isEmpty(name) && !type.isString(name)) throw new Error('Need a valid name component')
    else if (type.isEmpty(n.components[name])) throw new Error(`The component '${name}' no exists.`)
    else {
      n.comp.render(n, 'name', data)
    }
  }
}

export default n
