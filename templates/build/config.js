const path = require('path')

module.exports = {
  build: {
    assetsPublicPath: '/',
    assetsPublicStaticPath: '/static',
    distRoot: path.resolve(__dirname, '../dist'),
    distWeb: path.resolve(__dirname, '../dist/web'),
    distWebIndex: path.resolve(__dirname, '../dist/web/index.html'),
    distWebStatic: path.resolve(__dirname, '../dist/web/static'),
    distWeex: path.resolve(__dirname, '../dist/weex'),
    distWeexIndex: path.resolve(__dirname, '../dist/weex/static/js/index.js'),
    distWeexStatic: path.resolve(__dirname, '../dist/weex/static'),
    webEntry: path.resolve(__dirname, '../src/main.web.js'),
    weexViewsEntries: path.resolve(__dirname, '../src/entries'),
    weexViewsSrc: path.resolve(__dirname, '../src/views'),
    sourceMap: true,
    port: 8080
  },
  dev: {
    assetsPublicPath: '/',
    assetsPublicStaticPath: '/static',
    autoOpenBrowser: true,
    webEntry: path.resolve(__dirname, '../src/main.web.js'),
    weexViewsEntries: path.resolve(__dirname, '../src/entries'),
    weexViewsSrc: path.resolve(__dirname, '../src/views'),
    sourceMap: true,
    port: 8080
  }
}
