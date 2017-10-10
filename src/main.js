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
        if (tck.isFunction(component.ready)) {
          n.stack.push({
            tagName: component.tagName,
            attributes: component.attributes,
            children: component.children,
            ready: component.ready
          })
        }
        return component.get()
      } else {
        if (!tck.isEmpty(schema.children) && tck.isArray(schema.children)) {
          return {
            type: 'Element',
            tagName: schema.tagName,
            attributes: schema.attributes,
            children: n.render(schema.children)
          }
        } else return schema
      }
    }
  },
  run () {
    while (n.stack.length) {
      n.stack.shift().ready()
    }
  },
  start () {
    const main = n.q('#main')
    if (!tck.isEmpty(main)) {
      n.schema = n.tojson(main.innerHTML)
      n.update()
    } else throw Error('nexo: Not found element #main')
  },
  update () {
    const html = n.render(n.schema)
    const main = n.q('#main')
    main.innerHTML = tohtml(html)

    while (n.stack.length > 0) {
      const ready = n.stack.shift()
      ready.ready(n, ready.attributes)
    }
  },
  request (schema) {
    if (!tck.isEmpty(schema)) n.schema = n.tojson(schema)
    else throw Error('nexo: Not found schema')
    const html = n.render(n.schema)
    return tohtml(html)
  },
  q (element) {
    return document.querySelector(element)
  }
}

n.Component = class Component {
  get () {
    var attributes = Object.assign({}, this.attributes)
    attributes.class = this.tagName
    if (!tck.isEmpty(this.attributes.for)) delete(attributes.for)
    if (!tck.isEmpty(attributes.if)) delete(attributes.if)
    Object.keys(attributes).forEach(attr => {
      if (attr.indexOf('on:') > -1) delete(attributes[attr])
    })

    const render = this.render()
    return {
      type: 'Element',
      tagName: 'div',
      attributes: attributes,
      children: n.render(render)
    }
  }

  render () {
    if (!tck.isEmpty(this.load)) this.load()
    if (!tck.isEmpty(this.attributes) && !tck.isEmpty(this.attributes.if) && eval(this.attributes['if']) === false) {
      return []
    } else if (!tck.isEmpty(this.attributes.for)) {
      var res = []
      const data = this.attributes.for.split(' in ')
      const arrayfor = eval(data[1])
      arrayfor.forEach(element => {
        this[data[0]] = element
        res.push(this.html())
      })
      const template = n.tojson(res.join(''))
      return template
    } else {
      const template = n.tojson(this.html())
      return template
    }
  }
}

if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', n.start)
  // window.addEventListener('hashchange', n.done, false)
}

module.exports = n
