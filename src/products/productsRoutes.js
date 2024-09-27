// src/routes/products.js
const express = require('express');
const router = express.Router();
const productsController = require('./productsController');

router.get('/', productsController.Get);

router.get('/:id', productsController.GetByID);

router.post('/', productsController.Create);

router.put('/:id', productsController.Update);

router.delete('/:id', productsController.Delete);

module.exports = router;
