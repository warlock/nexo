const n = require('../nexo.js')

class Kom extends n.Component {
  html () {
    return `Hola ${this.tagName} -> <ex bu="${this.i}"></ex><br>`
  }

  load () {
    console.log(`Load ${this.tagName} !!!`)
  }

  ready () {
    console.log(`Ready ${this.tagName} !!!`)
  }
}

class Ex extends n.Component {
  html () {
    return `Ex component ${this.attributes.bu}`
  }
}

n.components.kom = Kom
n.components.ex = Ex
const html = n.request(`<kom bu="bbr" for="i in [1, 2, 3]"></kom><strong><ex bu="fora"></ex></strong>`)

console.log(html)