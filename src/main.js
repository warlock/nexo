const tohtml = require('himalaya/translate').toHTML
const tojson = require('himalaya')
const tck = require('tck')
const event = require('eem')
const cookies = require('./cookies')

const n = {
  tohtml: tohtml,
  tojson: tojson.parse,
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
      const schema = n.tojson(main.innerHTML)
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

n.Component = class Component {
  get () {
    var attributes = Object.assign({}, this.attributes)
    attributes.class = this.tagName
    const render = this.render()
    return {
      type: 'Element',
      tagName: 'div',
      attributes: attributes,
      children: render
    }
  }

  render () {
    if (this.load !== undefined) this.load()
    if (this.attributes !== undefined && this.attributes.if !== undefined && eval(this.attributes['if']) === false) {
      console.log('aqui1')
      return []
    } else if (this.attributes.for !== undefined) {
      var res = []
      const data = this.attributes.for.split(' in ')
      const arrayfor = eval(data[1])
      arrayfor.forEach(element => {
        this.html[data[0]] = element
        res.push(this.html())
      })
      return res
    } else {
      console.log('aqui3')
      const template = n.tojson(this.html())
      return template
    }
  }
}

n.start()

module.exports = n
