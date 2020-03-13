'use strict';

module.exports = function toppingsRepository (models, Sequelize) {
  const { toppings } = models;

  function findAll (params = {}) {
    let query = {};
    query.where = {};

    return toppings.findAndCountAll(query);
  }

  return {
    findAll
  };
};