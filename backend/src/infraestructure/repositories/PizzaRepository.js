'use strict';

const { deleteItemModel } = require('../lib/queries');

module.exports = function pizzasRepository (models, Sequelize) {
  const { pizzas } = models;
  const Op = Sequelize.Op;

  function findAll (params = {}) {
    let query = {};
    query.where = {};

    if (params.name) {
      query.where.name = {
        [Op.iLike]: `%${params.name}%`
      };
    }

    return pizzas.findAndCountAll(query);
  }

  function findById (id) {
    return pizzas.findOne({
      where: {
        id
      },
      raw: true
    });
  }

  function findByName (name) {
    return pizzas.findOne({
      where: {
        name
      }
    });
  }

  async function createOrUpdate (pizza) {
    const cond = {
      where: {
        id: pizza.id || null
      }
    };

    const item = await pizzas.findOne(cond);

    if (item) {
      let updated;
      try {
        pizza._updated_at = new Date();
        updated = await pizzas.update(pizza, cond);
      } catch (error) {
        throw new Error(error.message);
      }
      return updated ? pizzas.findOne(cond) : item;
    }

    let result;
    try {
      result = await pizzas.create(pizza);
    } catch (error) {
      throw new Error(error.message);
    }

    return result.toJSON();
  }

  async function deleteItem(id) {
    return deleteItemModel(id, pizzas);
  }

  return {
    findAll,
    findById,
    findByName,
    createOrUpdate,
    deleteItem
  };
};