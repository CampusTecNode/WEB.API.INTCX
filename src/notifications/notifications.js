const { DataTypes } = require('sequelize');
const sequelize = require('../data/connection'); 

const Notifications = sequelize.define('Notifications', {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    UserID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',  // Relación con la tabla de usuarios
            key: 'id',
        },
    },
    Title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Message: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    Type: {
        type: DataTypes.STRING,
        allowNull: false, // Por ejemplo: 'info', 'warning', 'error'
    },
    IsRead: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    CreatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    CreatedBy: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'System',
    },
    UpdatedAt: {
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
    tableName: 'Notifications',
    timestamps: false,
});

module.exports = Notifications;
