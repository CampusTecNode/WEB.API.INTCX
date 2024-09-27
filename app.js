// imports
const express = require('express');
const app = express();
const port = 3000;
const sequelize = require('./src/data/connection');


const categoriesRoutes = require('./src/categories/categoriesRoutes');
const productsRoutes = require('./src/products/productsRoutes');



app.use(express.json());

app.get('/', (req, res) => {    
  res.json(
      {
          "Title": "Hola mundo"
      }
  );
});

app.use('/categories', categoriesRoutes);

app.use('/products', productsRoutes);


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