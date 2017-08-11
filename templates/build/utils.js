const path = require('path')
const fs = require('fs-extra')
const config = require('./config')

/**
 * Path shorthands
 */

exports.resolve = function (dir) {
  return path.join(__dirname, '..', dir)
}

exports.joinPath = function (path1, path2) {
  return path.posix.join(path1, path2)
}

/**
 * Create Weex entry files,
 * Build and return the entries array
 */
let entries = {}

const isWin = /^win/.test(process.platform)

const weexViewsSrcPath = process.env.NODE_ENV === 'production'
  ? config.build.weexViewsSrc
  : config.dev.weexViewsSrc

const weexViewsEntriesPath = process.env.NODE_ENV === 'production'
  ? config.build.weexViewsEntries
  : config.dev.weexViewsEntries

function getEntryFileContent (entryPath, vueFilePath) {
  let relativePath = path.relative(path.join(entryPath, '../'), vueFilePath)
  if (isWin) {
    relativePath = relativePath.replace(/\\/g, '\\\\')
  }
  return `// Weex Entry
import App from '${relativePath}'
/* eslint-disable no-new */
new Vue({
  el: '#root',
  render: h => h(App)
})
`
}

function walk (dir) {
  dir = dir || '.'

  let dirPath = path.resolve(weexViewsSrcPath, dir)

  fs.readdirSync(dirPath)
    .forEach((file) => {
      let srcPath = path.resolve(dirPath, file)
      let srcStat = fs.statSync(srcPath)
      let extName = path.extname(srcPath)
      if (srcStat.isFile() && extName === '.vue') {
        let fileName = path.join(dir, path.basename(file, extName).toLowerCase())
        let entryPath = path.resolve(weexViewsEntriesPath, fileName + '.js')
        // Write entry files
        fs.outputFileSync(entryPath, getEntryFileContent(entryPath, srcPath))
        // Entries array
        entries[fileName] = entryPath + '?entry=true'
      } else if (srcStat.isDirectory()) {
        let subdir = path.join(dir, file)
        walk(subdir)
      }
    }
  )
}

exports.buildEntry = function () {
  entries = {}
  walk()
  return entries
}

/**
 * StyleLoaders helper from Vue.js webpack template
 */
exports.cssLoaders = function (options) {
  options = options || {}

  let cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV === 'production',
      sourceMap: options.sourceMap
    }
  }

  function generateLoaders (loader, loaderOptions) {
    let loaders = [cssLoader]
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
  let output = []
  let loaders = exports.cssLoaders(options)
  for (let extension in loaders) {
    let loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output
}
