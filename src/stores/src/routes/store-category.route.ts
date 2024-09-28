const express = require('express');
const router = express.Router();
const {updateCategoryByID, getCategoryById, getCategories, deleteCategoryByID, createCategory} = require('../controllers/store-category.controller');
const {verifyToken} = require('@softzone/common');

router.route('/api/stores/categories/get').get(verifyToken, getCategories);
router.route('/api/stores/categories/get/id').get(verifyToken, getCategoryById);
router.route('/api/stores/categories/update/id').post(verifyToken, updateCategoryByID);
router.route('/api/stores/categories/create').post(verifyToken, createCategory);
router.route('/api/stores/categories/delete/id').post(verifyToken, deleteCategoryByID);

export { router as storeCategoryRouter };