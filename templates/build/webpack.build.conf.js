/**
 * Set Webpack config for HTML5 Web mode and Native Weex mode,
 * - build src to dist/web directory,
 * - build src/views to dist/weex directory
 */

process.env.NODE_ENV = 'production'

const ora = require('ora')
const chalk = require('chalk')
const webpack = require('webpack')
const merge = require('webpack-merge')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

const utils = require('./utils')
const config = require('./config')
const baseWebpackConfig = require('./webpack.base.conf')

/**
 * Webpack config for HTML5 Web mode: 'webModeConfig'
 * Single entry file for web mode: 'config.dev.webEntry'
 */

const webModeConfig = merge(baseWebpackConfig('vue'), {
  entry: {
    app: [config.build.webEntry]
  },
  output: {
    path: config.build.distWeb,
    filename: utils.joinPath(config.build.assetsPublicStaticPath, 'js/[name].[chunkhash].js'),
    chunkFilename: utils.joinPath(config.build.assetsPublicStaticPath, 'js/[id].[chunkhash].js')
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
  ]// End plugins
})

/**
 * Webpack config for native weex mode: 'weexModeConfig'
 * Multiple entry files for weex mode, built from src/views
 */

const weexModeConfig = merge(baseWebpackConfig('weex'), {
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
  ]
})

/**
 * Build now
 */

const spinner = ora('Building for production...')
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
