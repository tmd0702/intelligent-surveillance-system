const express = require('express');
const router = express.Router();
const {updateCameraByID, getCameraById, getCameras, deleteCameraByID, createCamera} = require('../controllers/camera.controller');
const {verifyToken} = require('@softzone/common');

router.route('/api/cameras/get').get(verifyToken, getCameras);
router.route('/api/cameras/get/id').get(verifyToken, getCameraById);
router.route('/api/cameras/update/id').post(verifyToken, updateCameraByID);
router.route('/api/cameras/create').post(verifyToken, createCamera);
router.route('/api/cameras/delete/id').post(verifyToken, deleteCameraByID);

export { router as cameraRouter };