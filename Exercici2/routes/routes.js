import { Router } from 'express';
import {  insertMountain, getmontanyes, getdetallsMontanyes } from '../controllers/routesController.js';

const router = Router();

router.get('/list', getmontanyes);
router.get('/:id', getdetallsMontanyes);
router.post('/insert', insertMountain);

export default router;
