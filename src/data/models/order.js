const { DataTypes } = require('sequelize');
const sequelize = require('../connection');


const Orders = sequelize.define('Orders', {
    ID:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    UserID:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id',
        } 
    },
    Date:{
        type: DataTypes.DATE,
        allowNull: false,
    },
    Total:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
    },
    StateID:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'OrderStatus',
            key: 'ID',
        }
    },
    PaymentMethodID:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'PaymentMethods',
            key: 'ID',
        }
    },
    CartID:{
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
          model: 'ShoppingCart',
          key: 'ID',
      }
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
},{
    tableName:'Orders',
    timestamps: false,
});

module.exports = Orders;