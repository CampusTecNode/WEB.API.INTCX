// imports
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json'); 
const bodyParser = require('body-parser');
const cors = require('cors'); 

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


const app = express();

app.use(bodyParser.json());

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

app.post('/create-payment-intent', async (req, res) => {
  const { amount, currency, customer } = req.body; // Aquí puedes recibir la cantidad y la moneda desde el frontend

  try {
    // Crear un PaymentIntent con el monto y la moneda
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // El monto debe estar en la unidad más pequeña de la moneda (ej. centavos)
      currency: currency,
      customer: customer,
      payment_method_types: ['card'], // Métodos de pago aceptados
    });

    // Enviar el client secret al frontend para completar el pago
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});


app.post('/webhook', bodyParser.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature'];

  try {
    const event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    
    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object;
      console.log('Pago exitoso', paymentIntent.id);
    }

    res.json({ received: true });
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
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