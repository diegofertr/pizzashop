'use strict';

module.exports = function setupPizzaRoute (api, controllers) {
  const { PizzaController } = controllers;

  api.get('/', PizzaController.getPizzas);
  api.get('/:id', PizzaController.getPizzaId);
  api.post('/', PizzaController.createPizza);
  api.put('/:id', PizzaController.updatePizza);
  api.delete('/:id', PizzaController.deletePizza);

  api.get('/toppings', PizzaController.getToppingsPizza);
}