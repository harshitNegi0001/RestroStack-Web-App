import e from "express";
import Auth from '../controllers/authController.js';
import { validateRegisteration } from "../utils/inputValidation.js";
const router = e.Router();

router.post('/register',validateRegisteration,Auth.registerUser);

export default router;