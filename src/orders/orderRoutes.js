const express = require('express');
const router = express.Router();
const ordersController = require('./ordersController');

router.get('/', ordersController.Get);

router.get('/user/:userID', ordersController.GetOrdersByUser);

router.post('/', ordersController.CreateOrderFromCart);

router.delete('/:id', ordersController.Delete);

module.exports = router;
