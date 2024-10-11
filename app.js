// imports
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json'); 
const cors = require('cors'); 

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const app = express();

app.use(cors());
// Routes
const categoriesRoutes = require('./src/categories/categoriesRoutes');
const productsRoutes = require('./src/products/productsRoutes');
const paymentMethodsRoutes = require('./src/paymentMethods/paymentMethodsRoutes');
const ordersRoutes = require('./src/orders/orderRoutes');
const orderStatusRoutes = require('./src/orderStatus/orderStatusRoutes');
const authRoutes = require('./src/auth/authRoutes');
const likesRoutes = require('./src/likes/likesRoutes');
const cartStatusRoutes = require('./src/cartStatus/cartStatusRoutes');
const shoppingCart = require('./src/shoppingCart/shoppingCartRoutes');
const notifications = require('./src/notifications/notificationsRoutes')
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
app.use('/orders', verifyToken, ordersRoutes);
app.use('/orderStatus', verifyToken, orderStatusRoutes);
app.use('/likes', verifyToken, likesRoutes);
app.use('/cartStatus', verifyToken, cartStatusRoutes);
app.use('/shoppingCart', verifyToken, shoppingCart);
app.use('/notifications', verifyToken, notifications);

module.exports = app;