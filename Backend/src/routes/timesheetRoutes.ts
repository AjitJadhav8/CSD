import TimesheetController from '../controllers/timesheetController';
import express from 'express';
const router = express.Router();
import { protect } from '../middlewares/authMiddleware';

router.get('/assigned-customers-projects/:employee_id', protect, TimesheetController.getAssignedCustomersAndProjects);


router.post('/submit', protect, TimesheetController.submitTimesheet);
router.get('/timesheets/:userId', protect, TimesheetController.getUserTimesheets);
router.delete('/timesheet/:timesheetId', protect, TimesheetController.softDeleteTimesheet);

// ------------------------------------------Export------------------------------------
router.get('/full-timesheet/:userId', protect, TimesheetController.getUserFullTimesheet);

    // ----------------------- Managers Hub ---------------------------

// In your backend routes file
router.get('/team-by-manager/:projectManagerId', protect, TimesheetController.getProjectTeamByManager);

export default router;
