const express = require('express');
const router = express.Router();
const {updateAttendanceByID, createAttendance, deleteAttendanceByID, getAttendanceById, getAttendances, getAttendancesByEmployeeId} = require('../controllers/attendance.controller')
const {verifyToken} = require('@softzone/common');
router.route('/api/attendances/get').get(verifyToken, getAttendances);
router.route('/api/attendances/get/id').get(verifyToken, getAttendanceById);
router.route('/api/attendances/get/employee_id').get(verifyToken, getAttendancesByEmployeeId);
router.route('/api/attendances/update/id').post(verifyToken, updateAttendanceByID);
router.route('/api/attendances/create').post(verifyToken, createAttendance);
router.route('/api/attendances/delete/id').post(verifyToken, deleteAttendanceByID);

export { router as attendanceRouter };