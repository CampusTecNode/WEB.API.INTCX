// src/routes/products.js
const express = require('express');
const router = express.Router();
const notificationsController = require('./notificationsController');

router.get('/:userID', notificationsController.GetByUser);

router.post('/', notificationsController.Create);

module.exports = router;
