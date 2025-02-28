import TimesheetController from '../controllers/timesheetController';
import express from 'express';
const router = express.Router();
import { protect } from '../middlewares/authMiddleware';


router.post('/submit', protect, TimesheetController.submitTimesheet);
router.get('/timesheets/:userId', protect, TimesheetController.getUserTimesheets);
router.delete('/timesheet/:timesheetId', protect, TimesheetController.softDeleteTimesheet);

// ------------------------------------------Export------------------------------------
router.get('/full-timesheet/:userId', protect, TimesheetController.getUserFullTimesheet);


export default router;
