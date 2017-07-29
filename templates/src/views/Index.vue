<template>
  <div class="container">
    <image class="vuebly-logo-image" src="/static/images/vuebly.png" />
    <a @click="click" class="vuebly-button">
      <text class="vuebly-button-text">Say Hello</text>
    </a>
  </div>
</template>

<script>
import mixins from 'mixins'
export default {

  mixins: [mixins],

  methods: {
    click () {
      weex.requireModule('storage').setItem('hello', 'Greeting from Index.vue', ({ result }) => {
        if (result === 'success') {
          this.push('hello')
        }
      })
    }
  }

}
</script>

<style lang="sass" scoped>
  @import '../assets/css/base.scss';

  .vuebly-logo-image {
    margin-top: 100px;
    margin-bottom: 60px;
    height: 260px;
    width: 260px;
  }
  .vuebly-hello-text {
    color: red;
  }
</style>
