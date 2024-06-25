import express from 'express';
import authController from '../controllers/authController.js';
import emailController from '../controllers/emailController.js';

const router = express.Router();

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
//router.post('/otpveri',authController.otpVeri);
router.post('/checkmail', emailController.checkemail);
router.post('/verifyotp', emailController.checkotp);
router.post('/changepass', emailController.changepassword);
router.post('/getprofile', authController.getUserProfile);

export default router;
