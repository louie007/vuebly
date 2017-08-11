import Vue from 'vue'
import WeexVueRenderer from 'weex-vue-render'
import VueRouter from 'vue-router'
import App from './App.vue'
import routes from './routes'

WeexVueRenderer.init(Vue)

Vue.use(VueRouter)
var router = new VueRouter({
  linkActiveClass: 'open active',
  routes: routes
})

/* eslint-disable no-new */
new Vue({
  el: '#root',
  router,
  render: h => h(App)
})

// router.push('/index')
