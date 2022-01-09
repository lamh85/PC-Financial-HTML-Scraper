const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: 'development',

  // IMPORTANT: Sort keys alphabetically

  // Used for live reloading.
  devServer: {
    // How the server should find the files.
    contentBase: './dist',
    hot: true,
  },
  devtool: 'inline-source-map',
  entry: './src/index.js',
  module: {
    rules: [{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }],
  },
  output: {
    // Generated in memory, not physical file.
    // Has options to programmatically format filename.
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
}
