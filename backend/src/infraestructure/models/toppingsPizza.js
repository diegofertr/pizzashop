'use strict';

const util = require('../lib/util'); 

module.exports = (sequelize, DataTypes) => {
  let fields = {
    id: util.pk
  };

  // Adding log fields
  fields = util.setTimestamps(fields);

  let ToppingsPizza = sequelize.define('toppingsPizza', fields, {
    timestamps: false,
    tableName: 'toppings_pizza'
  });

  return ToppingsPizza;
}