import e from "express";
import { tokenOpener } from "../middleware/tokenOpener.js";
import Restaurant from '../controllers/restaurantController.js';
import { permissionInjector } from "../middleware/permissionInjector.js";
import upload from "../middleware/upload.js";

const router = e.Router();

router.post('/create-new-restaurant',tokenOpener,Restaurant.createNewRes);
router.get('/get-curr-restaurant',tokenOpener,permissionInjector,Restaurant.getCurrRestaurant);
router.post('/edit-res',tokenOpener,permissionInjector,upload.single('res_logo'),Restaurant.editRestaurantDetails);

router.get('/search-res',Restaurant.searchRestaurant)

export default router;