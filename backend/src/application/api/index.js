'use strict';

const debug = require('debug')('app:api');
const routes = require('./routes');

module.exports = async function setupApi (app, services) {
  debug('Starting API-REST');

  let controllers = {};

  // Loading controllers by module
  controllers['PizzaController'] = require('./controllers/PizzaController')(services);
  controllers['ToppingController'] = require('./controllers/ToppingController')(services);

  // Load routes
  app.use('/api', routes(controllers));

  return app;
}