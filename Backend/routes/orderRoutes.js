import e from "express";
import { tokenOpener } from "../middleware/tokenOpener.js";
import { permissionInjector } from "../middleware/permissionInjector.js";
import Orders from '../controllers/ordersController.js';


const router  = e.Router();

router.post('/send-kot',tokenOpener,permissionInjector,Orders.sendKOT)
export default router;