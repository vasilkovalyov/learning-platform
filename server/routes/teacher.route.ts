import express from 'express'
import authUserMiddleware from '../middleware/auth.middleware'
import teacherService from '../controllers/teacher.controller'

const router = express.Router()

// registraton for teacher
router.post('/auth/teacher/signup', teacherService.signUp)

// get user by id, for checking is auth user
router.get('/teacher/account/:id', authUserMiddleware, teacherService.getUserAccountById)

// get private data info teacher
router.get('/teacher/private-data/:id', authUserMiddleware, teacherService.getUserPrivateDataById)

// update account info teacher
router.post('/teacher/account/update', authUserMiddleware, teacherService.updateUserAccount)

// update private data info teacher
router.post('/teacher/private-data/update', authUserMiddleware, teacherService.updateUserPrivateData)

// remove account
router.delete('/teacher/delete/:id', authUserMiddleware, teacherService.deleteUserById)

// get teachers
router.get('/teachers', teacherService.getUsers)

// get teacher profile data
router.get('/teacher-profile-data/:id', teacherService.getUserProfileInfo)

export default router
