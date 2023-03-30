import express from 'express'
const router = express.Router()
import authController from '../controllers/auth.controller'

// router.get('/auth/activate/:hash', AuthController.activateUser);
router.get('/auth/signin', authController.signIn)

export default router
