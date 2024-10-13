const express = require('express');
const router = express.Router();
const reservationsController = require('./reservationsController');

router.post('/', reservationsController.CreateReservation);

router.delete('/cancel/:UserID', reservationsController.CancelReservationByUser);

router.get('/user/:UserID', reservationsController.GetReservationsByUser);

module.exports = router;
