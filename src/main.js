const tools = require('./tools')
const tojson = require('himalaya')
const tohtml = require('himalaya/translate').toHTML

const n = {
  components: {
    list: {
      html: (state, attr) => `
      <p>${state.name} is ${attr.nom}</p>
      <user></user>      
      `,
      attr: {
        nom: 'josep'
      },
      onload: (state, set) => {
      },
      ready: (state, set) => {
        /*
        console.log('Tornant a pintar !')
        setInterval(() => {
          setState('name', tools.random())
        }, 1000)
        */
      }
    },
    user: {
      html: (state, attr) => `<p>El nom del usuari es: ${attr.nom}</p>`,
      attr: {
        nom: 'user'
      }
    },
    ex: {
      html: (state, attr) => `<p>hola</p>`
    }
  },
  state: {
    name: 'Estat inicial'
  },
  schema: '',
  stack: [],
  set (name, value) {
    n.state[name] = value
    n.done()
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
        console.log(element.tagName)
        const htmlSchema = n.components[element.tagName].html(n.state, n.makeAttr(element.tagName, element.attributes))
        const jsonSchema = tojson.parse(htmlSchema)
        if (undefined !== jsonSchema.children && jsonSchema.children.length > 0) jsonSchema.children = n.render(jsonSchema.children)
        return jsonSchema // Can return an array
      } else return element
    }
  },
  done () {
    const newSchema = n.render(n.schema)
    console.log(JSON.stringify(newSchema))
    const htmlSchema = tohtml(newSchema)
    n.main.innerHTML = htmlSchema
  }
}

document.addEventListener('DOMContentLoaded', () => {
  n.main = document.getElementById('main')
  const main = n.main.innerHTML
  n.schema = tojson.parse(main)
  n.done()

  Object.keys(n.components).forEach(name => {
    if (undefined !== n.components[name].ready) n.components[name].ready(n.state, n.set)
  })
})

module.exports = n
