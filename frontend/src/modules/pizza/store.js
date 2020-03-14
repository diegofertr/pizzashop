import PizzaServices from './services'

const SET_PIZZAS = 'pizza/SET_PIZZAS'
const SET_PIZZA = 'pizza/SET_PIZZA'
const UPDATE_PIZZA = 'pizza/UPDATE_PIZZA'
const CREATE_PIZZA = 'pizza/CREATE_PIZZA'

export const PizzaStore = {
  namespaced: true,
  state: {
    pizza: '',
    pizzas: []
  },
  actions: {
    createPizza: async ({ commit }, payload) => {
      const response = await PizzaServices.createPizza(payload)

      commit(CREATE_PIZZA, response.data)
    },
    getPizzas: async ({ commit }) => {
      const response = await PizzaServices.getPizzas()

      commit(SET_PIZZAS, response.data)
    },
    getPizzaById: async ({ commit }, payload) => {
      const response = await PizzaServices.getPizza(payload)

      commit(SET_PIZZA, response.data)
    },
    updatePizza: async ({ commit, state }, payload) => {
      const { id } = payload
      const response = await PizzaServices.updatePizza(id, state.pizza)

      commit(UPDATE_PIZZA, response.data)
    }
  },
  mutations: {
    [CREATE_PIZZA] (state, payload) {
      state.pizzas.push(payload)
    },
    [SET_PIZZAS] (state, payload) {
      state.pizzas = payload
    },
    [SET_PIZZA] (state, payload) {
      state.pizza = payload
    },
    [UPDATE_PIZZA] (state, payload) {
      const { pizzas } = state
      const newState = pizzas.map(pizza => {
        if (pizza.id === payload.id) {
          pizza = payload
        }

        return pizza
      })
      state.pizzas = newState
    }
  }
}
