var webpack = require("webpack");
var mixins = require('postcss-mixins');
var nested = require('postcss-nested');
var simplevars = require('postcss-simple-vars');
var autoprefixer = require('autoprefixer');
var path = require('path');

var env = process.env.NODE_ENV;

var config = {
  context: path.join(__dirname, './client'),
  entry: {
    main: './scripts/index.js',
    //vendor: ['']
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  postcss: [mixins, nested, simplevars, autoprefixer],
  plugins: [
    //new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(env) }
    })
  ]
}

if (env === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  );
}

if(env === 'development') {
  config.devServer = {
    hot: true,
    contentBase: './client'
  }
  config.devtool = "eval";
}

module.exports = config;
