const express = require('express');
const router = express.Router();
const {updateLocationByID, getLocationById, getLocations, deleteLocationByID, createLocation} = require('../controllers/location.controller')
const {verifyToken} = require('@softzone/common');
router.route('/api/cameras/locations/get').get(verifyToken, getLocations);
router.route('/api/cameras/locations/get/id').get(verifyToken, getLocationById);
router.route('/api/cameras/locations/update/id').post(verifyToken, updateLocationByID);
router.route('/api/cameras/locations/create').post(verifyToken, createLocation);
router.route('/api/cameras/locations/delete/id').post(verifyToken, deleteLocationByID);

export { router as locationRouter };