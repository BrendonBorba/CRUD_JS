const path = require('path')

module.exports = {
  mode: 'production',
  entry: './app/src/javascript/application.js',
  output: {
    path: path.resolve(__dirname, 'public', 'assets', 'javascript'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        exclude: /node-module/,
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  devtool: 'source-map'
}
