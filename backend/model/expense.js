const Sequelize = require('sequelize');

const sequelize = require('../utils/DataBase');

const Expense = sequelize.define('expense', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true
  },
  Description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Price: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  Category: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});

module.exports = Expense;