const express = require('express');
const router = express.Router();
const {signUp, signIn, signOut, generateAccessToken, reGenerateAccessToken, verifyAccount} = require('../controllers/auth.controller')
const {verifyToken} = require('@softzone/common');

router.route('/api/users/auth/sign-in').post(signIn);
router.route('/api/users/auth/sign-up').post(signUp);
router.route('/api/users/auth/access-token').post(verifyToken, generateAccessToken);
router.route('/api/users/auth/refresh-token').post(reGenerateAccessToken);
router.route('/api/users/auth/verify/otp').post(verifyAccount);
router.route('/api/users/auth/reset-password/verify/otp').post(reGenerateAccessToken);
router.route('/api/users/auth/sign-out').delete(verifyToken, signOut);

export { router as authRouter };