import Vue from 'vue'
import VueRouter from 'vue-router'

import { PizzaRoutes } from '@/modules/pizza/routes'
import { ToppingRoutes } from '@/modules/topping/routes'

Vue.use(VueRouter)

const routes = [
  ...PizzaRoutes,
  ...ToppingRoutes
]

const router = new VueRouter({
  routes
})

export default router
