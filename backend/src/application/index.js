'use strict';

const domain = require('../domain');

module.exports = async function setupModule () {
  try {
    console.log('Instantiating services, models and repositories');
    let services = await domain();

    return {
      services
    };
  } catch (error) {
    console.log(error);
    throw new Error(`Failed to instantiate main module: ${error.message}`);
  }
}