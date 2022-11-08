import express from 'express';
import authUserMiddleware from '../../middleware/auth.middleware';
import CompanyController from '../controllers/company.controller'
const router = express.Router();

router.post('/auth/company/signup', CompanyController.signUp);
router.get('/company/:id', authUserMiddleware, CompanyController.getUserById);

export default router