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
      if (schema.type === 'Element' && tck.isSet(n.components[schema.tagName])) {
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
        if (tck.isSet(schema.children) && tck.isArray(schema.children)) {
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
    if (tck.isSet(main)) {
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
    if (tck.isSet(schema)) n.schema = n.tojson(schema)
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
    var attributes = {}
    Object.keys(this.attributes).forEach(key => {
      if (key === 'id') attributes.id = this.attributes.id
      else if (key === 'className') {
        attributes.class = this.attributes.className
        if (attributes.class.indexOf(this.tagName) < 0) {
          attributes.class += ` ${this.tagName}`
        }
      }
    })

    if (tck.isEmpty(attributes.class)) attributes.class = this.tagName  

    const render = this.render()
    
    if (tck.isEmpty(this.attributes.each)) {
      return {
        type: 'Element',
        tagName: 'div',
        attributes: attributes,
        children: n.render(render)
      }
    } else {
      const children = render.map(element => {
        return {
          type: 'Element',
          tagName: 'div',
          attributes: attributes,
          children: n.render(element)
        }
      })

      const attreach = Object.assign({}, attributes)
      attreach.class = attributes.class.replace(this.tagName, `${this.tagName}-each`)
      return {
        type: 'Element',
        tagName: 'div',
        attributes: attreach,
        children: children
      }
    }
  }

  render () {
    if (tck.isSet(this.load)) this.load()
    if (tck.isSet(this.attributes) && tck.isSet(this.attributes.if) && eval(this.attributes['if']) === false) {
      return []
    } else if (tck.isSet(this.attributes.each)) {
      const eachRes = this.eachAttribute(this.attributes.each)
      return eachRes
    } else if (this.foundEvent(this.attributes.each)) {
      const uniqkey = Math.random().toString(36).substr(2, 10)
      console.log('found event!')      
    } else {
      const template = n.tojson(this.html())
      return template
    }
  }

  foundEvent (attr) {
    const found = attr.filter(at => at.indexOf('on:') > -1)
    return found.length > 0
  }

  eachAttribute (iterable) {
    var res = []
    const arrayEach = eval(iterable)
    arrayEach.forEach(element => {
      res.push(n.tojson(this.html(element)))
    })
    return res
  }
}

if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', n.start)
  window.addEventListener('hashchange', n.update, false)
}

module.exports = n
