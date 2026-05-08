import e from "express";
import { tokenOpener } from "../middleware/tokenOpener.js";
import Menu from '../controllers/menuController.js';
import { permissionInjector } from "../middleware/permissionInjector.js";
import upload from "../middleware/upload.js";
const router = e.Router();

router.get('/get-categories', tokenOpener, Menu.getMenuCatrgories);
router.post('/create-category', tokenOpener,permissionInjector, Menu.createMenuCategory);

router.post('/edit-cat-name',tokenOpener,permissionInjector,Menu.editCategoryName);
router.post('/del-category',tokenOpener,permissionInjector,Menu.removeCategory);

router.get('/get-items',tokenOpener,Menu.getMenuItems);
router.post('/add-item',tokenOpener,permissionInjector,upload.single('item_image'),Menu.addMenuItem);
router.post('/del-menu-item',tokenOpener,permissionInjector,Menu.removeMenuItem)

export default router;