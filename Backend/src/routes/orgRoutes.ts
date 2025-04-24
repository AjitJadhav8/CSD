import orgController from '../controllers/orgController';
import express from 'express';
import { protect } from '../middlewares/authMiddleware';
const router = express.Router();

router.get('/roles-and-departments',protect, orgController.getOptions);


// ---- Customer --------

// Route for creating a new customer
router.post('/customer', protect, orgController.createCustomer);
router.get('/customers', protect, orgController.getCustomers);
router.delete('/customer/:customerId',protect, orgController.softDeleteCustomer);
router.put('/customer/:customerId', protect, orgController.updateCustomer);

// ---- Category --------


router.post('/category', protect, orgController.addCategory);
router.get('/master/categories', protect, orgController.getMasterCategories);
router.delete('/customer/category/:categoryId', protect, orgController.softDeleteCategory);
router.put('/category/:categoryId', protect, orgController.updateCategory);


// ----------------------------------------------EMPLOYEE SECTION----------------------------------------------

// ---- Department --------

router.post('/department', protect, orgController.addDepartment);
router.get('/departments', protect, orgController.getAllDepartments);
router.delete('/departments/:departmentId', protect, orgController.softDeleteDepartment);
router.put('/departments/:departmentId', protect, orgController.updateDepartment);

// ---- Project Role --------

router.post('/project-role', protect, orgController.addProjectRole);
router.get('/project-roles', protect, orgController.getAllProjectRoles);
router.delete('/project-roles/:projectRoleId', protect, orgController.softDeleteProjectRole);
router.put('/project-roles/:projectRoleId', protect, orgController.updateProjectRole);

// ---- Designation --------

router.post('/designation', protect, orgController.addDesignation);
router.get('/designations', protect, orgController.getAllDesignations);
router.delete('/designations/:designationId', protect, orgController.softDeleteDesignation);
router.put('/designations/:designationId', protect, orgController.updateDesignation);

// ---- Skills --------

router.post('/skill', protect, orgController.addSkill);
router.get('/skills', protect, orgController.getAllSkills);
router.delete('/skills/:skillId', protect, orgController.softDeleteSkill);
router.put('/skills/:skillId', protect, orgController.updateSkill);



// Route to fetch roles and departments


// ---- employee --------

router.post('/employee', protect, orgController.addEmployee);
router.get('/employees', protect, orgController.getAllEmployees);
router.delete('/employee/:employeeId', protect, orgController.softDeleteEmployee);

router.post('/assign-details', protect, orgController.assignDetails);
router.get('/employees/:userId', protect, orgController.getEmployeeDetails);
router.put('/employee/:employeeId', protect, orgController.updateEmployee);

// ---- Reporting Manager History --------

router.post('/reporting-manager-history', protect, orgController.addReportingManagerHistory);
router.get('/reporting-manager-history', protect, orgController.getReportingManagerHistory);
router.delete('/reporting-manager-history/:managerId', protect, orgController.softDeleteReportingManager);
router.put('/reporting-manager-history/:managerId', protect, orgController.updateReportingManagerHistory);

// ---- Project --------

router.post('/project', protect, orgController.addProject);
router.get('/projects', protect, orgController.getAllProjects);
router.delete('/project/:projectId', protect, orgController.softDeleteProject);
router.put('/project/:projectId', protect, orgController.updateProject);
//project magaeer history
router.get('/projects/:projectId/manager-history', protect, orgController.getProjectManagerHistory);

// ---- Project Deliverable --------

router.post('/project-deliverable', protect, orgController.addProjectDeliverable);
router.get('/project-deliverables', protect, orgController.getProjectDeliverables);
router.delete('/project-deliverables/:deliverableId', protect, orgController.softDeleteProjectDeliverable);
router.put('/project-deliverables/:deliverableId', protect, orgController.updateProjectDeliverable);

// ---- Project Phases --------
router.post('/project-phase', protect, orgController.addProjectPhase);
router.get('/project-phases', protect, orgController.getProjectPhases);
router.delete('/project-phases/:phaseId', protect, orgController.softDeleteProjectPhase);
router.put('/project-phases/:phaseId', protect, orgController.updateProjectPhase);

router.get('/manager/:managerId/project-deliverables', protect, orgController.getManagerProjectDeliverables);
router.get('/manager/:managerId/project-phases', protect, orgController.getManagerProjectPhases);
router.post('/project-deliverable', protect, orgController.addProjectDeliverableManager);
router.get('/manager-projects/:managerId', protect, orgController.getManagerProjects);
router.put('/project-deliverables/:deliverableId', protect, orgController.updateProjectDeliverableManager);


export default router;
