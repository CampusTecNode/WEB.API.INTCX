const { Sequelize } = require('sequelize');
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

class Connection {
    constructor() {
        if (!this.instance) {
            this._sequelize =  new Sequelize(process.env.DATABASE_URL, {
                dialect: 'postgres',
                dialectOptions: {
                    ssl: {
                        require: true,
                        rejectUnauthorized: false,
                },
            }
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
