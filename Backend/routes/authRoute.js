import e from "express";
import Auth from '../controllers/authController.js';
import { validateRegisteration } from "../middleware/inputValidation.js";
import { tokenOpener } from "../middleware/tokenOpener.js";
const router = e.Router();

router.post('/register',validateRegisteration,Auth.registerUser);
router.post('/verify-otp',Auth.verifyOtp);
router.post('/resend-otp',Auth.resendOtp);
router.post('/login',Auth.loginUser);

router.get('/get-my-info',tokenOpener,Auth.getMe);


export default router;