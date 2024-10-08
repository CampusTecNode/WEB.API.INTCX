const { DataTypes } = require('sequelize');
const sequelize = require('../data/connection');

const ShoppingCart = sequelize.define('ShoppingCart', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  UserID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users', // Asegúrate de que el modelo de Users esté definido
      key: 'id',
    },
  },
  CartStatusID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'CartStatus', // El modelo de CartStatus
      key: 'ID',
    },
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
  tableName: 'ShoppingCart', 
  timestamps: false,
});

module.exports = ShoppingCart;
