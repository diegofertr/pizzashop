'use strict';

const debug = require('debug')('app:app');
const express = require('express');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const http = require('http');
const cors = require('cors');
const App = require('./');
const api = require('./api');
const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(cors());

(async function (app) {
  // Loading services
  let services = {};
  const application = await App();
  services = Object.assign(services, application.services);

  // Init API-REST
  app = await api(app, services);

  app.use((err, req, res, next) => {
    debug(chalk.red(`[ERROR]: ${err.message}`));
    if (err.message) {
      if (err.message.match(/not found/)) {
        return res.status(404).send({ error: err.message });
      }
    }

    res.status(500).send({ error: err.message });
  });
})(app);

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`${chalk.green('[base-app]')} server listening on port ${port}`);
});
