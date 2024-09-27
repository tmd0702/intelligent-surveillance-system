const express = require('express');
const router = express.Router();
const {updateUserByID, getUserById, getUsers} = require('../controllers/user.controller')
const {verifyToken} = require('@softzone/common');
router.route('/api/users/get').get(verifyToken, getUsers);
router.route('/api/users/get/id').get(verifyToken, getUserById);
router.route('/api/users/update/id').post(verifyToken, updateUserByID);

export { router as userRouter };