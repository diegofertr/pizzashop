'use strict';

const Sequelize = require('sequelize');

const pk = {
  primaryKey: true,
  autoIncrement: true,
  type: Sequelize.INTEGER,
  xlabel: 'ID'
}

const timestamps = {
  _created_at: {
    type: Sequelize.DATE,
    allowNull: false,
    xlabel: 'Created At',
    defaultValue: Sequelize.NOW
  },
  _updated_at: {
    type: Sequelize.DATE,
    xlabel: 'Updated At',
  }
}

function setTimestamps (fields) {
  return Object.assign(fields, timestamps);
}

module.exports = {
  pk,
  setTimestamps
}