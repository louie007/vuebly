/**
 * Basic Webpack config
 * Param: 'vue' and 'weex'
 */

const webpack = require('webpack')
const utils = require('./utils')
const config = require('./config')

module.exports = function getBaseConfig (_loader) {
  return {
    output: {
      path: config.build.distRoot,
      filename: '[name].' + (_loader === 'vue' ? 'web' : _loader) + '.js',
      publicPath: process.env.NODE_ENV === 'production'
        ? config.build.assetsPublicPath
        : config.dev.assetsPublicPath
    },
    externals: _loader === 'weex' ? {
      'vue': 'Vue',
      'weex-vue-render': 'WeexVueRenderer'
    } : {},
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        'vue$': 'vue/dist/vue.runtime.esm.js',
        'assets': utils.resolve('src/assets'),
        'components': utils.resolve('src/components'),
        'mixins': utils.resolve('src/mixins'),
        'utils': utils.resolve('src/utils'),
        'views': utils.resolve('src/views')
      }
    },
    module: {
      rules: [
        {
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          enforce: 'pre',
          include: [utils.resolve('src'), utils.resolve('test')],
          options: {
            formatter: require('eslint-friendly-formatter')
          }
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          include: [utils.resolve('build'), utils.resolve('src'), utils.resolve('test')]
        },
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'images/[name].[hash:7].[ext]'
          }
        },
        {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'media/[name].[hash:7].[ext]'
          }
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'fonts/[name].[hash:7].[ext]'
          }
        }
      ].concat(_loader === 'vue'
        ? [{
          test: /\.vue(\?[^?]+)?$/,
          loader: 'vue-loader', // web => 'vue-loader'
          include: [utils.resolve('src'), utils.resolve('test')],
          options: {
            compilerModules: [
              {
                postTransformNode: el => {
                  el.staticStyle = `$processStyle(${el.staticStyle})`
                  el.styleBinding = `$processStyle(${el.styleBinding})`
                }
              }
            ]
          }
        }]
        : [{
          test: /\.vue(\?[^?]+)?$/,
          loader: 'weex-loader', // native => 'weex-loader'
          include: [utils.resolve('src'), utils.resolve('test')]
        }]
      )
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          HOST_IP: JSON.stringify(require('ip').address()),
          LOADER: _loader === 'weex'
          ? '"weex"'
          : '"vue"'
        }
      }),
      new webpack.BannerPlugin({
        banner: '// { "framework": "Vue" }\n',
        raw: true
      })
    ]
  }
}
