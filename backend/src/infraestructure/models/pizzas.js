'use strict';

const util = require('../lib/util'); 

module.exports = (sequelize, DataTypes) => {
  let fields = {
    id: util.pk,
    name: {
      type: DataTypes.STRING(150),
      xlabel: 'Pizza Name'
    }
  };

  // Adding log fields
  fields = util.setTimestamps(fields);

  let Pizzas = sequelize.define('pizzas', fields, {
    timestamps: false,
    tableName: 'pizzas'
  });

  return Pizzas;
}