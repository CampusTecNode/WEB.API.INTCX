const express = require('express');
const router = express.Router();
const orderStatusController = require('./orderStatusController');

router.get('/', orderStatusController.Get);

router.post('/', orderStatusController.Create);

router.get('/:id', orderStatusController.GetByID);

router.put('/:id', orderStatusController.Update);

router.delete('/:id', orderStatusController.Delete);

module.exports = router;
