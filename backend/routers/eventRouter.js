const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const { authenticateToken } = require('../services/signInService');

router.get('/', eventController.getAllEvents);
router.get('/:id', eventController.getEventById);
router.get('/:id/userAmount', eventController.getUserAmountbyEventId);
router.post('/', authenticateToken, eventController.createEvent);


module.exports = router;