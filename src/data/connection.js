const { Sequelize } = require('sequelize');
require('dotenv').config();

class Connection {
    constructor() {
        if (!this.instance) {
            this._sequelize =  new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.PASSWORD, {
                host: process.env.DB_HOST,
                dialect: 'postgres'
            });
            Connection.instance = this;
        }
        return Connection.instance;
    }

    getSequelizeInstance() {
        return this._sequelize;
    }
}


const instance = new Connection();
Object.freeze(instance); // Evita modificaciones a la instancia

module.exports = instance.getSequelizeInstance();
