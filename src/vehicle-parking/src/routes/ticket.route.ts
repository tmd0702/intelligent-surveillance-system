const express = require('express');
const router = express.Router();
const {updateTicketByID, getTickets, getTicketById, deleteTicketByID, createTicket, checkIn, checkOut} = require('../controllers/ticket.controller')
const {verifyToken} = require('@softzone/common');
router.route('/api/vehicle_parking/tickets/get').get(verifyToken, getTickets);
router.route('/api/vehicle_parking/tickets/get/id').get(verifyToken, getTicketById);
router.route('/api/vehicle_parking/tickets/update/id').post(verifyToken, updateTicketByID);
router.route('/api/vehicle_parking/tickets/create').post(verifyToken, createTicket);
router.route('/api/vehicle_parking/checkin').post(verifyToken, checkIn);
router.route('/api/vehicle_parking/checkout').post(verifyToken, checkOut);
router.route('/api/vehicle_parking/tickets/delete/id').post(verifyToken, deleteTicketByID);

export { router as ticketRouter };