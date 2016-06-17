var path = require('path');

module.exports = {
  entry: [
    './src/entry.js'
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-1']
      }
    }]
  },
  resolve: {
    alias: {
      components:   path.resolve(__dirname, 'src', 'components'),
      reducers:     path.resolve(__dirname, 'src', 'reducers'),
      actions:      path.resolve(__dirname, 'src', 'actions')
    },
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './public/'
  }
};
