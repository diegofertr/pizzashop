'use strict';

const debug = require('debug')('app:service:toppings_pizza');

module.exports = function toppingService (repositories, res) {
  const { ToppingsPizzaRepository } = repositories;

  async function findAll (params = {}) {
    debug('List toppings of pizzas');

    let lista;
    try {
      lista = await ToppingsPizzaRepository.findAll(params);
    } catch (e) {
      return res.error(e);
    }

    if (!lista) {
      return res.warning(new Error('Error in get toppings of pizzas'));
    }

    return res.success(lista);
  }

  return {
    findAll
  };
};