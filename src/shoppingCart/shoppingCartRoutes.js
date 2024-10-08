const express = require('express');
const router = express.Router();
const shoppingCartController = require('./shoppingCartController');
const { verifyToken } = require('../auth/authMiddleware');

// Crear un carrito de compras
router.post('/', verifyToken, shoppingCartController.Create);

// Obtener carritos de un usuario
router.get('/user/:userID', verifyToken, shoppingCartController.GetByUser);

// Actualizar el estado del carrito
router.put('/:id', verifyToken, shoppingCartController.Update);

// Borrado lógico de un carrito
router.delete('/:id', verifyToken, shoppingCartController.Delete);

module.exports = router;
