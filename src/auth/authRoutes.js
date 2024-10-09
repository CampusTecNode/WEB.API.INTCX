const express = require('express');
const router = express.Router();
const authController = require('./authController');

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Endpoints related to authentication and authorization
 */


/**
 * @swagger
 * /register:
 *   post:
 *     summary: Allow to register in the app
 *     tags: [Auth]
 *     responses:
 *       201:
 *         description: List of categories
 */
router.post('/register', authController.registerUser);


/**
 * @swagger
 * /login
 *   post:
 *     summary: Allows the user to gets in to the PC
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: A JWT for login
 */
router.post('/login', authController.loginUser);

module.exports = router;