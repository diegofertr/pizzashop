import Vue from 'vue'
import VueRouter from 'vue-router'

import { PizzaRoutes } from '@/modules/pizza/routes'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  ...PizzaRoutes
]

const router = new VueRouter({
  routes
})

export default router
