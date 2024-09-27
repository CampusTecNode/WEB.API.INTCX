// models/categories.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../connection'); 

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
}, {
  tableName: 'Categories', 
  timestamps: false, 
});

module.exports = Categories;
