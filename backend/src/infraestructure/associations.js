'use strict';

module.exports = function associations (models) {
  const {
    pizzas,
    toppings,
    toppingsPizza
  } = models;

  toppingsPizza.belongsTo(pizzas, { foreignKey: { name: 'id_pizza', allowNull: false }, as: 'pizza' })
  pizzas.hasMany(toppingsPizza, { foreignKey: { name: 'id_pizza', allowNull: false } })

  toppingsPizza.belongsTo(toppings, { foreignKey: { name: 'id_topping', allowNull: false }, as: 'topping' })
  toppings.hasMany(toppingsPizza, { foreignKey: { name: 'id_topping', allowNull: false } })

  return models;
}