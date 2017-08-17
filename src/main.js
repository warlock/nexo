const tojson = require('himalaya')
const tohtml = require('himalaya/translate').toHTML
const cookies = require('./cookies')

const n = {
  cookies: cookies,
  router: {
    actual: () => {
      if (undefined !== n.router.data[window.location.hash]) return n.router.data[window.location.hash]
      else if (undefined !== n.router.data['default']) return n.router.data['default']
      else return undefined
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
        console.log(JSON.stringify(actual))
        if (actual === undefined) return ''
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
  }
}

n.start()

module.exports = n
