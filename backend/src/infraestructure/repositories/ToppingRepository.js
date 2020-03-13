'use strict';

const { deleteItemModel } = require('../lib/queries');

module.exports = function toppingsRepository (models, Sequelize) {
  const { toppings } = models;
  const Op = Sequelize.Op;

  function findAll (params = {}) {
    let query = {};
    query.where = {};

    if (params.name) {
      query.where.name = {
        [Op.iLike]: `%${params.name}%`
      };
    }

    return toppings.findAndCountAll(query);
  }

  function findById (id) {
    return toppings.findOne({
      where: {
        id
      }
    });
  }

  function findByName (name) {
    return toppings.findOne({
      where: {
        name
      }
    });
  }

  async function createOrUpdate (topping) {
    const cond = {
      where: {
        id: topping.id
      }
    };

    const item = await toppings.findOne(cond);

    if (item) {
      let updated;
      try {
        topping._updated_at = new Date();
        updated = await toppings.update(topping, cond);
      } catch (error) {
        throw new Error(error.message);
      }
      return updated ? toppings.findOne(cond) : item;
    }

    let result;
    try {
      result = await toppings.create(topping);
    } catch (error) {
      throw new Error(error.message);
    }

    return result.toJSON();
  }

  async function deleteItem(id) {
    return deleteItemModel(id, toppings);
  }

  return {
    findAll,
    findById,
    findByName,
    createOrUpdate,
    deleteItem
  };
};