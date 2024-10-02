const express = require('express');
const router = express.Router();
const {updateEmployeeByID, createEmployee, deleteEmployeeByID, getEmployeeById, getEmployees} = require('../controllers/employee.controller')
const {verifyToken} = require('@softzone/common');
router.route('/api/employees/get').get(verifyToken, getEmployees);
router.route('/api/employees/get/id').get(verifyToken, getEmployeeById);
router.route('/api/employees/update/id').post(verifyToken, updateEmployeeByID);
router.route('/api/employees/create').post(verifyToken, createEmployee);
router.route('/api/employees/delete/id').post(verifyToken, deleteEmployeeByID);

export { router as employeeRouter };