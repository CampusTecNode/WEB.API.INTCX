const express = require('express');
const router = express.Router();
const categoriesController = require('./categoriesController');

router.get('/', categoriesController.Get);

router.post('/', categoriesController.Create);

router.get('/:id', categoriesController.GetByID);

router.put('/:id', categoriesController.Update);

router.delete('/:id', categoriesController.Delete);

module.exports = router;
