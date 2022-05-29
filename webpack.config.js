const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/client/index.ts',
  mode: 'development',
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: 'ts-loader',
          options: {
            projectReferences: true,
          },
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/client/html/index.html',
    }),
  ],
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    port: 80,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },
};
