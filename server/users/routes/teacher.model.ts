import express from 'express';
import authUserMiddleware from '../../middleware/auth.middleware';
import TeacherController from '../controllers/teacher.controller'
const router = express.Router();

router.post('/auth/teacher/signup', TeacherController.signUp);
router.get('/teacher/:id', authUserMiddleware, TeacherController.getUserById);

export default router