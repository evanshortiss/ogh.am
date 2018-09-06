'use strict'

const webpack = require('webpack')
const merge = require('webpack-merge')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const common = require('./webpack.common.js')

const prodOpts = {
  devtool: 'none',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true
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
    })
  ]
}

if (process.env.CI || process.env.TRAVIS) {
  prodOpts.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = merge(common, prodOpts)
