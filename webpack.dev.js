'use strict'

const merge = require('webpack-merge')
const common = require('./webpack.common')

module.exports = merge(common, {
  // Enable sourcemaps for debugging webpack's output.
  devtool: 'eval'
})
