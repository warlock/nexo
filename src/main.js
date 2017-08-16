const tojson = require('himalaya')
const tohtml = require('himalaya/translate').toHTML
const cookies = require('./cookies')
const params = require('./params')

const n = {
  cookies: cookies,
  params: params,
  stack: [],
  components: {},
  state: {},
  schema: '',
  stack: [],
  set (name, value) {
    if (value !== n.state[name]) {
      n.state[name] = value
      n.done()
    }
  },
  makeAttr (name, attrs) {
    var accAttr = Object.assign({}, n.components[name].attr)
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
        if (undefined !== n.components[element.tagName].ready) n.stack.push({
          name: element.tagName,
          attributes: n.makeAttr(element.tagName, element.attributes)
        })
        return {
          type:"Element",
          tagName:"div",
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
        console.log(ready.name)
        n.components[ready.name].ready(n, ready.attributes)
      }
    })
  }
}

n.start()

module.exports = n
