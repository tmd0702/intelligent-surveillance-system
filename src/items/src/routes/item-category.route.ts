const express = require('express');
const router = express.Router();
const {updateCategoryByID, getCategories, getCategoryById, deleteCategoryByID, createCategory} = require('../controllers/item-category.controller')
const {verifyToken} = require('@softzone/common');
router.route('/api/items/categories/get').get(verifyToken, getCategories);
router.route('/api/items/categories/get/id').get(verifyToken, getCategoryById);
router.route('/api/items/categories/update/id').post(verifyToken, updateCategoryByID);
router.route('/api/items/categories/create').post(verifyToken, createCategory);
router.route('/api/items/categories/delete/id').post(verifyToken, deleteCategoryByID);

export { router as categoryRouter };