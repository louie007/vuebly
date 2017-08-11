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

<style lang="scss" scoped>
  @import '../assets/css/base.scss';

  .vuebly-logo-image {
    margin: 0.5rem 0 0.2rem 0;
    height: 3.5rem;
    width: 3.5rem;
  }
  .vuebly-hello-text {
    color: red;
  }
</style>
