import express from 'express'
import authUserMiddleware from '../../middleware/auth.middleware'
import StudentController from '../controllers/student.controller'

const router = express.Router()

// registraton for student
router.post('/auth/student/signup', StudentController.signUp)

// get user by id, for checking is auth user
router.get('/student/:id', authUserMiddleware, StudentController.getUserById)

// remove account
router.delete('/student/signup', StudentController.removeUser)

export default router
