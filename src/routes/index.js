import { Router } from 'express';
import auth from './authRoutes'
import admin from './adminRoutes'

const router = Router();

router.use('/auth', auth)
router.use('/admin', admin)

export default router;