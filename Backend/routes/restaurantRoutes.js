import e from "express";
import { tokenOpener } from "../middleware/tokenOpener.js";
import Restaurant from '../controllers/restaurantController.js';

const router = e.Router();

router.post('/create-new-restaurant',tokenOpener,Restaurant.createNewRes);


export default router;