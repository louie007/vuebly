/**
 * Set Webpack config for HTML5 Web mode and Native Weex mode,
 * run local dev server with webpack-dev-middleware and webpack-hot-middleware
 */

process.env.NODE_ENV = 'development'

const opn = require('opn')
const express = require('express')
const webpack = require('webpack')
const merge = require('webpack-merge')
const devMiddleware = require('webpack-dev-middleware')
const hotMiddleware = require('webpack-hot-middleware')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const utils = require('./utils')
const config = require('./config')
const baseWebpackConfig = require('./webpack.base.conf')
// const host = require('ip').address()
const uri = 'http://localhost:' + config.dev.port
const app = express()

/**
 * Webpack config for HTML5 Web mode: 'webModeConfig'
 * Single entry file for web mode: 'config.dev.webEntry'
 */

const webModeConfig = merge(baseWebpackConfig('vue'), {
  name: 'web',
  entry: {
    app: [
      'webpack-hot-middleware/client?name=web&reload=true',
      config.dev.webEntry
    ]
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.NamedModulesPlugin(),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'qrcode.html',
      template: 'qrcode.tpl',
      chunks: []
    }),
    new FriendlyErrorsPlugin()
  ]
})

/**
 * Webpack config for native weex mode: 'weexModeConfig'
 * Multiple entry files for weex mode, built from src/views
 */

const weexEntries = utils.buildEntry()

Object.keys(weexEntries).forEach(function (name) {
  weexEntries[name] = ['webpack-hot-middleware/client?name=weex&reload=true'].concat(weexEntries[name])
})

const weexModeConfig = merge(baseWebpackConfig('weex'), {
  name: 'weex',
  entry: weexEntries,
  output: {
    path: config.build.distRoot,
    filename: 'weex/[name].js'
  }
})

/**
 * Using multi compiler instances with webpack-hot-middleware
 * Solution from https://github.com/glenjamin/webpack-hot-middleware
 */

const configArray = [webModeConfig, weexModeConfig]

configArray.forEach(function (config) {
  const compiler = webpack(config)

  // serve webpack bundle output
  app.use(devMiddleware(compiler, {
    publicPath: config.output.publicPath,
    quiet: false,
    stats: {
      colors: true,
      children: false,
      chunkModules: false,
      entrypoints: true
    }
  }))

  // Enables HMR hot-reload and state-preserving
  // compilation error display
  app.use(hotMiddleware(compiler, {
    log: () => {},
    heartbeat: 2000
  }))
})

// Handle fallback for HTML5 history API (Web mode only)
app.use(require('connect-history-api-fallback')())

// Serve pure static assets
app.use(config.dev.assetsPublicStaticPath, express.static('./static'))

let _resolve
const readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
const server = app.listen(config.dev.port, function () {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (config.dev.autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
