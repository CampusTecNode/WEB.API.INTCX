// imports
const express = require('express');
const app = express();
const port = 3000;
const sequelize = require('./src/data/connection');
const { Categories } = require('./src/data/models/categories/categories');

app.use(express.json());

app.get('/', (req, res) => {    
  res.json(
      {
          "Title": "Hola mundo"
      }
  );
});

app.get('/categories', async (req, res) => {
  try {
    const categories = await Categories.findAll({
      include: [
        {
          model: Categories,
          as: 'Categories',
          attributes: ['Id', 'Name', 'Description',],
        },
      ],
    })
    return res.json({ categories });
  } catch (error) {
    console.log('Error', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

async function initializeDatabase() {
  try {
    // Sincroniza todos los modelos con la base de datos
    await sequelize.sync({ force: true }); // { force: true } recreará las tablas cada vez que corras la aplicación, úsalo solo para desarrollo
    console.log('Tablas creadas exitosamente.');
  } catch (error) {
    console.error('Error creando las tablas:', error);
  }
}

initializeDatabase(); // Llama a la función para inicializar la base de datos

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});