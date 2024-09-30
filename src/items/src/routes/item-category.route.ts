const express = require('express');
const router = express.Router();
const {updateCategoryByID, getCategories, getCategoryById, deleteCategoryByID, createCategory} = require('../controllers/item-category.controller')
const {verifyToken} = require('@softzone/common');
router.route('/api/item/categories/get').get(verifyToken, getCategories);
router.route('/api/item/categories/get/id').get(verifyToken, getCategoryById);
router.route('/api/item/categories/update/id').post(verifyToken, updateCategoryByID);
router.route('/api/item/categories/create').post(verifyToken, createCategory);
router.route('/api/item/categories/delete/id').post(verifyToken, deleteCategoryByID);

export { router as categoryRouter };