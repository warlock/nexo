const convert = require('xml-js')
const n = {
  components: {
    list: {
      html: state => `<strong>${state.nom}</strong>`
    }
  },
  state: {
    krm: {
      name : 'list',
      state: {
        nom: 'Josep'
      }
    },
    eud: {
      name : 'list',
      state: {
        nom: 'Eudald'
      }
    }
  }, 
  schema: '',
  worker (template) {
    return template.elements.map(element => {
      if (undefined !== n.state[element.name]) {
        const html = n.components[n.state[element.name].name].html(n.state[element.name].state)
        const component =  convert.xml2js(html)
        return n.worker(component)[0]
      } else return element
    })
  },
  render (element) {
    const start = document.getElementById(element)
    const web = convert.xml2js(n.schema)
    const newjson = n.worker(web)
    const xml = convert.js2xml({ elements: newjson })
    start.innerHTML = xml
  }
}

document.addEventListener('DOMContentLoaded', () => {
  n.schema = document.getElementById('main').innerHTML
  n.render('main')
})

module.exports = n
