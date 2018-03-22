const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: "./src/bootstrap.tsx",
  output: {
    filename: "./public/js/bundle.js",
  },
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
  },
  module: {
    loaders: [
      // Handle .ts and .tsx file via ts-loader.
      { test: /\.tsx?$/, loader: "ts-loader" }
    ]
  },
  plugins:[]
};
