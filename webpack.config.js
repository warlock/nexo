const path = require('path')

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve('./'),
    library: 'n',
    filename: 'nexo.js',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      { test: /\.js$/, loader: "babel-loader" }
    ]
  }
}