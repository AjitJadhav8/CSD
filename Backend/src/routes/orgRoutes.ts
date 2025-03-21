import orgController from '../controllers/orgController';
import express from 'express';
const router = express.Router();

router.get('/roles-and-departments', orgController.getOptions);


// ---- Customer --------

// Route for creating a new customer
router.post('/customer', orgController.createCustomer);
router.get('/customers', orgController.getCustomers);
router.delete('/customer/:customerId', orgController.softDeleteCustomer);
router.put('/customer/:customerId', orgController.updateCustomer);

// ---- Category --------


router.post('/category', orgController.addCategory);

router.get('/master/categories', orgController.getMasterCategories);

router.delete('/customer/category/:categoryId', orgController.softDeleteCategory);


// ----------------------------------------------EMPLOYEE SECTION----------------------------------------------

// ---- Department --------

router.post('/department', orgController.addDepartment);
router.get('/departments', orgController.getAllDepartments);
router.delete('/departments/:departmentId', orgController.softDeleteDepartment);
router.put('/departments/:departmentId', orgController.updateDepartment);

// ---- Project Role --------

router.post('/project-role', orgController.addProjectRole);
router.get('/project-roles', orgController.getAllProjectRoles);
router.delete('/project-roles/:projectRoleId', orgController.softDeleteProjectRole);
router.put('/project-roles/:projectRoleId', orgController.updateProjectRole);

// ---- Designation --------

router.post('/designation', orgController.addDesignation);
router.get('/designations', orgController.getAllDesignations);
router.delete('/designations/:designationId', orgController.softDeleteDesignation);
router.put('/designations/:designationId', orgController.updateDesignation);

// ---- Skills --------

router.post('/skill', orgController.addSkill);
router.get('/skills', orgController.getAllSkills);
router.delete('/skills/:skillId', orgController.softDeleteSkill);
router.put('/skills/:skillId', orgController.updateSkill);



// Route to fetch roles and departments


// ---- employee --------

router.post('/employee', orgController.addEmployee);
router.get('/employees', orgController.getAllEmployees);
router.delete('/employee/:employeeId', orgController.softDeleteEmployee);

router.post('/assign-details', orgController.assignDetails);
router.get('/employees/:userId', orgController.getEmployeeDetails);
router.put('/employee/:employeeId', orgController.updateEmployee);

// ---- Reporting Manager History --------

router.post('/reporting-manager-history', orgController.addReportingManagerHistory);
router.get('/reporting-manager-history', orgController.getReportingManagerHistory);
router.delete('/reporting-manager-history/:managerId', orgController.softDeleteReportingManager);
router.put('/reporting-manager-history/:managerId', orgController.updateReportingManagerHistory);

// ---- Project --------

router.post('/project', orgController.addProject);
router.get('/projects', orgController.getAllProjects);
router.delete('/project/:projectId', orgController.softDeleteProject);
router.put('/project/:projectId', orgController.updateProject);

// ---- Project Deliverable --------

router.post('/project-deliverable', orgController.addProjectDeliverable);
router.get('/project-deliverables', orgController.getProjectDeliverables);
router.delete('/project-deliverables/:deliverableId', orgController.softDeleteProjectDeliverable);

// ---- Project Phases --------
router.post('/project-phase', orgController.addProjectPhase);
router.get('/project-phases', orgController.getProjectPhases);
router.delete('/project-phases/:phaseId', orgController.softDeleteProjectPhase);

// ---- Task Category --------

// router.post('/task-category', orgController.addTaskCategory);
// router.get('/task-categories', orgController.getTaskCategories);
// router.delete('/task-categories/:taskCatId', orgController.softDeleteTaskCategory);

export default router;
