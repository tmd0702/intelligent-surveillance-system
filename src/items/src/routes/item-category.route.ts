const express = require('express');
const router = express.Router();
const {updatecategoryByID, getcategoryById, getcategorys, deletecategoryByID, createcategory} = require('../controllers/category-category.controller.controller')
const {verifyToken} = require('@softzone/common');
router.route('/api/categorys/get').get(verifyToken, getcategorys);
router.route('/api/categorys/get/id').get(verifyToken, getcategoryById);
router.route('/api/categorys/update/id').post(verifyToken, updatecategoryByID);
router.route('/api/categorys/create').post(verifyToken, createcategory);
router.route('/api/categorys/delete/id').post(verifyToken, deletecategoryByID);

export { router as categoryRouter };