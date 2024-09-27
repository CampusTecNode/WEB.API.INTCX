// models/index.js
const sequelize = require('../connection');
const Products = require('./products/products');
const Categories = require('./categories/categories');

Categories.hasMany(Products, { foreignKey: 'CategoryID' });
Products.belongsTo(Categories, { foreignKey: 'CategoryID' });

module.exports = {
  sequelize,
  Products,
  Categories,
};