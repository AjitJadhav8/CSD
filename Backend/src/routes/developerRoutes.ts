import express from 'express';
const router = express.Router();
import developerController from '../controllers/developerController';
import { protect } from '../middlewares/authMiddleware';

// Developer routes
router.get('/users', protect, developerController.getAllUsers);

export default router;