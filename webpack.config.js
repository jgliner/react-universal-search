const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const path = require('path');

module.exports = {
  devtool: 'cheap-eval-source-map',
  devServer: {
    port: 9000,
    contentBase: path.join(__dirname, 'public'),
    compress: true,
  },
  entry: {
    app: './index.js',
    vendor: ['lodash'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'es2015', 'stage-0', 'react']
          }
        }
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
    // new CleanWebpackPlugin(['public']),
    new HtmlWebpackPlugin({
      title: 'How About IBU?',
      filename: './public/index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
};
