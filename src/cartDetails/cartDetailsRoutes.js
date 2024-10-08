const express = require('express');
const router = express.Router();
const cartDetailsController = require('./cartDetailsController');
const { verifyToken } = require('../auth/authMiddleware');

// Crear o actualizar un detalle del carrito (Upsert)
router.post('/upsert', verifyToken, cartDetailsController.upsertCartDetails);

// Obtener detalles del carrito
router.get('/:cartID', verifyToken, cartDetailsController.getCartDetails);

module.exports = router;
