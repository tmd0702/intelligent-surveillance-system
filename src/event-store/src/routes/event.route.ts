const express = require('express');
const router = express.Router();
const {getEvents, getEventsInRange} = require('../controllers/event.controller')
const {verifyToken} = require('@softzone/common');
router.route('/api/event-store/get').get(verifyToken, getEvents);
router.route('/api/event-store/get/range').get(verifyToken, getEventsInRange);

export { router as eventRouter };