const express = require('express');
const router = express.Router();
const {updateDepartmentByID, getDepartmentById, getDepartments, deleteDepartmentByID, createDepartment} = require('../controllers/department.controller')
const {verifyToken} = require('@softzone/common');
router.route('/api/departments/get').get(verifyToken, getDepartments);
router.route('/api/departments/get/id').get(verifyToken, getDepartmentById);
router.route('/api/departments/update/id').post(verifyToken, updateDepartmentByID);
router.route('/api/departments/create').post(verifyToken, createDepartment);
router.route('/api/departments/delete/id').post(verifyToken, deleteDepartmentByID);

export { router as departmentRouter };