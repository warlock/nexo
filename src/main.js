const convert = require('xml-js')
const tools = require('./tools')

const n = {
  components: {
    list: {
      html: state => `<p><strong>${state.name}</strong></p>`,
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
        const html = n.components[element.name].html(n.state)
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
