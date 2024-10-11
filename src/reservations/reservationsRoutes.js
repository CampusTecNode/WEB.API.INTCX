const express = require('express');
const router = express.Router();
const reservationsController = require('./reservationsController');

router.post('/reservations', reservationsController.CreateReservation);
router.delete('/reservations/cancel/:UserID', reservationsController.CancelReservationByUser);
router.get('/reservations/user/:UserID', reservationsController.GetReservationsByUser);

module.exports = router;
