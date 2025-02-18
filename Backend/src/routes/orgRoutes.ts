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


// Fetch customer domains
router.get('/customer/domains', orgController.getCustomerDomains);

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









export default router;
