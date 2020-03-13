'use strict';

module.exports = function toppingsPizzaRepository (models, Sequelize) {
  const { toppingsPizza, pizzas, toppings } = models;

  function findAll (params = {}) {
    let query = {};
    query.where = {};
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

    return toppingsPizza.findAndCountAll(query);
  }

  return {
    findAll
  };
};