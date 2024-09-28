const express = require('express');
const router = express.Router();
const paymentMethodsController = require('./paymentMethodsController');

router.get('/', paymentMethodsController.Get);

router.post('/', paymentMethodsController.Create);

router.get('/:id', paymentMethodsController.GetByID);

router.put('/:id', paymentMethodsController.Update);

router.delete('/:id', paymentMethodsController.Delete);

module.exports = router;
