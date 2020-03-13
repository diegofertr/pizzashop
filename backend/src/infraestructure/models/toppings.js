'use strict';

const util = require('../lib/util'); 

module.exports = (sequelize, DataTypes) => {
  let fields = {
    id: util.pk,
    name: {
      type: DataTypes.STRING(150),
      xlabel: 'Topping Name'
    }
  };

  // Adding log fields
  fields = util.setTimestamps(fields);

  let Toppings = sequelize.define('toppings', fields, {
    timestamps: false,
    tableName: 'toppings'
  });

  return Toppings;
}