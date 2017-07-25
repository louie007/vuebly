var path = require('path')

module.exports = {
  build: {
    port: 8080,
    distRoot: path.resolve(__dirname, '../dist'),
    distWeb: path.resolve(__dirname, '../dist/web'),
    distWebStatic: path.resolve(__dirname, '../dist/web/static'),
    distWebIndex: path.resolve(__dirname, '../dist/web/index.html'),
    distWeex: path.resolve(__dirname, '../dist/weex'),
    distWeexStatic: path.resolve(__dirname, '../dist/weex/static'),
    distWeexIndex: path.resolve(__dirname, '../dist/weex/static/js/index.js'),
    entryWeb: path.resolve(__dirname, '../src/main.web.js'),
    assetsPublicPath: '/',
    sourceMap: true
  },
  dev: {
    port: 8080,
    assetsPublicPath: '/',
    autoOpenBrowser: true,
    entryWeb: path.resolve(__dirname, '../src/main.web.js'),
    entryWeex: path.resolve(__dirname, '../src/main.weex.js'),
    proxyTable: {},
    sourceMap: true
  }
}
