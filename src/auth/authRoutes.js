const express = require('express');
const router = express.Router();
const authController = require('./authController');

// Ruta para registrar usuarios
router.post('/register', authController.registerUser);

// Ruta para iniciar sesión
router.post('/login', authController.loginUser);

module.exports = router;