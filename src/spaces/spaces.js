const { DataTypes } = require('sequelize');
const sequelize = require('../data/connection');

const Spaces = sequelize.define('Spaces', {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    Description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    Capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Type: {
        type: DataTypes.ENUM('PingPong', 'Cubiculo', 'Parcela'),
        allowNull: false,
    },
    Location: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    Available: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
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
    tableName: 'Spaces',
    timestamps: false,
});

module.exports = Spaces;
