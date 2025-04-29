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


export default router;