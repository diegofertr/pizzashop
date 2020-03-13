'use strict';

const debug = require('debug')('app:service:pizza');

module.exports = function pizzaService (repositories, res) {
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
      return res.warning(new Error('Error getting pizzas list'));
    }

    return res.success(lista);
  }

  async function findById (id) {
    debug('Looking for pizza by ID');

    let pizza;
    try {
      pizza = await PizzaRepository.findById(id);
    } catch (e) {
      return res.error(e);
    }

    if (!pizza) {
      return res.error(new Error(`Pizza ${id} not found`));
    }

    return res.success(pizza);
  }

  async function createOrUpdate(data) {
    debug('Create or update pizza');

    let pizza;
    try {
      pizza = await PizzaRepository.createOrUpdate(data);
    } catch (e) {
      return res.error(e);
    }

    if (!pizza) {
      return res.error(new Error(`Pizza could not be created or updated`));
    }

    return res.success(pizza);
  }

  async function deleteItem (id) {
    debug('Deleting pizza');

    let deleted;
    try {
      deleted = await PizzaRepository.deleteItem(id);
    } catch (e) {
      return res.error(e);
    }

    if (deleted === -1) {
      return res.error(new Error(`Pizza doesn't exist`));
    }

    if (deleted === 0) {
      return res.warning(new Error(`Pizza has already been deleted`));
    }

    return res.success(deleted > 0);
  }

  return {
    findAll,
    findById,
    createOrUpdate,
    deleteItem
  };
};