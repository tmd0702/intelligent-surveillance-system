const express = require('express');
const router = express.Router();
const {getWalletByUserId, getWalletById, deposit} = require('../controllers/wallet.controller')
const {verifyToken} = require('@softzone/common');
router.route('/api/wallets/get/user_id').get(verifyToken, getWalletByUserId);
router.route('/api/wallets/deposit').post(verifyToken, deposit);
router.route('/api/wallets/get/id').get(verifyToken, getWalletById);

export { router as walletRouter };