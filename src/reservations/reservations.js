const { DataTypes } = require('sequelize');
const sequelize = require('../data/connection');

const Reservations = sequelize.define('Reservations', {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    UserID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id',
        }
    },
    SpaceID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Spaces',
            key: 'ID',
        }
    },
    ReservationDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    StartTime: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    EndTime: {
        type: DataTypes.TIME,
        allowNull: false,
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
    }
}, {
    tableName: 'Reservations',
    timestamps: false,
});

module.exports = Reservations;
