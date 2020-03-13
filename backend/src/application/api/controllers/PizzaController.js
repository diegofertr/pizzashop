'use strict';

const debug = require('debug')('app:controller:pizza');

module.exports = function setupPizzaController (services) {
  const { PizzaService, ToppingsPizzaService } = services;

  async function getPizzas(req, res, next) {
    debug('Get Pizzas List');

    try {
      const result = await PizzaService.findAll();

      if (result.code === 1) {
        res.send(result.data);
      } else {
        // return next(new Error(result.message));
        return res.status(412).send({ 
          error: result.message || 'An error ocurred while getting pizzas list' 
        });
      }
    } catch (e) {
      return next(e);
    }
  }

  async function getPizzaId(req, res, next) {
    debug('Get Pizza By ID');

    try {
      const { id } = req.params;
      const result = await PizzaService.findById(id);

      if (result.code === 1) {
        res.send(result.data);
      } else {
        return res.status(412).send({ 
          error: result.message || 'An error ocurred while getting pizzas by ID'
        });
      }
    } catch (e) {
      return next(e);
    }
  }

  async function createPizza(req, res, next) {
    debug('Creating Pizza');

    try {
      let data = req.body;

      const result = await PizzaService.createOrUpdate(data);
      if (result.code === 1) {
        res.send(result.data);
      } else {
        return res.status(412).send({ 
          error: result.message || 'An error ocurred while creating pizza' 
        });
      }
    } catch (e) {
      return next(e);
    }
  }

  async function updatePizza(req, res, next) {
    debug('Creating Pizza');

    try {
      const { id } = req.params;
      let data = req.body;
      data.id = id;

      const result = await PizzaService.createOrUpdate(data);
      if (result.code === 1) {
        res.send(result.data);
      } else {
        return res.status(412).send({ 
          error: result.message || 'An error ocurred while creating pizza' 
        });
      }
    } catch (e) {
      return next(e);
    }
  }

  async function deletePizza(req, res, next) {
    debug('Deleting pizza');

    try {
      const { id } = req.params;
      const result = await PizzaService.deleteItem(id);
      if (result.code == 1) {
        res.send(result.data);
      } else {
        return res.status(412).send({ 
          error: result.message || 'An error ocurred while deleting pizza' 
        });
      }
    } catch (e) {
      return next(e);
    }
  }

  async function getToppingsPizza(req, res, next) {
    debug('Get Toppings-Pizzas');
    const dataFromService = await ToppingsPizzaService.findAll();
    res.send(dataFromService);
  }

  return {
    getPizzas,
    getPizzaId,
    createPizza,
    updatePizza,
    deletePizza,
    getToppingsPizza
  }
}