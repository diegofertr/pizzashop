'use strict';

const debug = require('debug')('app:service:pizza');

module.exports = function pizzaService (repositories, res) {
  // console.log(repositories);
  const { PizzaRepository } = repositories;

  async function findAll (params = {}) {
    debug('List of pizzas');

    let lista;
    try {
      lista = await PizzaRepository.findAll(params);
    } catch (e) {
      return res.error(e);
    }

    if (!lista) {
      return res.warning(new Error('Error in get list of pizzas from repositories'));
    }

    return res.success(lista);
  }

  return {
    findAll
  };
};