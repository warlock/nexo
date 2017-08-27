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
        const subs = new RegExp(/{(.*?)}/g)
        const checkurl = Object.keys(n.router.data).filter(url => {
          const clean = url.replace(subs, '(.*)')
          const regclean = new RegExp(clean + '$', 'i')
          return regclean.test(window.location.hash)
        })

        if (checkurl.length > 0) {
          var attrdata = {}
          const keys = checkurl[0].match(subs)
          const clean = checkurl[0].replace(subs, '(.*)')
          const values = window.location.hash.match(new RegExp(clean, 'i'))
          var count = 1
          keys.forEach(key => {
            const newkey = key.replace('{', '').replace('}', '')
            attrdata[newkey] = values[count]
            count++
          })
          const resp = {
            name: n.router.data[checkurl[0]].name,
            attributes: attrdata
          }
          return resp
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
        const comp = n.components[actual.name].html(n.state, n.makeAttr(actual.name, actual.attributes))
        const htmlTag = {
          type: 'Element',
          tagName: 'div',
          attributes: { class: 'routerview' },
          children: tojson.parse(comp)
        }
        return tohtml(htmlTag)
      }
    },
    n: {
      html: (state, attr) => {
        if (!type.isEmpty(attr.if)) return 'IF'
        else if (!type.isEmpty(attr.else)) return 'ELSE'
        else if (!type.isEmpty(attr.for)) return 'FOR'
        else if (!type.isEmpty(attr.filter)) return 'FILTER'
        else return 'XXXX'
      },
      attr: {
        if: '',
        else: '',
        for: '',
        filter: ''
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
    if (type.isEmpty(attrs) && type.isEmpty(n.components[name].attr)) return {}
    else if (type.isEmpty(attrs)) return n.components[name].attr
    else {
      var accAttr = Object.assign({}, n.components[name].attr)
      Object.keys(attrs).forEach(attr => {
        accAttr[attr] = attrs[attr]
      })
      return accAttr
    }
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

    window.addEventListener('hashchange', n.done, false)
  },
  get (element) {
    return document.querySelector(element)
  }
}

n.start()

module.exports = n
