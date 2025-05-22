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



// ----------------- Project Manager Timesheet -------------------
// New PM Timesheet routes
router.delete('/pm-timesheet/:id', protect, TimesheetController.deletePmTimesheet);
router.post('/submit-pm', protect, TimesheetController.submitPmTimesheet);

router.put('/pm-timesheet/:id', protect, TimesheetController.updatePmTimesheet);

router.get('/pm-timesheets', protect, TimesheetController.getPmTimesheets);
router.get('/managed-projects/:userId', protect, TimesheetController.getManagedProjects);


// ------------------------- Export --------------------------------

// Add this route
router.get('/pm/my-timesheets/:userId', protect, TimesheetController.getMyPmTimesheets);
// Add these routes
router.get('/pm-customers/:userId', protect, TimesheetController.getPmCustomers);
router.get('/pm-projects/:userId', protect, TimesheetController.getPmProjects);

export default router;
