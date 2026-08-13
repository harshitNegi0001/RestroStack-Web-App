import Dashboard from '../controllers/dashboardController.js';
import e from 'express';
import { tokenOpener } from '../middleware/tokenOpener.js';
import { permissionInjector } from '../middleware/permissionInjector.js';
const router = e.Router();

router.get('/initial-data', tokenOpener, Dashboard.getInitialDashboardData);

export default router;