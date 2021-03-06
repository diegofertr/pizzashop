'use strict';

const debug = require('debug')('app:controller:pizza');

module.exports = function setupPizzaController (services) {
  const { PizzaService, ToppingsPizzaService } = services;

  async function getPizzas(req, res, next) {
    debug('Get Pizzas List');

    try {
      const result = await PizzaService.findAll(req.query);

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
    debug('Updating Pizza');

    try {
      const { id } = req.params;
      let data = req.body;
      data.id = id;

      const result = await PizzaService.createOrUpdate(data);
      if (result.code === 1) {
        res.send(result.data);
      } else {
        return res.status(412).send({ 
          error: result.message || 'An error ocurred while updating pizza' 
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

    try {
      const { id } = req.params;
      const result = await await PizzaService.getPizzaToppings(id);
      if (result.code === 1) {
        res.send(result.data);
      } else {
        return res.status(412).send({ 
          error: result.message || 'An error ocurred while getting pizza toppings' 
        });
      }
    } catch (e) {
      return next(e);
    }
  }

  async function addToppingsToPizza(req, res, next) {
    debug('Adding Topping to Pizza');

    try {
      const { id } = req.params;
      const result = await PizzaService.addToppingsPizza(id, req.body);

      if (result.code == 1) {
        res.send(result.data);
      } else {
        return res.status(412).send({ 
          error: result.message || 'An error ocurred while adding topping to pizza' 
        });
      }
    } catch (e) {
      return next(e);
    }
  }

  async function deletePizzaTopping(req, res, next) {
    debug('Deleting pizza topping');

    try {
      const { idPizza, idTopping } = req.params;
      const result = await ToppingsPizzaService.deleteItem(idPizza, idTopping);

      if (result.code == 1) {
        res.send(result.data);
      } else {
        return res.status(412).send({ 
          error: result.message || 'An error ocurred while deleting pizza topping' 
        });
      }
    } catch (e) {
      return next(e);
    }
  }

  return {
    getPizzas,
    getPizzaId,
    createPizza,
    updatePizza,
    deletePizza,
    getToppingsPizza,
    addToppingsToPizza,
    deletePizzaTopping
  }
}