const express = require('express');
const router = express.Router();
const {updateTransactionByID, getTransactionById, getTransactions, createTransaction, deleteTransactionByID} = require('../controllers/transaction.controller')
const {verifyToken} = require('@softzone/common');
router.route('/api/transactions/get').get(verifyToken, getTransactions);
router.route('/api/transactions/get/id').get(verifyToken, getTransactionById);
router.route('/api/transactions/update/id').post(verifyToken, updateTransactionByID);
router.route('/api/transactions/create').post(verifyToken, createTransaction);
router.route('/api/transactions/delete/id').post(verifyToken, deleteTransactionByID);

export { router as transactionRouter };