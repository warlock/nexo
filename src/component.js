const tojson = require('himalaya')
const tohtml = require('himalaya/translate').toHTML
const tck = require('tck')

class Component {
  constructor (schema) {
    this.tagName = schema.tagName
    this.attributes = schema.attributes
    this.children = schema.children
    this.attributes.class = schema.tagName
  }

  setAttributes (attributes) {
    this.attributes = Object.assign(this.attributes, attributes)
    this.attributes.class = this.tagName
  }

  setChildren (children) {
    this.children = children
  }

  get () {
    return {
      type: 'Element',
      tagName: 'div',
      attributes: this.attributes,
      children: [this.render()]
    }
  }

  render () {
    const template = tojson.parse(this.html())
    return template[0]
  }
}

class Kom extends Component {
  constructor (schema) {
    super(schema)
    this.setAttributes({
      a: 'b'
    })
  }

  html () {
    return `Hola ${this.tagName} -> ${JSON.stringify(this.attributes)} -> CHILDREN ${JSON.stringify(this.children)} ...`
  }
}

const n = {
  schema: [],
  components: {},
  render (schema) {
    if (tck.isArray(schema)) {
      return schema.map(n.render)
    } else {
      if (schema.type === 'Element' && !tck.isEmpty(n.components[schema.tagName])) {
        const component = new n.components[schema.tagName](schema)
        component.setAttributes(schema.attributes)
        return component.get()
      } else {
        return schema
      }
    }
  },
  start (main) {
    const schema = tojson.parse(main)
    const html = n.render(schema)
    console.log(tohtml(html))
  }
}

n.components['kom'] = Kom

const main = `<kom brr="nn">aaaa<a href="vvv">aeee</a></kom><div></div>`

n.start(main)
