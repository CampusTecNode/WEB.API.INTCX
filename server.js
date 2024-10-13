const app = require('./app');
const sequelize = require('./src/data/connection');
const seedDatabase = require('./src/data/seeder');

const port = process.env.PORT || 3000;

async function initializeApp() {
  try {
    // Sincroniza todos los modelos con la base de datos
    await sequelize.sync(); 
    console.log('Tablas creadas exitosamente.');

    // if (process.env.NODE_ENV === 'development') {
    //   await seedDatabase();
    // }
    
    app.listen(port, () => {
        console.log(`Servidor escuchando en el puerto ${port}`);
    });

  } catch (error) {
    console.error('Error creando las tablas:', error);
  }
}

initializeApp();

