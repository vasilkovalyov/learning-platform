import express from 'express';
import authUserMiddleware from '../../middleware/auth.middleware';
import TeacherController from '../controllers/teacher.controller'
const router = express.Router();

router.post('/auth/teacher/signup', TeacherController.signUp);
router.get('/teacher/:id', authUserMiddleware, TeacherController.getUserById);
router.get('/teacher/private-data/:id', authUserMiddleware, TeacherController.getUserPrivateData);
router.post('/teacher/private-data', authUserMiddleware, TeacherController.updateUserPrivateData);
router.post('/teacher/auth-data', authUserMiddleware, TeacherController.updateUserAuthData);
export default router