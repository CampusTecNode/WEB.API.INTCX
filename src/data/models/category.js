// models/categories.js
const { DataTypes } = require('sequelize');
const sequelize = require('../connection'); 

const Categories = sequelize.define('Categories', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, 
  },
  Name: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
  Description: {
    type: DataTypes.STRING,
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
  tableName: 'Categories', 
  timestamps: false, 
});

module.exports = Categories;
