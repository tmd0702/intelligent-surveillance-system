const express = require('express');
const router = express.Router();
const {updateStoreByID, getStoreById, getStores, deleteStoreByID} = require('../controllers/store.controller')
const {verifyToken} = require('@softzone/common');
router.route('/api/stores/get').get(verifyToken, getStores);
router.route('/api/stores/get/id').get(verifyToken, getStoreById);
router.route('/api/stores/update/id').post(verifyToken, updateStoreByID);
router.route('/api/stores/delete/id').post(verifyToken, deleteStoreByID);

export { router as storeRouter };