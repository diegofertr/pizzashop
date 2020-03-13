'use strict';

const debug = require('debug')('app:db');
const Sequelize = require('sequelize');
const associations = require('./associations');
const defaults = require('defaults');

module.exports = async function (config) {
  config = defaults(config, {
    dialect: 'postgres',
    pool: {
      max: 10,
      min: 0,
      idle: 10000
    },
    operatorAliases: 0,
    timezone: 'America/La_Paz'
  });

  let sequelize = new Sequelize(config);

  let _models = {};
  _models['pizzas'] = sequelize.import('./models/pizzas');
  _models['toppings'] = sequelize.import('./models/toppings');
  _models['toppingsPizza'] = sequelize.import('./models/toppingsPizza');

  let models = associations(_models);

  // Loading repositories
  let repositories = {};
  repositories['PizzaRepository'] = require('./repositories/PizzaRepository')(models, sequelize);
  repositories['ToppingRepository'] = require('./repositories/ToppingRepository')(models, sequelize);
  repositories['ToppingsPizzaRepository'] = require('./repositories/ToppingsPizzaRepository')(models, sequelize);
  debug('Infraestructure Layer - Repositories charged correctly');

  await sequelize.authenticate();

  if (config.setup) {
    await sequelize.sync({ force: true });
  }

  // Adding models to repositories for external use
  repositories._models = _models;

  return repositories;
}