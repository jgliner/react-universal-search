const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const path = require('path');

module.exports = {
  devtool: 'cheap-eval-source-map',
  entry: {
    app: './src/UniversalSearch.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'es2015', 'stage-0', 'react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
  ],
  externals: [
    'react',
    'react-dom',
  ],
  output: {
    filename: 'react-universal-search.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'UniversalSearch',
    libraryTarget: 'umd',
  },
};
