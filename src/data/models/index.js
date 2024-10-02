// models/index.js
const sequelize = require('../connection');
const Products = require('./product');
const Categories = require('./category');
const Orders = require('./order');
const OrderStatus = require('./orderState');
const PaymentMethods = require('./paymentMethod');
const Users = require('./user');
const Roles = require('./role');
const UserRoles = require('./userRole');


require('../middlewares/updateMiddleware')(sequelize);

Categories.hasMany(Products, { foreignKey: 'CategoryID' });
Products.belongsTo(Categories, { foreignKey: 'CategoryID' });

Users.belongsToMany(Roles, { through: UserRoles, foreignKey: 'userId' });
Roles.belongsToMany(Users, { through: UserRoles, foreignKey: 'roleId' });

module.exports = {
  sequelize,
  Products,
  Categories,
  Orders,
  OrderStatus,
  PaymentMethods,
  Users,
  Roles,
  UserRoles,
};