import TimesheetController from '../controllers/timesheetController';
import express from 'express';
const router = express.Router();


router.post('/submit', TimesheetController.submitTimesheet);
router.get('/timesheets/:userId', TimesheetController.getUserTimesheets);

router.delete('/timesheet/:timesheetId', TimesheetController.softDeleteTimesheet);

export default router;
