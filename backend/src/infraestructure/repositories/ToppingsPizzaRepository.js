'use strict';

const { deleteItemModel } = require('../lib/queries');

module.exports = function toppingsPizzaRepository (models, Sequelize) {
  const { toppingsPizza, pizzas, toppings } = models;

  function findAll (params = {}) {
    let query = {};
    query.where = params;
    query.include = [
      {
        attributes: ['name'],
        model: pizzas,
        as: 'pizza'
      },
      {
        attributes: ['name'],
        model: toppings,
        as: 'topping'
      }
    ];

    if (params.id_pizza) {
      query.where.id_pizza = params.id_pizza;
    }

    if (params.id_topping) {
      query.where.id_topping = params.id_topping;
    }

    return toppingsPizza.findAndCountAll(query);
  }

  function findByPizzaId (idPizza) {
    let query = {
      where: {
        id_pizza: idPizza
      },
      include: [{
        attributes: ['name'],
        model: toppings,
        as: 'topping'
      }]
    };

    return toppingsPizza.findAndCountAll(query);
  }

  function findByToppingId (idTopping) {
    return toppingsPizza.findOne({
      where: {
        id_topping: idTopping
      }
    });
  }

  async function createOrUpdate (toppingPizza) {
    const cond = {
      where: {
        id: toppingPizza.id || null
      }
    };

    const item = await toppingsPizza.findOne(cond);

    if (item) {
      let updated;
      try {
        toppingPizza._updated_at = new Date();
        updated = await toppingsPizza.update(toppingPizza, cond);
      } catch (error) {
        throw new Error(error.message);
      }
      return updated ? toppingsPizza.findOne(cond) : item;
    }

    let result;
    try {
      result = await toppingsPizza.create(toppingPizza);
    } catch (error) {
      throw new Error(error.message);
    }

    return result.toJSON();
  }

  async function deleteItem(id) {
    return deleteItemModel(id, toppingsPizza);
  }

  return {
    findAll,
    findByPizzaId,
    findByToppingId,
    createOrUpdate,
    deleteItem
  };
};