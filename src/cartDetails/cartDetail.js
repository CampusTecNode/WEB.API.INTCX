const { DataTypes } = require('sequelize');
const sequelize = require('../data/connection');

const CartDetails = sequelize.define('CartDetails', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  CartID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'ShoppingCart', // Asegúrate de que ShoppingCart esté definido
      key: 'ID',
    },
  },
  ProductID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Products', // Asegúrate de que Products esté definido
      key: 'ID',
    },
  },
  Quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  UnitPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
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
  tableName: 'CartDetails',
  timestamps: false,
});

module.exports = CartDetails;
