const express = require('express');
const router = express.Router();
const orderDetailController = require('../controllers/OrderDetailController');
const { verifyToken } = require('../auth/authMiddleware');

// Definir las rutas
router.get('/', verifyToken, orderDetailController.Get);
router.get('/:id', verifyToken, orderDetailController.GetByID);
router.post('/', verifyToken, orderDetailController.Create);
router.put('/:id', verifyToken, orderDetailController.Update);
router.delete('/:id', verifyToken, orderDetailController.Delete);

module.exports = router;
