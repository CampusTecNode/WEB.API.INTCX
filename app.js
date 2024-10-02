// imports
const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Routes
const categoriesRoutes = require('./src/categories/categoriesRoutes');
const productsRoutes = require('./src/products/productsRoutes');
const paymentMethodsRoutes = require('./src/paymentMethods/paymentMethodsRoutes');
const authRoutes = require('./src/routes/auth');
// TODO: Use verifyRole middleware
const { verifyToken } = require('./src/auth/authMiddleware');


app.use(express.json());

app.get('/', (req, res) => {    
  res.json(
      {
          "Title": "Hola mundo"
      }
  );
});

app.use('/auth', authRoutes);

app.use('/categories', verifyToken, categoriesRoutes);
app.use('/products', verifyToken, productsRoutes);
app.use('/paymentMethods', verifyToken, paymentMethodsRoutes)

// Configure Database
const sequelize = require('./src/data/connection');

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