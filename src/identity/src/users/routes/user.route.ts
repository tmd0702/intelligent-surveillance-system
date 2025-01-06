const express = require('express');
const router = express.Router();
const {updateUserByID, getUserById, getUsers, createUser, addFace, count} = require('../controllers/user.controller')
const {verifyToken} = require('@softzone/common');
router.route('/api/users/get').get(verifyToken, getUsers);
router.route('/api/users/count').get(verifyToken, count);
router.route('/api/users/get/id').get(verifyToken, getUserById);
router.route('/api/users/update/id').post(verifyToken, updateUserByID);
router.route('/api/users/create').post(verifyToken, createUser);
router.route('/api/users/create').post(verifyToken, createUser);
router.route('/api/users/face-regis').post(verifyToken, addFace);

export { router as userRouter };