'use strict';

const debug = require('debug')('app:controller:topping');

module.exports = function setupToppingController (services) {
  const { ToppingService } = services;

  async function getToppings(req, res, next) {
    debug('Get toppings');

    const dataFromService = await ToppingService.findAll();
    res.send(dataFromService);
  }

  return {
    getToppings
  }
}