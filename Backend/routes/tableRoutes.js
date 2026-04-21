import e from "express";
import { tokenOpener } from "../middleware/tokenOpener.js";
import { permissionInjector } from "../middleware/permissionInjector.js";
import Table from '../controllers/tableController.js';

const router = e.Router();


router.post('/create-table-zone',tokenOpener,permissionInjector,Table.createTableZone);
router.get('/get-table-zones',tokenOpener,Table.getTableZones);

export default router;