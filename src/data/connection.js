const { Sequelize } = require('sequelize');

const database = "INTEConnect";
const username = "postgres";
const password = "Davidelias08";
const host = "localhost";
class Connection {
    constructor() {
        if (!this.instance) {
            this._sequelize =  new Sequelize(database, username, password, {
                host: host,
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
