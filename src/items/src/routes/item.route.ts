const express = require('express');
const router = express.Router();
const {updateItemByID, createItem, getItemById, getItems, deleteItemByID} = require('../controllers/item.controller')
const {verifyToken} = require('@softzone/common');
router.route('/api/items/get').get(verifyToken, getItems);
router.route('/api/items/get/id').get(verifyToken, getItemById);
router.route('/api/items/update/id').post(verifyToken, updateItemByID);
router.route('/api/items/delete/id').post(verifyToken, deleteItemByID);
router.route('/api/items/create').post(verifyToken, createItem);

export { router as itemRouter };