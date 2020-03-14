import { httpClient } from '@/plugins/axios'

export default {
  createTopping (topping) {
    return httpClient.post('/topping', topping)
  },
  getToppings () {
    return httpClient.get('/topping')
  },
  getTopping (id) {
    return httpClient.get('/topping/' + id)
  },
  updateTopping (id, topping) {
    return httpClient.put('/topping/' + id, topping)
  },
  deleteTopping (id) {
    return httpClient.delete('/topping/' + id)
  }
}
