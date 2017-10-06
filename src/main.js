const tohtml = require('himalaya/translate').toHTML
const tojson = require('himalaya')
const tck = require('tck')
const event = require('eem')
const cookies = require('./cookies')
const Component = require('./component')

const n = {
  on: event.on,
  emit: event.emit,
  delete: event.delete,
  cookies: cookies,
  stack: [],
  components: {},
  render (schema) {
    if (tck.isArray(schema)) {
      return schema.map(n.render)
    } else {
      if (schema.type === 'Element' && !tck.isEmpty(n.components[schema.tagName])) {
        const component = new n.components[schema.tagName]()
        component.tagName = schema.tagName
        component.attributes = schema.attributes
        component.children = schema.children
        if (typeof component.ready === 'function') {
          n.stack.push({
            tagName: component.tagName,
            attributes: component.attributes,
            children: component.children,
            ready: component.ready
          })
        }
        return component.get()
      } else {
        return schema
      }
    }
  },
  run () {
    while (n.stack.length) {
      n.stack.shift().ready()
    }
  },
  start (main) {
    document.addEventListener('DOMContentLoaded', () => {
      const main = n.q('#main')
      const schema = tojson.parse(main.innerHTML)
      const html = n.render(schema)
      main.innerHTML = tohtml(html)

      while (n.stack.length > 0) {
        const ready = n.stack.shift()
        ready.ready(n, ready.attributes)
      }
    })

    // window.addEventListener('hashchange', n.done, false)
  },
  q (element) {
    return document.querySelector(element)
  }
}

n.Component = Component

n.start()

module.exports = n
