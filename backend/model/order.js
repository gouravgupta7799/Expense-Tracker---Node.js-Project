const Sequelize = require('sequelize');
const sequelize = require('../utils/DataBase');

const Order = sequelize.define('order', {

  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true
  },
  paymantId: Sequelize.STRING,
  orderId: Sequelize.STRING,
  status: Sequelize.STRING
});

module.exports = Order;