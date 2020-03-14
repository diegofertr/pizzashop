'use strict';

module.exports = function setupPizzaRoute (api, controllers) {
  const { PizzaController } = controllers;

  api.get('/', PizzaController.getPizzas);
  api.get('/:id', PizzaController.getPizzaId);
  api.post('/', PizzaController.createPizza);
  api.put('/:id', PizzaController.updatePizza);
  api.delete('/:id', PizzaController.deletePizza);

  api.get('/:id/toppings', PizzaController.getToppingsPizza);
  api.post('/:id/toppings', PizzaController.addToppingsToPizza);
  api.delete('/:idPizza/topping/:idTopping', PizzaController.deletePizzaTopping);
}