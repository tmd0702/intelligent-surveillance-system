const express = require('express');
const router = express.Router();
const {updateOrderByID, getOrders, getOrderById, deleteOrderByID, createOrder, getItemsByOrderId} = require('../controllers/order.controller')
const {verifyToken} = require('@softzone/common');

router.route('/api/orders/get').get(verifyToken, getOrders);
router.route('/api/orders/get/id').get(verifyToken, getOrderById);
router.route('/api/orders/update/id').post(verifyToken, updateOrderByID);
router.route('/api/orders/delete/id').post(verifyToken, deleteOrderByID);
router.route('/api/orders/create').post(verifyToken, createOrder);
router.route('/api/orders/items/get/id').get(verifyToken, getItemsByOrderId);

export { router as storeRouter };