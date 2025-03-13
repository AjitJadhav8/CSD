import orgController from '../controllers/orgController';
import express from 'express';
const router = express.Router();

router.get('/roles-and-departments', orgController.getOptions);


// ---- Customer --------

// Route for creating a new customer
router.post('/customer', orgController.createCustomer);

// Route for fetching all customers
router.get('/customers', orgController.getCustomers);

router.delete('/customer/:customerId', orgController.softDeleteCustomer);

// ---- Category --------


router.post('/category', orgController.addCategory);

router.get('/master/categories', orgController.getMasterCategories);

router.delete('/customer/category/:categoryId', orgController.softDeleteCategory);


// ----------------------------------------------EMPLOYEE SECTION----------------------------------------------

// ---- Department --------

router.post('/department', orgController.addDepartment);
router.get('/departments', orgController.getAllDepartments);
router.delete('/departments/:departmentId', orgController.softDeleteDepartment);

// ---- Position --------

router.post('/project-role', orgController.addProjectRole);
router.get('/project-roles', orgController.getAllProjectRoles);
router.delete('/project-roles/:projectRoleId', orgController.softDeleteProjectRole);

// ---- Designation --------

router.post('/designation', orgController.addDesignation);
router.get('/designations', orgController.getAllDesignations);
router.delete('/designations/:designationId', orgController.softDeleteDesignation);

// ---- Skills --------

router.post('/skill', orgController.addSkill);
router.get('/skills', orgController.getAllSkills);
router.delete('/skills/:skillId', orgController.softDeleteSkill);



// Route to fetch roles and departments


// ---- Category --------

router.post('/employee', orgController.addEmployee);
router.get('/employees', orgController.getAllEmployees);
router.delete('/employee/:employeeId', orgController.softDeleteEmployee);

router.post('/assign-details', orgController.assignDetails);


// ---- Reporting Manager History --------

router.post('/reporting-manager-history', orgController.addReportingManagerHistory);
router.get('/reporting-manager-history', orgController.getReportingManagerHistory);
router.delete('/reporting-manager-history/:managerId', orgController.softDeleteReportingManager);

// ---- Project --------

router.post('/project', orgController.addProject);
router.get('/projects', orgController.getAllProjects);
router.delete('/project/:projectId', orgController.softDeleteProject);

// ---- Project Deliverable --------

router.post('/project-deliverable', orgController.addProjectDeliverable);
router.get('/project-deliverables', orgController.getProjectDeliverables);
router.delete('/project-deliverables/:deliverableId', orgController.softDeleteProjectDeliverable);

// ---- Task Category --------

router.post('/task-category', orgController.addTaskCategory);
router.get('/task-categories', orgController.getTaskCategories);
router.delete('/task-categories/:taskCatId', orgController.softDeleteTaskCategory);

export default router;
