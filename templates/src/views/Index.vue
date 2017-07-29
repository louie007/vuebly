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

<style>
  @import '../assets/css/base.scss';

  .vuebly-logo-image {
    margin-top: 3rem;
    margin-bottom: 1rem;
    height: 3rem;
    width: 3rem;
  }
  .vuebly-hello-text {
    color: red;
  }
</style>
