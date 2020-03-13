'use strict';

const debug = require('debug')('app:service:topping');

module.exports = function toppingService (repositories, res) {
  const { ToppingRepository } = repositories;

  async function findAll (params = {}) {
    debug('List of toppings');

    let lista;
    try {
      lista = await ToppingRepository.findAll(params);
    } catch (e) {
      return res.error(e);
    }

    if (!lista) {
      return res.warning(new Error('Error getting topping list'));
    }

    return res.success(lista);
  }

  async function findById (id) {
    debug('Looking for topping by ID');

    let topping;
    try {
      topping = await ToppingRepository.findById(id);
    } catch (e) {
      return res.error(e);
    }

    if (!topping) {
      return res.error(new Error(`Topping ${id} not found`));
    }

    return res.success(topping);
  }

  async function createOrUpdate(data) {
    debug('Create or update topping');

    let topping;
    try {
      topping = await ToppingRepository.createOrUpdate(data);
    } catch (e) {
      return res.error(e);
    }

    if (!topping) {
      return res.error(new Error(`Topping could not be created or updated`));
    }

    return res.success(topping);
  }

  async function deleteItem (id) {
    debug('Deleting topping');

    let deleted;
    try {
      deleted = await ToppingRepository.deleteItem(id);
    } catch (e) {
      return res.error(e);
    }

    if (deleted === -1) {
      return res.error(new Error(`Topping doesn't exist`));
    }

    if (deleted === 0) {
      return res.warning(new Error(`Topping has already been deleted`));
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