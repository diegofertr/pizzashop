import Vue from 'vue'
import Vuex from 'vuex'

import { PizzaStore } from '@/modules/pizza/store'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    modal: false
  },
  mutations: {
    openModal (state, id = '') {
      state[`modal${id}`] = true
    },
    closeModal (state, id = '') {
      state[`modal${id}`] = false
    }
  },
  actions: {},
  modules: {
    pizza: { ...PizzaStore }
  }
})
