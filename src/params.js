const type = require('tck')

module.exports = () => {
  var paramstr = window.location.search
  if (!type.isEmpty(paramstr)) {
    paramstr = paramstr.substring(1)
    var parray = paramstr.split('&')
    if (parray.length > 0) {
      var params = {}
      parray.forEach(function (pstr) {
        if (!type.isEmpty(pstr)) {
          var parr = pstr.split('=')
          if (!type.isEmpty(parr[0]) && !type.isEmpty(parr[0].trim()) && !type.isEmpty(parr[1])) {
            parr[1] = parr[1].trim()
            parr[1] = decodeURIComponent(parr[1]).trim()
            if (!type.isEmpty(parr[1])) params[parr[0].trim()] = parr[1]
          }
        }
      })
      return params
    } else return {}
  } else return {}
}