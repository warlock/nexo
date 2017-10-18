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
  stackEvent: {},
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
      const element = n.stack.shift()
      if (tck.isSet(element.ready)) element.ready()
      else element()
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
    n.stackEvent = {}
    const html = n.render(n.schema)
    const main = n.q('#main')
    main.innerHTML = tohtml(html)
    n.run()
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
    const cleanAttr = this.filterAttributes()
    const events = cleanAttr.events
    const attributes = cleanAttr.attributes

    if (tck.isEmpty(attributes.class)) attributes.class = this.tagName  

    const render = this.render()
    
    if (tck.isEmpty(this.attributes.each)) {
      // EVENTS MAKER
      const uniqkey = Math.random().toString(36).substr(2, 10)
      this.makeEvent(uniqkey, events)
      attributes.class += ` ${uniqkey}`

      return {
        type: 'Element',
        tagName: 'div',
        attributes: attributes,
        children: n.render(render)
      }
    } else {
      const children = render.map(element => {
        console.log(JSON.stringify(render))
        const attrchild = Object.assign({}, attributes)        
        const uniqkey = Math.random().toString(36).substr(2, 10)
        this.makeEvent(uniqkey, events)
        attrchild.class += ` ${uniqkey}`
        return {
          type: 'Element',
          tagName: 'div',
          attributes: attrchild,
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

  addEvent (key, event, action) {
    console.log(`KEY: ${key} - EVENT: ${event}`)
    document.getElementsByClassName(key)[0].addEventListener(event, () => {
      n.stackEvent[key][action]()
    })
  }

  filterAttributes () {
    var events = {}
    var attributes = {}
    Object.keys(this.attributes).forEach(key => {
      if (key === 'id') attributes.id = this.attributes.id
      else if (key === 'className') {
        attributes.class = this.attributes.className
        if (attributes.class.indexOf(this.tagName) < 0) {
          attributes.class += ` ${this.tagName}`
        }
      } else if (key.indexOf('on:') > -1) {
        const eventName = key.split('on:')
        events[eventName[1]] = this.attributes[key]      
      }
    })
    return { events: events, attributes: attributes }
  }

  makeEvent (uniqkey, events) {
    const listEvents = Object.keys(events)
    if (listEvents.length > 0) {
      listEvents.forEach(ev => {
        if (tck.isEmpty(n.stackEvent[uniqkey])) n.stackEvent[uniqkey] = {}
        n.stackEvent[uniqkey][events[ev]] = this[events[ev]]
        
        n.stack.push(() => {          
          this.addEvent(uniqkey, ev, events[ev])
        })
      })
    }
  }
}

if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', n.start)
  window.addEventListener('hashchange', n.update, false)
}

module.exports = n
