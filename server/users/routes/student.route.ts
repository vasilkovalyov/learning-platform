import express from 'express'
import authUserMiddleware from '../../middleware/auth.middleware'
import StudentController from '../controllers/student.controller'

const router = express.Router()

// registraton for student
router.post('/auth/student/signup', StudentController.signUp)

// get user by id, for checking is auth user
router.get('/student/account/:id', authUserMiddleware, StudentController.getUserById)

// remove account
router.delete('/student/delete/:id', authUserMiddleware, StudentController.removeUser)

// update account info student
router.post('/student/account/update', authUserMiddleware, StudentController.updateUserAccount)

// update private data info student
router.post('/student/private-data/update', authUserMiddleware, StudentController.updateUserPrivateData)

// get private data info student
router.get('/student/private-data/:id', authUserMiddleware, StudentController.getUserPrivateData)

export default router
