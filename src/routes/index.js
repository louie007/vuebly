import Index from '../views/Index'
import Hello from '../views/Hello.vue'

const routes = [
  {
    name: 'Root',
    path: '/',
    redirect: '/index'
  },
  {
    name: 'Index',
    path: '/index',
    component: Index
  },
  {
    name: 'Hello',
    path: '/hello',
    component: Hello
  }
]

export default routes
