const { Sequelize } = require('sequelize');

const database = "INTEConnect";
const username = "postgres";
const password = "Davidelias08";
const host = "localhost";

const sequelize = new Sequelize(database, username, password, {
    host: host,
    dialect: 'postgres'
});

module.exports = sequelize;
