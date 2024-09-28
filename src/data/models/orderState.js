// models/OrderStatus.js
const { DataTypes } = require('sequelize');
const sequelize = require('../connection'); 

const OrderStatus = sequelize.define('OrderStatus', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, 
  },
  Name: {
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
  UpdatedAt:{
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  UpdatedBy: {
    type: DataTypes.STRING,
    allowNull: false,
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
}, {
  tableName: 'OrderStatus', 
  timestamps: false, 
});

module.exports = OrderStatus;
