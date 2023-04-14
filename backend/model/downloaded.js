
const Sequelize = require('sequelize');

const sequelize = require('../utils/DataBase');

let Downloaded = sequelize.define('downloaded', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true
  },
  URL: {
    type: Sequelize.STRING,
    allowNull: false,
  }
})

module.exports = Downloaded;