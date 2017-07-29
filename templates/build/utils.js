var path = require('path')
var fs = require('fs-extra')
var config = require('./config')

exports.resolve = function (dir) {
  return path.join(__dirname, '..', dir)
}

// var srcPath = exports.resolve('src/views')
// var entryPath = exports.resolve('entry')

exports.getEntryFileContent = function (_path) {
  return `// Weex Entry
import App from '${_path}.vue'
/* eslint-disable no-new */
new Vue({
  el: '#root',
  render: h => h(App)
})
`
}

exports.buildEntry = function () {
  // Write entry files
  fs.readdirSync(config.dev.weexViewsSrc).forEach(file => {
    var fullpath = path.resolve(config.dev.weexViewsSrc, file)
    var extname = path.extname(fullpath)
    var name = path.basename(file, extname)
    if (fs.statSync(fullpath).isFile() && extname === '.vue') {
      fs.outputFileSync(path.resolve(config.dev.weexViewsEntries, name.toLowerCase() + '.js'), exports.getEntryFileContent('../views/' + name))
    }
  })
  var entry = {}
  // Create entry files array
  fs.readdirSync(config.dev.weexViewsEntries).forEach(file => {
    const name = path.basename(file, path.extname(path.resolve(config.dev.weexViewsEntries, file))).toLowerCase()
    entry[name] = [path.resolve(config.dev.weexViewsEntries, name + '.js')]
  })
  return entry
}

exports.cssLoaders = function (options) {
  options = options || {}

  var cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV === 'production',
      sourceMap: options.sourceMap
    }
  }

  function generateLoaders (loader, loaderOptions) {
    var loaders = [cssLoader]
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    return ['vue-style-loader'].concat(loaders)
  }

  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: false }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  var output = []
  var loaders = exports.cssLoaders(options)
  for (var extension in loaders) {
    var loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output
}
