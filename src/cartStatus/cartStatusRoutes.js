const express = require('express');
const router = express.Router();
const cartStatusController = require('./cartStatusController');

router.get('/', cartStatusController.Get);

router.post('/', cartStatusController.Create);

router.get('/:id', cartStatusController.GetByID);

router.put('/:id', cartStatusController.Update);

router.delete('/:id', cartStatusController.Delete);

module.exports = router;
