// models/index.js
const sequelize = require('../connection');
const Products = require('./product');
const Categories = require('./category');
const Orders = require('./order');
const OrderStatus = require('./orderState');
const PaymentMethods = require('./paymentMethod');


require('../middlewares/updateMiddleware')(sequelize);

Categories.hasMany(Products, { foreignKey: 'CategoryID' });
Products.belongsTo(Categories, { foreignKey: 'CategoryID' });

module.exports = {
  sequelize,
  Products,
  Categories,
  Orders,
  OrderStatus,
  PaymentMethods
};