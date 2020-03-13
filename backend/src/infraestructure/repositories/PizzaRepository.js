'use strict';

module.exports = function pizzasRepository (models, Sequelize) {
  const { pizzas } = models;

  function findAll (params = {}) {
    let query = {};
    query.where = {};

    return pizzas.findAndCountAll(query);
  }

  return {
    findAll
  };
};