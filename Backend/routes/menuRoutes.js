import e from "express";
import { tokenOpener } from "../middleware/tokenOpener.js";
import Menu from '../controllers/menuController.js';
import { permissionInjector } from "../middleware/permissionInjector.js";

const router = e.Router();

router.get('/get-categories', tokenOpener, Menu.getMenuCatrgories);
router.post('/create-category', tokenOpener,permissionInjector, Menu.createMenuCategory);

export default router;