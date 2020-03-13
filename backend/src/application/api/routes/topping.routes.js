'use strict';

module.exports = function setupPizzaRoute (api, controllers) {
  const { ToppingController } = controllers;

  api.get('/', ToppingController.getToppings);
  api.get('/:id', ToppingController.getToppingId);
  api.post('/', ToppingController.createTopping);
  api.put('/:id', ToppingController.updateTopping);
  api.delete('/:id', ToppingController.deleteTopping);
}