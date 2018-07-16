const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const path = require('path')

module.exports = {
  entry: "./src/bootstrap.tsx",
  output: {
    path: path.resolve('./public'),
    publicPath: '/',
    filename: "js/bundle.[hash].js",
  },
  resolve: {
    extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader"
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader?-url"
        })
      }
    ]
  },
  plugins:[
    // new CleanWebpackPlugin(
    //   [
    //     'dist/'
    //   ],
    //   {

    //   }
    // )
    new ExtractTextPlugin('index.[hash].css'),
    new HtmlWebpackPlugin({
      minify: {
        collapseWhitespace: true,
        removeComments: true
      },
      template: path.resolve('./src/index.html'),
      filename: path.resolve('./public/index.html')
    }),
    new WorkboxPlugin.GenerateSW(require('./workbox-config'))
  ]
};
