'use strict';

const debug = require('debug')('app:controller:topping');

module.exports = function setupToppingController (services) {
  const { ToppingService } = services;

  async function getToppings(req, res, next) {
    debug('Get Toppings List');

    try {
      const result = await ToppingService.findAll();

      if (result.code === 1) {
        res.send(result.data);
      } else {
        return res.status(412).send({ 
          error: result.message || 'An error ocurred while getting toppings list' 
        });
      }
    } catch (e) {
      return next(e);
    }
  }

  async function getToppingId(req, res, next) {
    debug('Get Topping By ID');

    try {
      const { id } = req.params;
      const result = await ToppingService.findById(id);

      if (result.code === 1) {
        res.send(result.data);
      } else {
        return res.status(412).send({ 
          error: result.message || 'An error ocurred while getting topping by ID'
        });
      }
    } catch (e) {
      return next(e);
    }
  }

  async function createTopping(req, res, next) {
    debug('Creating Topping');

    try {
      let data = req.body;

      const result = await ToppingService.createOrUpdate(data);
      if (result.code === 1) {
        res.send(result.data);
      } else {
        return res.status(412).send({ 
          error: result.message || 'An error ocurred while creating topping' 
        });
      }
    } catch (e) {
      return next(e);
    }
  }

  async function updateTopping(req, res, next) {
    debug('Updating Topping');

    try {
      const { id } = req.params;
      let data = req.body;
      data.id = id;

      const result = await ToppingService.createOrUpdate(data);
      if (result.code === 1) {
        res.send(result.data);
      } else {
        return res.status(412).send({
          error: result.message || 'An error ocurred while updating topping'
        });
      }
    } catch (e) {
      return next(e);
    }
  }

  async function deleteTopping(req, res, next) {
    debug('Deleting Topping');

    try {
      const { id } = req.params;
      const result = await ToppingService.deleteItem(id);
      if (result.code == 1) {
        res.send(result.data);
      } else {
        return res.status(412).send({ 
          error: result.message || 'An error ocurred while deleting topping' 
        });
      }
    } catch (e) {
      return next(e);
    }
  }

  return {
    getToppings,
    getToppingId,
    createTopping,
    updateTopping,
    deleteTopping
  }
}