'use strict';

module.exports = function setupPizzaRoute (api, controllers) {
  const { ToppingController } = controllers;

  api.get('/', ToppingController.getToppings);
}