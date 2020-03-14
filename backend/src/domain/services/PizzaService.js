'use strict';

const debug = require('debug')('app:service:pizza');

module.exports = function pizzaService (repositories, res) {
  const { PizzaRepository, ToppingsPizzaRepository } = repositories;

  async function findAll (params = {}) {
    debug('List of pizzas');

    let lista;
    try {
      lista = await PizzaRepository.findAll(params);
      if (params.toppings) {
        for (let item of lista.rows) {
          let pizzaToppings = await ToppingsPizzaRepository.findByPizzaId(item.id);
          let toppings = [];
          pizzaToppings.rows.map((val) => {
            toppings.push({
              id: val.topping.id,
              name: val.topping.name
            })
          });

          item.dataValues.toppings = toppings;
        }
      }
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

  async function addToppingsPizza (idPizza, toppings) {
    debug('Adding topping to pizza');

    let toppingsData = [];
    let toppingsPizza;

    toppings.map(topping => {
      toppingsData.push({
        id_pizza: idPizza,
        id_topping: topping
      });
    });
    // try {
    //   // Looking for topping in pizza
    //   const findPizzaTopping = await ToppingsPizzaRepository.findAll({
    //     id_pizza: idPizza,
    //     id_topping: idTopping
    //   });
    //   if (findPizzaTopping.count >= 1 && findPizzaTopping.rows.length >= 1) {
    //     return res.error({ message: 'Pizza already has this topping' });
    //   }
    // } catch (e) {
    //   return res.error(e);
    // }

    try {
      toppingsPizza = await ToppingsPizzaRepository.createAll(toppingsData);
    } catch (e) {
      return res.error(e);
    }

    if (!toppingsPizza) {
      return res.error(new Error(`Toppings could not be added`));
    }

    return res.success(toppingsPizza);
  }

  async function getPizzaToppings (idPizza) {
    debug('Get Pizza Toppings');

    let pizzaToppings;
    let pizza;
    try {
      pizza = await PizzaRepository.findById(idPizza);
      pizzaToppings = await ToppingsPizzaRepository.findByPizzaId(idPizza);
      let toppings = [];
      pizzaToppings.rows.map((value) => {
        toppings.push(value.topping.name);
      });

      pizza.toppings = toppings;
    } catch (e) {
      return res.error(e);
    }

    if (!pizzaToppings) {
      return res.error(new Error(`Pizza ${id} toppings not found`));
    }

    return res.success(pizza);
  }

  return {
    findAll,
    findById,
    createOrUpdate,
    deleteItem,
    addToppingsPizza,
    getPizzaToppings
  };
};