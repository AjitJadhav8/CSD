import express from 'express';

import reportController from '../controllers/reportController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/team-timesheets', protect, reportController.getAllTeamTimesheets);
router.get('/options', protect, reportController.getReportOptions);

// project team report
router.get('/project-teams', protect, reportController.getAllProjectTeams);

//employee report
router.get('/employees', protect, reportController.getAllEmployees)

//customer report
router.get('/customers', protect, reportController.getCustomerReport);

// project repoert 
// In reportRoutes.ts
router.get('/projects', protect, reportController.getProjectReport);

//export pm timesheet
// Add these routes to your reportRoutes file

router.get('/pm-timesheets', protect, reportController.getPmTimesheets);

router.get('/all-customers', protect, reportController.getAllCustomers);
router.get('/all-projects', protect, reportController.getAllProjects);

router.get('/project-managers', protect, reportController.getProjectManagers);


export default router;