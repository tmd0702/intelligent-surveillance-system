
const express = require('express');
const router = express.Router();
const {getPaymentById, getPaymentsByUserId, createPayment, countSales, todayRevenue} = require('../controllers/payment.controller')
const {verifyToken} = require('@softzone/common');

router.route('/api/payments/get/id').get(verifyToken, getPaymentById);
router.route('/api/payments/get/user_id').get(verifyToken, getPaymentsByUserId);
router.route('/api/payments/create').post(verifyToken, createPayment);
router.route('/api/payments/sales/count').get(verifyToken, countSales);
router.route('/api/payments/today-revenue').get(verifyToken, todayRevenue);

export { router as paymentRouter };