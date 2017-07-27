export default {
  isFunction: fn => {
    return typeof fn === 'function'
  },
  isArray: obj => {
    return typeof obj === 'object' && obj instanceof Array
  },
  isObject: obj => {
    return (typeof obj === 'object') && !(obj instanceof Array) && obj !== null
  },
  isNumber: obj => {
    return typeof obj === 'number' || obj instanceof Number
  },
  isString: obj => {
    return typeof obj === 'string' || obj instanceof String
  },
  isBoolean: obj => {
    return typeof obj === 'boolean'
  },
  isInteger: obj => {
    if (this.isNumber(obj)) return obj % 1 === 0
    else return false
  },
  isEmpty: data => {
    return (data === null || data === '' || data === undefined)
  },
  isNull: data => {
    return data === null
  },
  isNaN: data => {
    return isNaN(data)
  },
  isUndefined: data => {
    return data === undefined
  }
}

