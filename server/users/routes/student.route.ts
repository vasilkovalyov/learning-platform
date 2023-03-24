import express from 'express'
import authUserMiddleware from '../../middleware/auth.middleware'
import StudentController from '../controllers/student.controller'

const router = express.Router()

// registraton for student
router.post('/auth/student/signup', StudentController.signUp)

// get user by id, for checking is auth user
router.get('/student/:id', authUserMiddleware, StudentController.getUserById)

// remove account
router.delete('/student/delete', authUserMiddleware, StudentController.removeUser)

// update account info student
router.post('/student/account/update', authUserMiddleware, StudentController.updateUserAccount)

export default router
