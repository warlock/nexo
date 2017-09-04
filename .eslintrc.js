module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  extends: 'standard',
  'rules': {
    'arrow-parens': 0,
    'generator-star-spacing': 0,
    'no-eval': 'off'
  }
}
