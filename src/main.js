const tojson = require('himalaya')
const tohtml = require('himalaya/translate').toHTML
const cookies = require('./cookies')
const type = require('tck')
const event = require('eem')

const n = {
  on: event.on,
  emit: event.emit,
  delete: event.delete,
  cookies: cookies,
  router: {
    actual: () => {
      if (!type.isEmpty(n.router.data[window.location.hash])) return n.router.data[window.location.hash]
      else {
        console.log('work in progress')
        var reg = new RegExp(/{(.*?)}/g)
        var urlfind = Object.keys(n.router.data).filter(url => {
          return reg.test(url)
        })

        if (urlfind.length > 0) {
          const keys = urlfind[0].match(/{(.*?)}/g).map(x => x.replace('}', '').replace('{', ''))
          console.log(keys)
          const values = window.location.hash.match(/{(.*?)}/g)
          var attributes = {}
          keys.forEach((key, index) => {
            attributes[key] = values[index]
          })
          Object.keys(n.router.data).forEach(key => {
            if (key.indexOf('}')) console.log(key.replace(/{(.*?)}/g, '*'))
          })
          console.log(JSON.stringify(attributes))
          return undefined
        } else return n.router.data['default']
      }
    },
    options: { url: 'force' },
    get (value) {
      n.router.actual = value
    },
    set (value) {
      n.router.data = value
    },
    data: {}
  },
  stack: [],
  components: {
    routerview: {
      html: () => {
        const actual = n.router.actual()
        if (type.isEmpty(actual)) return ''
        const comp = n.components[actual.name].html(n.state, n.makeAttr(actual.name, actual.attributes | {}))
        const htmlTag = {
          type: 'Element',
          tagName: 'div',
          attributes: { class: 'routerview' },
          children: tojson.parse(comp)
        }
        return tohtml(htmlTag)
      }
    }
  },
  state: {},
  schema: '',
  set (name, value) {
    if (value !== n.state[name]) {
      n.state[name] = value
      n.done()
    }
  },
  makeAttr (name, attrs) {
    var accAttr = n.components[name].attr ? Object.assign({}, n.components[name].attr) : {}
    Object.keys(attrs).forEach(attr => {
      accAttr[attr] = attrs[attr]
    })
    return accAttr
  },
  render (element) {
    if (Array.isArray(element)) {
      return element.map(n.render)
    } else {
      if (element.type === 'Element' && undefined !== n.components[element.tagName]) {
        if (undefined !== n.components[element.tagName].load) n.components[element.tagName].load(n, n.makeAttr(element.tagName, element.attributes))
        const htmlSchema = n.components[element.tagName].html(n.state, n.makeAttr(element.tagName, element.attributes))
        const jsonSchema = tojson.parse(htmlSchema)
        if (undefined !== jsonSchema.children && jsonSchema.children.length > 0) jsonSchema.children = n.render(jsonSchema.children)
        const loop = n.render(jsonSchema)
        if (undefined !== n.components[element.tagName].ready) {
          n.stack.push({
            name: element.tagName,
            attributes: n.makeAttr(element.tagName, element.attributes)
          })
        }

        return {
          type: 'Element',
          tagName: 'div',
          attributes: n.makeAttr(element.tagName, element.attributes),
          children: loop
        }
      } else return element
    }
  },
  done () {
    const newSchema = n.render(n.schema)
    const htmlSchema = tohtml(newSchema)
    n.main.innerHTML = htmlSchema
  },
  start () {
    document.addEventListener('DOMContentLoaded', () => {
      n.main = document.getElementById('main')
      const main = n.main.innerHTML
      n.schema = tojson.parse(main)
      n.done()

      while (n.stack.length > 0) {
        const ready = n.stack.shift()
        n.components[ready.name].ready(n, ready.attributes)
      }
    })

    window.addEventListener('hashchange', () => {
      console.log('change')
      n.done()
    }, false)
  },
  get (element) {
    return document.querySelector(element)
  }
}

n.start()

module.exports = n
