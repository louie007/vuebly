import App from './App.vue'
import VueRouter from 'vue-router'
import routes from './routes'

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
