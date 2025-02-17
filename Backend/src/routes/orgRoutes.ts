const allController = require('../controllers/orgController');
import orgController from '../controllers/orgController';
import express from 'express';
const router = express.Router();


router.get('/master/categories', orgController.getMasterCategories);

export default router;
