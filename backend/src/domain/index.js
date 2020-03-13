'use strict';

const debug = require('debug')('app:domain');
const Response = require('./lib/response');
const db = require('../infraestructure');
const { config, errors } = require('../common');
let res;

module.exports = async function initDomain () {
  if (!res) {
    res = Response();
  }

  // Get repositories from infraestructure layer
  let repositories = await db(config.db).catch(errors.handleFatalError);

  // Loading services from services folder
  let services = {};

  // Loading controllers by module
  services['PizzaService'] = require('./services/PizzaService')(repositories, res);
  services['ToppingService'] = require('./services/ToppingService')(repositories, res);
  services['ToppingsPizzaService'] = require('./services/ToppingsPizzaService')(repositories, res);
  debug('Domain Layer  - Charged Services');

  // Assign models and repositories from infraestructure layer
  services._models = repositories._models;
  services._repositories = repositories;

  return services;
}