'use strict';

const debug = require('debug')('app:controller:pizza');

module.exports = function setupPizzaController (services) {
  const { PizzaService, ToppingsPizzaService } = services;

  async function getPizzas(req, res, next) {
    debug('Get Pizzas');

    const dataFromService = await PizzaService.findAll();
    res.send(dataFromService);
  }

  async function getToppingsPizza(req, res, next) {
    debug('Get Toppings-Pizzas');
    const dataFromService = await ToppingsPizzaService.findAll();
    res.send(dataFromService);
  }

  return {
    getPizzas,
    getToppingsPizza
  }
}