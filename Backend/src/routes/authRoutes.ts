import express from 'express';
import authController from '../controllers/authController';

const router = express.Router();

router.post('/login', authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);


export default router;
