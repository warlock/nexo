module.exports = {
  set (key, value, exdays) {
    var d = new Date()
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
    var expires = `expires=${d.toUTCString()}`
    document.cookie = `${key}=${value};${expires};path=/`
  },
  get (key) {
    var value = ''
    document.cookie.split('; ').forEach(e => {
      var x = e.split('=')
      if (x[0] === key) value = x[1]
    })
    return value
  }
}
