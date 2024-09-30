const express = require('express');
const router = express.Router();
const ordersController = require('./ordersController');

router.get('/', ordersController.Get);

router.post('/', ordersController.Create);

router.get('/:id', ordersController.GetByID);

router.put('/:id', ordersController.Update);

router.delete('/:id', ordersController.Delete);

module.exports = router;
