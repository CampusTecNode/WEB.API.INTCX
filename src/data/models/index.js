// models/index.js
const sequelize = require('../connection');
const Products = require('./product');
const Categories = require('./category');
const Orders = require('./order');
const OrderStatus = require('./orderStatus');
const PaymentMethods = require('./paymentMethod');
const Users = require('./user');
const Roles = require('./role');
const UserRoles = require('./userRole');
const UserLikedProducts = require('./UserLikedProducts');

require('../middlewares/updateMiddleware')(sequelize);

Categories.hasMany(Products, { foreignKey: 'CategoryID', as: 'Products' });
Products.belongsTo(Categories, { foreignKey: 'CategoryID', as: 'Category' });

Users.belongsToMany(Roles, { through: UserRoles, foreignKey: 'userId' });
Roles.belongsToMany(Users, { through: UserRoles, foreignKey: 'roleId' });

Users.belongsToMany(Products, {
    through: UserLikedProducts,
    foreignKey: 'UserID', 
});

Products.belongsToMany(Users, { 
  through: UserLikedProducts, 
  foreignKey: 'ProductID', 
});

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
  UserLikedProducts
};