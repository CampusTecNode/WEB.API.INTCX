// src/data/models/roles.js
const { DataTypes } = require('sequelize');
const sequelize = require('../connection');

const Roles = sequelize.define('Roles', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Roles;
