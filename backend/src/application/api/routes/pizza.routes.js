'use strict';

module.exports = function setupPizzaRoute (api, controllers) {
  const { PizzaController } = controllers;

  api.get('/', PizzaController.getPizzas);
  api.get('/toppings', PizzaController.getToppingsPizza);
}