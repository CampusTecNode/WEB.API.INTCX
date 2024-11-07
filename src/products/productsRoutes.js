// src/routes/products.js
const express = require('express');
const router = express.Router();
const productsController = require('./productsController');
const { verifyRole } = require('../auth/authMiddleware');

router.get('/', productsController.Get);

router.get('/:id', productsController.GetByID);

router.post('/', verifyRole('admin'), productsController.Create);

router.put('/:id', productsController.Update);

router.delete('/:id', productsController.Delete);

module.exports = router;
