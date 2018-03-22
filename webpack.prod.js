'use strict'

const webpack = require('webpack')
const merge = require('webpack-merge')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const common = require('./webpack.common.js')

module.exports = merge(common, {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new UglifyJSPlugin({
      uglifyOptions: {
        mangle: true,
        ie8: false,
        toplevel: true,
        warnings: false,
        compress: true,
        output: {
          comments: false,
        }
      }
    }),
    new BundleAnalyzerPlugin()
  ]
})
