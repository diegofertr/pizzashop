import { httpClient } from '@/plugins/axios'

export default {
  createPizza (pizza) {
    return httpClient.post('/pizza', pizza)
  },
  getPizzas (params) {
    return httpClient.get('/pizza', {
      params
    })
  },
  getPizza (id) {
    return httpClient.get('/pizza/' + id)
  },
  updatePizza (id, pizza) {
    return httpClient.put('/pizza/' + id, pizza)
  },
  deletePizza (id) {
    return httpClient.delete('/pizza/' + id)
  },
  addPizzaToppings (id, toppings) {
    return httpClient.post('/pizza/' + id + '/toppings', toppings)
  },
  deletePizzaTopping (idPizza, idTopping) {
    return httpClient.delete('/pizza/' + idPizza + '/topping/' + idTopping)
  }
}
