
const path = require('path')
const PATH = (...p) => path.resolve(__dirname, ...p)

const package = require('./package.json')

const { DefinePlugin } = require('webpack')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  target: 'node',
  context: PATH('./src'),

  entry: {
    main: [ PATH('./src/main.js') ]
  },

  output: {
    path: PATH('./dist'),
    filename: '[name].js',
    library: package.name,
    libraryTarget: 'commonjs2',
    libraryExport: 'default'
  },

  externals: /^(postcss|\$)$/i,

  plugins: [
    new DefinePlugin({
      PLUGIN_NAME: JSON.stringify(package.name),
      PLUGIN_VERSION: JSON.stringify(package.version),
    }),
  ],

  node: false,
  devtool: false,
  stats: 'minimal'
}
