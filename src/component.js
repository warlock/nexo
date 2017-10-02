const tojson = require('himalaya')
const tohtml = require('himalaya/translate').toHTML

class Component {
  setAttributes (attributes) {
    attributes.class = this.tagName
    this.attributes = attributes
  }

  get () {
    return {
      type: 'Element',
      tagName: 'div',
      attributes: this.attributes,
      children: this.render()
    }
  }

  render () {
    return tojson.parse(this.html())
  }
}

class Com extends Component {
  constructor () {
    super()
    this.tagName = 'com'
    this.setAttributes({
      a: 'b'
    })
  }

  html () {
    return `Hola ${this.tagName} -> ${JSON.stringify(this.attributes)} ...`
  }
}

var n = {}
n['com'] = new Com('com')

console.log(tohtml(n['com'].get()))
