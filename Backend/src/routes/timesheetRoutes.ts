import TimesheetController from '../controllers/timesheetController';
import express from 'express';
const router = express.Router();
import { protect } from '../middlewares/authMiddleware';


router.post('/submit', protect, TimesheetController.submitTimesheet);
router.get('/timesheets/:userId', protect, TimesheetController.getUserTimesheets);
router.delete('/timesheet/:timesheetId', protect, TimesheetController.softDeleteTimesheet);


export default router;
