const express = require('express');
const router = express.Router();
const {updateTicketByID, getTickets, getTicketById, deleteTicketByID, createTicket} = require('../controllers/ticket.controller')
const {verifyToken} = require('@softzone/common');
router.route('/api/parking-tickets/get').get(verifyToken, getTickets);
router.route('/api/parking-tickets/get/id').get(verifyToken, getTicketById);
router.route('/api/parking-tickets/update/id').post(verifyToken, updateTicketByID);
router.route('/api/parking-tickets/create').post(verifyToken, createTicket);
router.route('/api/parking-tickets/delete/id').post(verifyToken, deleteTicketByID);

export { router as ticketRouter };