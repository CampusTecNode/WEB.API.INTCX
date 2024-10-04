// imports
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json'); // 

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const app = express();


// Routes
const categoriesRoutes = require('./src/categories/categoriesRoutes');
const productsRoutes = require('./src/products/productsRoutes');
const paymentMethodsRoutes = require('./src/paymentMethods/paymentMethodsRoutes');
// const ordersRoutes = require('./src/orders/ordersRoutes');
// const orderDetailsRoutes = require('./src/orderDetails/orderDetailsRoutes');
// const orderStatusRoutes = require('./src/orderStatus/orderStatusRoutes');
const authRoutes = require('./src/auth/authRoutes');
// TODO: Use verifyRole middleware
const { verifyToken } = require('./src/auth/authMiddleware');


app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

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
app.use('/paymentMethods', verifyToken, paymentMethodsRoutes);
// app.use('/orders', verifyToken, ordersRoutes);
// app.use('/orderDetails', verifyToken, orderDetailsRoutes);
// app.use('/orderStatus', verifyToken, orderStatusRoutes);


module.exports = app;