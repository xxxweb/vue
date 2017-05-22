import VueRouter from 'vue-router'
import Vue from 'vue'

import Cd from './components/CD'
import rankpage from './components/rankPage'
Vue.use(VueRouter)

const routes = [
  { path: '/cd/:id', name: 'cd', component: Cd },
  { path: '/rank/:id', name: 'rankpage', component: rankpage }
]

export default new VueRouter({
  routes
})
