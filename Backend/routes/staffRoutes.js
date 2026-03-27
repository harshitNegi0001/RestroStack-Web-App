import express from 'express';
import { tokenOpener } from '../middleware/tokenOpener.js';
import Staff from '../controllers/staffController.js';
import { permissionInjector } from '../middleware/permissionInjector.js';


const router = express.Router();

router.post('/generate-invite-token',tokenOpener,Staff.generateInviteToken);
router.post('/verify-invite-token',tokenOpener,Staff.inviteTokenCheck);

export default router;