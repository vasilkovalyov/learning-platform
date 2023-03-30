import express from 'express'
import authUserMiddleware from '../middleware/auth.middleware'
import studentService from '../controllers/student.controller'

const router = express.Router()

// registraton for student
router.post('/auth/student/signup', studentService.signUp)

// get user by id, for checking is auth user
router.get('/student/account/:id', authUserMiddleware, studentService.getUserAccountById)

// get private data info student
router.get('/student/private-data/:id', authUserMiddleware, studentService.getUserPrivateDataById)

// update account info student
router.post('/student/account/update', authUserMiddleware, studentService.updateUserAccount)

// update private data info student
router.post('/student/private-data/update', authUserMiddleware, studentService.updateUserPrivateData)

// remove account
router.delete('/student/delete/:id', authUserMiddleware, studentService.deleteUserById)

export default router
