<template>
  <div class="weex-root">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  export default {}
</script>

<style>
  body {
    margin: 0;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s
  }
  .fade-enter, .fade-leave-active {
    opacity: 0
  }
</style>
