function isWeex () {
  return process.env.LOADER === 'weex' // Defined in Webpack config
}

export default {

  methods: {

    push (path) {
      if (isWeex()) {
        const toUrl = weex.config.bundleUrl.split('/').slice(0, -1).join('/') + '/' + path + '.js'
        weex.requireModule('navigator').push({
          url: toUrl,
          animated: 'true'
        })
      } else {
        this.$router.push(path)
      }
    },

    pop () {
      if (isWeex()) {
        weex.requireModule('navigator').pop({
          animated: 'true'
        })
      } else {
        window.history.back()
      }
    }

  }

}
