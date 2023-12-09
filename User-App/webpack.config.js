const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    bundle: './client/index.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.s?css/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/i,
        type: 'asset',
      },
    ],
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'build'),
    },
    port: 8080,
    open: true,
    hot: true,
    compress: true,
    proxy: {
      '/rabbit': 'http://localhost:3000',
      '/auth': 'http://localhost:3000',
      '/inv': 'http://localhost:3000',
      '/api/*': {
        target: 'http://localhost:15672/',
        auth: 'guest:guest',
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack Dev',
      filename: 'index.html',
      template: './index.html',
    }),
  ],
};
