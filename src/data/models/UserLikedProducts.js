const { DataTypes } = require('sequelize');
const sequelize = require('../connection');

const UserLikedProducts = sequelize.define('UserLikedProducts', {
    UserID:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references:{
            model: 'Users',
            key: 'id',
        }
    },
    ProductID:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references:{
            model: 'Products',
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
    tableName: 'UserLikedProducts',
    timestamps: false,
});

module.exports = UserLikedProducts;