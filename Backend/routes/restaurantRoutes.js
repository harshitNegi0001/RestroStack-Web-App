import e from "express";
import { tokenOpener } from "../middleware/tokenOpener.js";
import Restaurant from '../controllers/restaurantController.js';
import { permissionInjector } from "../middleware/permissionInjector.js";

const router = e.Router();

router.post('/create-new-restaurant',tokenOpener,Restaurant.createNewRes);
router.get('/get-curr-restaurant',tokenOpener,permissionInjector,Restaurant.getCurrRestaurant);
router.post('/edit-res',tokenOpener,permissionInjector,Restaurant.editRestaurantDetails);

export default router;