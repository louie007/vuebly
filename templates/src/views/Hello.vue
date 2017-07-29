<template>
  <div class="container">
    <text class="vuebly-hello-text">{{ hello }}</text>
    <text class="vuebly-countdown-text">Countdown: {{ countdown }} </text>
    <env title="deviceWidth"></env>
    <a @click="click" class="vuebly-button">
      <text class="vuebly-button-text">Go back</text>
    </a>
  </div>
</template>

<script>
import env from 'components/Env'
import mixins from 'mixins'
export default {

  mixins: [mixins],

  components: {
    env
  },

  data: _ => ({
    env: 'Web',
    hello: 'This is Hello.vue',
    countdown: 3
  }),

  created () {
    var vm = this
    var timer = setInterval(function () {
      if (vm.countdown === 0) {
        weex.requireModule('storage').getItem('hello', ({ result, data }) => {
          if (result === 'success') {
            vm.hello = data
          }
        })
        return clearInterval(timer)
      }
      vm.countdown -= 1
    }, 1000)
  },

  methods: {
    click () {
      this.pop()
    }
  }

}
</script>

<style lang="sass" scoped>
  @import '../assets/css/base.scss';
  
  .vuebly-hello-text {
    margin-top: 150px;
    text-align: center;
    font-size: 30px;
    height: 100px;
    color: #575757;
  }
  .vuebly-countdown-text {
    margin-bottom: 30px;
    text-align: center;
    font-size: 30px;
    color: #e91e63;
  }

</style>
