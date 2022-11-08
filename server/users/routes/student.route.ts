import express from 'express';
import authUserMiddleware from '../../middleware/auth.middleware';
import StudentController from '../controllers/student.controller'
const router = express.Router();

router.post('/auth/student/signup', StudentController.signUp);
router.get('/student/:id', authUserMiddleware, StudentController.getUserById);

export default router