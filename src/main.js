const convert = require('xml-js')
const tools = require('./tools')

const n = {
  components: {
    list: {
      html: (state, attr) => `<p><strong>${state.name}</strong> is ${attr.nom}</p>`,
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
    return template.elements.map(element => {
      if (undefined !== n.components[element.name]) {
        var attr = {}
        if (undefined !== n.components[element.name].attr) {
          Object.keys(n.components[element.name].attr).forEach(key => {
            if (undefined !== element.attributes && undefined !== element.attributes[key]) {
              attr[key] = element.attributes[key]
            } else attr[key] = n.components[element.name].attr[key]
          })
        }
        const html = n.components[element.name].html(n.state, attr)
        const component = convert.xml2js(html)
        const newcomp = n.render(component)[0]
        return newcomp
      } else return element
    })
  },
  done () {
    const schema = n.render(n.schema)
    const xml = convert.js2xml({ elements: schema })
    const start = document.getElementById('main')
    start.innerHTML = xml
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const start = document.getElementById('main')
  const main = start.innerHTML
  n.schema = convert.xml2js(main)
  const schema = n.render(n.schema)
  const xml = convert.js2xml({ elements: schema })
  start.innerHTML = xml
  Object.keys(n.components).forEach(name => {
    n.components[name].ready(n.set)
  })
})

module.exports = n
