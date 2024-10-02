// src/data/models/userRoles.js
const { DataTypes } = require('sequelize');
const sequelize = require('../connection');
const Users = require('./user');
const Roles = require('./role');

const UserRoles = sequelize.define('UserRoles', {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: Users,
      key: 'id',
    },
  },
  roleId: {
    type: DataTypes.INTEGER,
    references: {
      model: Roles,
      key: 'id',
    },
  },
});


module.exports = UserRoles;
