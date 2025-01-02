const express = require('express');
const router = express.Router();
const {trackByPhoneNumber, trackById, trackByEmail, trackByFaceId, getUserByFaceId} = require('../controllers/tracking.controller')
const {verifyToken} = require('@softzone/common');
router.route('/api/tracking/get/face_id').get(verifyToken, trackByFaceId);
router.route('/api/tracking/get/id').get(verifyToken, trackById);
router.route('/api/tracking/get/phone_number').get(verifyToken, trackByPhoneNumber);
router.route('/api/tracking/get/email').get(verifyToken, trackByEmail);
router.route('/api/tracking/user/get/face_id').post(verifyToken, getUserByFaceId);

export { router as trackingRouter };