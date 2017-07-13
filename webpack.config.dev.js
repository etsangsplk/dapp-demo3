const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  devtool: 'source-map',

  entry: {
    bundle: [
      path.join(__dirname, 'app/js/index.jsx'),
    ],
  },

  output: {
    path: path.join(__dirname, 'build'),
    publicPath: '/',
    filename: '[name].js',
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.scss?$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.json$/,
        use: 'json-loader',
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  plugins: [
    new CopyWebpackPlugin([
      { from: './app/index.html', to: 'index.html' },
    ]),
  ],
};
