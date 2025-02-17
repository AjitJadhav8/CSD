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


export default router;
