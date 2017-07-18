const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackDevServer = require('webpack-dev-server');

const path = require('path');

const config = {
  devtool: 'cheap-eval-source-map',
  entry: ['./example/index.js', './src/UniversalSearch.js'],
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
    new HtmlWebpackPlugin({
      title: 'How About IBU?',
      filename: './public/index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public/'),
  },
};

const options = {
  port: 9000,
  contentBase: config.output.path,
  hot: true,
  stats: { colors: true },
};

let wpDevServer;

config.entry.unshift('webpack-dev-server/client?/', 'webpack/hot/dev-server');
wpDevServer = new WebpackDevServer(webpack(config), options);

console.log('--Starting WebpackDevServer--\n\n');
wpDevServer.listen(options.port, 'localhost', (err) => {
  if (err) {
    console.error(err);
  }
  console.log('Example Now Serving @:');
  console.log(`
      _.._..,_,_.._
     (             )
      ]~,"-.-~~-~~[
    .=]           [
    | ] localhost:[
    '=]   ${options.port}    [
      |           |
       ~~-------~~
  `);
});
