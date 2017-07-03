const fs = require('fs');
const env = require('process');
const path = require('path');
const package = require("./package.json");
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
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

const esdoc_config = {
  "source": "./src",
  "destination": "./dist/" + package.version + "/doc"
}
// write esdocs config
fs.writeFile('.esdoc.json', JSON.stringify(esdoc_config), 'utf8', ()=>{ console.log('wrote esdocs successfully')});


module.exports = {

  devtool: 'eval',

  context: path.resolve(__dirname, './src'),

  entry: {
    receipt: [
      "./helpers/babel.helpers.js",
      "./data/receiptdataparser.js",
      "./common/component.js",
      "./component/brand.js",
      "./component/details.js",
      "./component/lineitems.js",
      "./component/linetaxes.js",
      "./component/totals.js",
      "./component/download.js",
      "./component/store.js",
      "./component/wallet.js",
      "./receipt.js"
    ]
  },

  output: {
    path: path.resolve(__dirname, './dist/' + package.version + '/'),
    filename: '[name]-v' + package.version + '.js'
  },

  resolve: {
    modules: [path.resolve(__dirname, "./src"), "node_modules"],
    extensions: ['.js', '.jsx', '.json', '.css', '.less']
  },

  module: {
    loaders: [
      {
        test: /\.less$/,
        use: [
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'less-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
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
    new ExtractTextPlugin('styles.css'),
    HTMLWebpackPluginConfig,
    NodeEnvWebpackPlugin
  ]
};
