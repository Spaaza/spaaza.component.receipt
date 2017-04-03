const env = require('process');
const path = require('path');
const package = require("./package.json");
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: __dirname + '/src/receipt.html',
  filename: 'index.html',
  inject: 'body'
});
const NodeEnvWebpackPlugin = new webpack.DefinePlugin({
  'process.env': {
    'NODE_ENV': process.env.NODE_ENV || JSON.stringify('production')
  }
});
const PackageWebpackPlugin = new webpack.DefinePlugin({
  package: package
});

module.exports = {

  devtool: 'eval',

  context: path.resolve(__dirname, './src'),

  entry: {
    receipt: ["./babel.helpers.js", "./receipt.js"]
  },

  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name]-v' + package.version + '.js'
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: "babel-loader"
      },
      {
        test: /\.handlebars$/,
        loader: "handlebars-loader"
      },
      {
        test: /\.es6$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ["es2017"]
        }
      }
    ]
  },

  plugins: [
    HTMLWebpackPluginConfig,
    NodeEnvWebpackPlugin
  ]
};
