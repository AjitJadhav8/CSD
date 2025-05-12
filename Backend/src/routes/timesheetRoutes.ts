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

// In your backend routes file
router.get('/team-timesheets/:projectManagerId', protect, TimesheetController.getProjectTeamsTimesheet);

router.get('/team-by-reporting-manager/:reportingManagerId', protect, TimesheetController.getReportingTeamByManager);

// Add to your backend routes file
router.get('/reporting-team-timesheets/:reportingManagerId', protect, TimesheetController.getReportingTeamsTimesheet);

router.put('/timesheets/:id', protect, TimesheetController.updateTimesheet);








// Backdate request routes
router.post('/backdate-requests', protect, TimesheetController.submitBackdateRequest);
router.get('/users/:userId/approved-backdates', protect, TimesheetController.getApprovedBackdates);
router.get('/backdate-requests/pending', protect, TimesheetController.getPendingBackdateRequests);


// Get pending backdate requests for a manager
router.get('/backdate-requests/manager/:managerId', protect, TimesheetController.getPendingBackdateRequestsForManager);

// Process a backdate request (approve/reject)
router.put('/backdate-requests/:requestId/process', protect, TimesheetController.processBackdateRequest);

export default router;
