const tojson = require('himalaya')

module.exports = class Component {
  get () {
    var attributes = Object.assign({}, this.attributes)
    attributes.class = this.tagName
    const render = this.render()
    return {
      type: 'Element',
      tagName: 'div',
      attributes: attributes,
      children: render
    }
  }

  render () {
    if (this.load !== undefined) this.load()
    if (this.attributes !== undefined && this.attributes.if !== undefined && eval(this.attributes['if']) === false) {
      console.log('aqui1')
      return []
    } else if (this.attributes.for !== undefined) {
      console.log('aqui2')
      return [{"type":"Text","content":"valer"}]
    } else {
      console.log('aqui3')
      const template = tojson.parse(this.html())
      return template
    }
  }
}