const express = require('express');
const router = express.Router();
const likesController = require('./likesController');
const { verifyToken } = require('../auth/authMiddleware');

router.post('/like', verifyToken, likesController.likeProduct);

router.post('/unlike', verifyToken, likesController.unlikeProduct);

router.get('/:userID/liked-products', verifyToken, likesController.getLikedProducts);

module.exports = router;