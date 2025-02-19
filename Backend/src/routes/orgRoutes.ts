const allController = require('../controllers/orgController');
import orgController from '../controllers/orgController';
import express from 'express';
const router = express.Router();


router.get('/master/categories', orgController.getMasterCategories);

// Route for creating a new customer
router.post('/customer', orgController.createCustomer);

// Route for fetching all customers
router.get('/customers', orgController.getCustomers);

router.delete('/customer/:customerId', orgController.softDeleteCustomer);


// Soft delete a domain
router.delete('/customer/domains/:domainId', orgController.softDeleteDomain);


// ----------------------------------------------EMPLOYEE SECTION----------------------------------------------

// Route to add a new department
router.post('/department', orgController.addDepartment);

// Route to add a new position
router.post('/position', orgController.addPosition);


// Route to add a new skill
router.post('/skill', orgController.addSkill);

// Route to fetch roles and departments
router.get('/roles-and-departments', orgController.getRolesAndDepartments);


// Route to add a new employee
router.post('/employee', orgController.addEmployee);


// Route to get all employees
router.get('/employees', orgController.getAllEmployees);

// Route to fetch all departments
router.get('/departments', orgController.getAllDepartments);

// Route to fetch all positions
router.get('/positions', orgController.getAllPositions);

// Route to fetch all skills
router.get('/skills', orgController.getAllSkills);


router.delete('/departments/:departmentId', orgController.softDeleteDepartment);

router.delete('/positions/:positionId', orgController.softDeletePosition);

router.delete('/skills/:skillId', orgController.softDeleteSkill);

router.delete('/employee/:employeeId', orgController.softDeleteEmployee);

//route to add a new reporting manager

// Route to handle adding reporting manager history
router.post('/reporting-manager-history', orgController.addReportingManagerHistory);

router.get('/reporting-manager-history', orgController.getReportingManagerHistory);

router.delete('/reporting-manager-history/:managerId', orgController.softDeleteReportingManager);

// route to add a new project
router.post('/project', orgController.addProject);

// Route to fetch all projects
router.get('/projects', orgController.getAllProjects);

// soft delete a project
router.delete('/project/:projectId', orgController.softDeleteProject);

// Route to add a new project deliverable
router.post('/project-deliverable', orgController.addProjectDeliverable);

// Route to fetch all project deliverables
router.get('/project-deliverables', orgController.getProjectDeliverables);

router.delete('/project-deliverables/:deliverableId', orgController.softDeleteProjectDeliverable);

// Add a new task category
router.post('/task-category', orgController.addTaskCategory);


// Get all task categories
router.get('/task-categories', orgController.getTaskCategories);

// Soft delete task category
router.delete('/task-categories/:taskCatId', orgController.softDeleteTaskCategory);

export default router;
