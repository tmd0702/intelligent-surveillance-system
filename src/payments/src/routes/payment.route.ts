
const express = require('express');
const router = express.Router();
const {getPaymentById, getPaymentsByUserId, createPayment} = require('../controllers/payment.controller')
const {verifyToken} = require('@softzone/common');

router.route('/api/payments/get/id').get(verifyToken, getPaymentById);
router.route('/api/payments/get/user_id').get(verifyToken, getPaymentsByUserId);
router.route('/api/payments/create').post(verifyToken, createPayment);

export { router as paymentRouter };