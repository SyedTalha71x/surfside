import express from 'express'
import { Login, Signup, resetPassword, verifyOTP, sendOTP, AdminLogin, AdminSignup } from '../Controllers/auth-controller.js';

const router = express.Router();

router.post('/login', Login)
router.post('/signup', Signup)
router.post('/send-otp', sendOTP)
router.post('/verify-otp', verifyOTP )
router.post('/reset-password', resetPassword)

router.post('/admin-login', AdminLogin)
router.post('/admin-signup', AdminSignup)


export default router