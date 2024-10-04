const { DataTypes } = require('sequelize');
const sequelize = require('../connection');

const OrderDetails = sequelize.define('OrderDetails', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  OrderID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Orders', // nombre de la tabla Orders
      key: 'ID',
    },
  },
  ProductID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Products', // nombre de la tabla Products
      key: 'ID',
    },
  },
  Count: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  UnitPrice: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  CreatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  CreatedBy: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'System',
  },
  UpdatedAt: {
    type: DataTypes.DATE,
  },
  UpdatedBy: {
    type: DataTypes.STRING,
    defaultValue: 'System',
  },
  DeletedAt: {
    type: DataTypes.DATE,
  },
  DeletedBy: {
    type: DataTypes.STRING,
  },
}, {
  paranoid: true,  
});

module.exports = OrderDetails;
