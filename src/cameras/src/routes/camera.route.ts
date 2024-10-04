const express = require('express');
const router = express.Router();
const {updateCameraByID, getCameraById, getCameras, deleteCameraByID, createCamera} = require('../controllers/camera.controller');
const {verifyToken} = require('@softzone/common');

router.route('/api/cameras/categories/get').get(verifyToken, getCameras);
router.route('/api/cameras/categories/get/id').get(verifyToken, getCameraById);
router.route('/api/cameras/categories/update/id').post(verifyToken, updateCameraByID);
router.route('/api/cameras/categories/create').post(verifyToken, createCamera);
router.route('/api/cameras/categories/delete/id').post(verifyToken, deleteCameraByID);

export { router as cameraRouter };