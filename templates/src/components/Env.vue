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

<style lang="sass" scope>

.vuebly-env-info {
  margin-bottom: 0.5rem;
  text-align: center;
  font-size: 0.4rem;
  color: #e91e63;
}

</style>
