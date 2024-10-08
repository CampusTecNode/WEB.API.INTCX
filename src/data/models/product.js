// models/product.js
const { DataTypes } = require('sequelize');
const sequelize = require('../connection'); 

const Products = sequelize.define('Products', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  SKU: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Description: {
    type: DataTypes.STRING,
    allowNull: true, 
  },
  Price: {
    type: DataTypes.DECIMAL(10, 2), 
    allowNull: false,
  },
  Stock: {
    type: DataTypes.INTEGER, 
    allowNull: false,
  },
  CategoryID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Categories', 
      key: 'ID', 
    }
  },
  Color: {
    type: DataTypes.STRING,
    allowNull: true, 
  },
  Brand: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Weight: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  Size: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  ExpirityDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  ImageURL: {
    type: DataTypes.STRING,
    allowNull: true, 
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
  tableName: 'Products', 
  timestamps: false, 
});

module.exports = Products;
