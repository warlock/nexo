const tools = require('./tools')
const tojson = require('himalaya')
const tohtml = require('himalaya/translate').toHTML

const n = {
  components: {
    list: {
      html: (state, attr) => `
      <p>${state.name} is ${attr.nom}</p>
      `,
      attr: {
        nom: 'josep'
      },
      onload: state => {
      },
      ready: state => {
        console.log('Tornant a pintar !')
        setInterval(() => {
          state('name', tools.random())
        }, 1000)
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
  render (template) {
    var makeAttr = (name, attrs) => {
      var accAttr = Object.assign({}, n.components[name].attr)
      Object.keys(attrs).forEach(attr => {
        accAttr[attr] = attrs[attr]
      })
      return accAttr
    }
    var accumulator = []
    template.forEach(element => {
      if (element.type === 'Element' && undefined !== n.components[element.tagName]) {
        console.log('Element: ' + element.tagName)
        const htmlSchema = n.components[element.tagName].html(n.state, makeAttr(element.tagName, element.attributes))
        const jsonSchema = tojson.parse(htmlSchema)
        jsonSchema.forEach(newEl => {
          accumulator.push(newEl)
        })
      } else accumulator.push(element)
    })
    return accumulator
  },
  done () {
    const start = document.getElementById('main')
    const newSchema = n.render(n.schema)
    const htmlSchema = tohtml(newSchema)
    start.innerHTML = htmlSchema
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const start = document.getElementById('main')
  const main = start.innerHTML
  n.schema = tojson.parse(main)
  const newSchema = n.render(n.schema)
  const htmlSchema = tohtml(newSchema)
  start.innerHTML = htmlSchema

  Object.keys(n.components).forEach(name => {
    if (undefined !== n.components[name].ready) n.components[name].ready(n.set)
  })
})

module.exports = n
