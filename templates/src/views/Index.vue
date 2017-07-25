<template>
  <div class="container">
    <image class="vuebly-logo-image" style="width:200px; height:200px;" src="/static/images/vuebly.png" />
    <button @click="click" class="vuebly-button">
      <text class="vuebly-button-text">Say Hello</text>
    </button>
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

<style lang="sass" scope>
  @import '../assets/css/base';
</style>
<style lang="sass" scope>

figure.vuebly-logo-image {
  margin-top: 3rem;
  margin-bottom: 1rem;
  height: 3rem;
  width: 3rem;
}

</style>
