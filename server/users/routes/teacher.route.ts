import express from 'express'
import authUserMiddleware from '../../middleware/auth.middleware'
import TeacherController from '../controllers/teacher.controller'
const router = express.Router()

// registraton for teacher
router.post('/auth/teacher/signup', TeacherController.signUp)

// get user by id, for checking is auth user
router.get('/teacher/account/:id', authUserMiddleware, TeacherController.getUserById)

// get user private data by id
router.get('/teacher/private-data/:id', authUserMiddleware, TeacherController.getUserPrivateData)

// update user private data
router.post('/teacher/private-data', authUserMiddleware, TeacherController.updateUserPrivateData)
router.post('/teacher/auth-data', authUserMiddleware, TeacherController.updateUserAuthData)

// remove account
router.delete('/teacher/delete/:id', authUserMiddleware, TeacherController.removeUser)

// update account info teacher
router.post('/teacher/account/update', authUserMiddleware, TeacherController.updateUserAccount)

export default router
