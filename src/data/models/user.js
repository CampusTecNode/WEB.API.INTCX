// src/data/models/users.js
const { DataTypes } = require('sequelize');
const sequelize = require('../connection');

const Users = sequelize.define('Users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  emailConfirmed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true, 
  },
  phoneConfirmed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  CreatedAt:{
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  CreatedBy: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'System',
  },
  UpdatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  UpdatedBy: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'System',
  },
  DeletedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  DeletedBy: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Users;
