const express = require('express');
const router = express.Router();
const authController = require('./authController');
const { verifyToken } = require('./authMiddleware');


router.post('/register', authController.registerUser);

router.post('/login', authController.loginUser);

router.post('/send-reset-email', authController.sendResetEmail);

router.post('/reset', authController.resetPassword);

router.post('/change-password/:userID', verifyToken, authController.changePassword);


module.exports = router;