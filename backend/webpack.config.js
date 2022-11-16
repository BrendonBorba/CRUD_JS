import path from 'path'

export default {
  mode: 'production',
  entry: './app/src/javascript/application.js',
  output: {
    path: path.resolve('public', 'assets', 'javascript'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        exclude: /node-modules/,
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
