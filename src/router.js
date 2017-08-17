module.exports = {
  actual: () => {
    if (undefined !== this.router.data[window.location.hash]) return this.router.data[window.location.hash]
    else if (undefined !== this.router.data['default']) return this.router.data['default']
    else return { name: 'xe' }
  },
  options: { url: 'force' },
  get (value) {
    this.router.actual = value
  },
  set (value) {
    this.router.data = value
  },
  data: {
    default: { name: 'xe' },
    '#/lista': { name: 'list' },
    '#/ruta2': { name: 'user', attr: {} }
  }
}
