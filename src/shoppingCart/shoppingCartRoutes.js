const express = require('express');
const router = express.Router();
const shoppingCartController = require('./shoppingCartController');
const { verifyToken } = require('../auth/authMiddleware');

router.post('/', verifyToken, shoppingCartController.AddToCart);
router.get('/user/:userID', verifyToken, shoppingCartController.GetByUser);
router.delete('/:cartID/:productID', verifyToken, shoppingCartController.DeleteCartItem);

module.exports = router;
