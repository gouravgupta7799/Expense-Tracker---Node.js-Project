
const Sequelize = require('sequelize');
const sequelize = require('../utils/DataBase');

const forgetPassword = sequelize.define('forgetpassword', {
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
    unique: true
  },
  isValid: Sequelize.BOOLEAN
});

module.exports = forgetPassword;