import rmgController from '../controllers/rmgController';
import express from 'express';
const router = express.Router();
import { protect } from '../middlewares/authMiddleware';


router.post('/assign', protect, rmgController.assignProjectTeam.bind(rmgController));
router.get('/assignments', protect, rmgController.getAllProjectTeams);
router.delete('/assignments/:id', protect, rmgController.softDeleteProjectTeam);
router.put('/assignments/:id', protect, rmgController.updateAssignTeam);


router.get('/timesheets', protect, rmgController.getAllTimesheets);

// Update your routes to match the service endpoints
router.put('/project-team/:projectTeamId/release', protect, rmgController.releaseEmployeeFromProject);








export default router;
