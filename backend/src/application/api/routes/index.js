'use strict';

const express = require('express');
const chalk = require('chalk');
const api = express.Router();

module.exports = function setupApi (controllers) {
  // Loading routes by module
  /**
   * Pizzas module
   */
  let pizzaRouter = express.Router();
  require('./pizza.routes')(pizzaRouter, controllers);
  api.use('/pizza', pizzaRouter);
  console.log('🚀  ' + chalk.yellow('ROUTES: ') + chalk.redBright('PIZZA'));

  /**
   * Toppings module
   */
  let toppingRouter = express.Router();
  require('./topping.routes')(toppingRouter, controllers);
  api.use('/topping', toppingRouter);
  console.log('🚀  ' + chalk.yellow('ROUTES: ') + chalk.redBright('TOPPING'));

  return api;
};