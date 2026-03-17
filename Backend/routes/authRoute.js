import e from "express";
import Auth from '../controllers/authController.js';
import { validateRegisteration } from "../middleware/inputValidation.js";
const router = e.Router();

router.post('/register',validateRegisteration,Auth.registerUser);
router.post('/verify-otp',Auth.verifyOtp);
router.post('/resend-otp',Auth.resendOtp);
router.post('/login',Auth.loginUser);


export default router;