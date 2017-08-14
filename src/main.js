const convert = require('xml-js')
const tools = require('./tools')

const n = {
  components: {
    list: {
      html: state => `<strong>${state.name}</strong>`,
      state: { name: 'inici' },
      onload: (state, done) => {
        done(state)
      },
      ready: (state, done) => {
        /*
        console.log(JSON.stringify(state))
        state = tools.random()
        console.log('ready list ' + state)
        */
        console.log('Tornant a pintar ' + state.id)
        done()
      }
    }
  },
  state: {},
  schema: '',
  stack: [],
  initialize (template) {
    return template.elements.map(element => {
      if (undefined !== n.components[element.name]) {
        const id = tools.random()
        n.state[id] = {
          name: element.name,
          state: n.components[element.name].state
        }
        const html = n.components[element.name].html(n.state[id].state)
        const component = convert.xml2js(`<div id="${id}">${html}</div>`)
        var newcomp = n.initialize(component)[0]
        newcomp.id = id
        n.state[id].state.id = id
        // if (undefined !== n.components[element.name].ready) { setTimeout(() => { n.components[element.name].ready(n.state[id].state, n.readyDone) }, 0)
        return newcomp
      } else return element
    })
  },
  readyDone () {
    n.schema = n.worker(n.schema)
    const xml = convert.js2xml({ elements: n.schema })
    const start = document.getElementById('main')
    start.innerHTML = xml
  },
  worker (elements) {
    return elements.map(element => {
      if (undefined !== element.attributes && undefined !== element.attributes.id && undefined !== n.state[element.attributes.id]) {
        console.log(element.attributes.id + ' > ESTAT ACTUAL: ' + JSON.stringify(n.state[element.attributes.id].state))
        const html = n.components[n.state[element.attributes.id].name].html(n.state[element.attributes.id].state)
        const component = convert.xml2js(html)
        console.log(JSON.stringify(component))
        return component
      } else return element
    })
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const start = document.getElementById('main')
  const schema = start.innerHTML
  const web = convert.xml2js(schema)
  n.schema = n.initialize(web)
  const xml = convert.js2xml({ elements: n.schema })
  start.innerHTML = xml
  /*
  setTimeout(() => {
    n.schema = n.worker(n.schema)
    console.log('tornant a pintar')
    const xml = convert.js2xml({ elements: n.schema })
    start.innerHTML = xml
  }, 3000)
  */
})

module.exports = n
