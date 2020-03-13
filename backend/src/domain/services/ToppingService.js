'use strict';

const debug = require('debug')('app:service:topping');

module.exports = function toppingService (repositories, res) {
  const { ToppingRepository } = repositories;

  async function findAll (params = {}) {
    debug('List of available toppings');

    return res.success([]);
  }

  return {
    findAll
  };
};