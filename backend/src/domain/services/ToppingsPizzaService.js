'use strict';

const debug = require('debug')('app:service:toppings_pizza');

module.exports = function toppingService (repositories, res) {
  const { ToppingsPizzaRepository } = repositories;

  async function findAll (params = {}) {
    debug('List of toppings - pizza');

    let lista;
    try {
      lista = await ToppingsPizzaRepository.findAll(params);
    } catch (e) {
      return res.error(e);
    }

    if (!lista) {
      return res.warning(new Error('Error getting Toppings_Pizza list'));
    }

    return res.success(lista);
  }

  async function findByPizzaId (idPizza) {
    debug('Looking for toppings-pizza by pizza ID');

    let toppingsPizza;
    try {
      toppingsPizza = await ToppingsPizzaRepository.findByPizzaId(idPizza);
    } catch (e) {
      return res.error(e);
    }

    if (!toppingsPizza) {
      return res.error(new Error(`Toppings-Pizza by Pizza ${id} not found`));
    }

    return res.success(toppingsPizza);
  }

  async function createOrUpdate(data) {
    debug('Create or update toppings-pizza');

    let toppingsPizza;
    try {
      toppingsPizza = await toppingsPizzasPizzaRepository.createOrUpdate(data);
    } catch (e) {
      return res.error(e);
    }

    if (!toppingsPizza) {
      return res.error(new Error(`Toppings_Pizza could not be created or updated`));
    }

    return res.success(toppingsPizza);
  }

  async function deleteItem (id) {
    debug('Deleting toppings-pizza');

    let deleted;
    try {
      deleted = await ToppingsPizzaRepository.deleteItem(id);
    } catch (e) {
      return res.error(e);
    }

    if (deleted === -1) {
      return res.error(new Error(`Toppings_Pizza doesn't exist`));
    }

    if (deleted === 0) {
      return res.warning(new Error(`Toppings_Pizza has already been deleted`));
    }

    return res.success(deleted > 0);
  }

  return {
    findAll,
    findByPizzaId,
    createOrUpdate,
    deleteItem
  };
};