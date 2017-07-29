<template>
  <text class="vuebly-env-info">{{ info }}</text>
</template>

<script>
export default {

  name: 'env',

  data: _ => ({
    info: 'Env info...'
  }),

  props: {
    title: String
  },

  created () {
    // Available param:
    //   - deviceModel, deviceHeight, deviceWidth, dpr, osName
    //   - osVersion, platform, rem, scale, userAgent, weexVersion
    if (weex.config.env) {
      this.info = 'Env ' + this.title + ': ' + weex.config.env[this.title]
    }
  }

}
</script>

<style lang="sass" scoped>

.vuebly-env-info {
  margin-bottom: 30px;
  text-align: center;
  font-size: 30px;
  color: #e91e63;
}

</style>
