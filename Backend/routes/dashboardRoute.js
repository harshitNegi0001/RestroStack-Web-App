import Dashboard from '../controllers/dashboardController.js';
import e from 'express';
import { tokenOpener } from '../middleware/tokenOpener.js';
import { permissionInjector } from '../middleware/permissionInjector.js';
const router = e.Router();

router.get('/initial-data', tokenOpener, Dashboard.getInitialDashboardData);
router.get('/get-updated-table-data',tokenOpener,Dashboard.getUpdatedTableStatus);
router.get('/get-updated-order-stats',tokenOpener,Dashboard.getOrderStats);


export default router;