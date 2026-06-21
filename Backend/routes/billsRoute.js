import e from "express";
import Bills from '../controllers/billsController.js';
import { tokenOpener } from "../middleware/tokenOpener.js";
import { permissionInjector } from "../middleware/permissionInjector.js";

const router = e.Router();

router.post('/get-bills-history',tokenOpener,permissionInjector,Bills.getBillsHistory);



export default router;