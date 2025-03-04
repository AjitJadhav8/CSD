import rmgController from '../controllers/rmgController';
import express from 'express';
const router = express.Router();
import { protect } from '../middlewares/authMiddleware';


router.post('/assign', protect, rmgController.assignProjectTeam);


export default router;
