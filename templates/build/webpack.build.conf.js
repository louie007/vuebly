/**
 * Set Webpack config for HTML5 Web mode and Native Weex mode,
 * - build src to dist/web directory,
 * - build src to dist/weex directory
 */

process.env.NODE_ENV = 'production'

var ora = require('ora')
var chalk = require('chalk')
var webpack = require('webpack')
var merge = require('webpack-merge')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
// var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

var utils = require('./utils')
var config = require('./config')
var baseWebpackConfig = require('./webpack.base.conf')

/**
 * Webpack config for HTML5 Web mode: 'webModeConfig'
 * Single entry file for web mode: 'config.dev.webEntry'
 */

var webModeConfig = merge(baseWebpackConfig('vue'), {
  entry: {
    app: [config.build.webEntry]
  },
  output: {
    path: config.build.distWebStatic,
    filename: 'js/[name].[chunkhash].js',
    chunkFilename: 'js/[id].[chunkhash].js'
  },
  devtool: config.build.sourceMap ? '#source-map' : false,
  externals: {},
  plugins: [
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   },
    //   sourceMap: config.build.sourceMap
    // }),
    // Generate dist index.html with correct asset hash for caching.
    new HtmlWebpackPlugin({
      filename: config.build.distWebIndex,
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunksSortMode: 'dependency'
    }),
    // Split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // Any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            utils.resolve('node_modules')
          ) === 0
        )
      }
    }),
    // Extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),
    // Copy custom static assets
    new CopyWebpackPlugin([
      {
        from: utils.resolve('static'),
        to: config.build.distWebStatic,
        ignore: ['.*']
      }
    ])
  ]// End
})

/**
 * Webpack config for native weex mode: 'weexModeConfig'
 * Multiple entry files for weex mode, built from src/views
 */

var weexModeConfig = merge(baseWebpackConfig('weex'), {
  entry: utils.buildEntry(),
  output: {
    path: config.build.distWeexStatic,
    filename: 'js/[name].js'
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: utils.resolve('static'),
        to: config.build.distWeexStatic,
        ignore: ['.*']
      }
    ])
  ] // End
})

/**
 * Build now
 */

var spinner = ora('Building for production...')
spinner.start()

webpack([webModeConfig, weexModeConfig], function (err, stats) {
  spinner.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n\n')

  console.log(chalk.cyan('  Build complete.\n'))
  console.log(chalk.yellow(
    '  Tip: built files are meant to be served over an HTTP server.\n' +
    '  Opening index.html over file:// won\'t work.\n'
  ))
})
