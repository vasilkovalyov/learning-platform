import express from 'express'
const router = express.Router()
import AuthController from '../controllers/auth.controller'

// router.get('/auth/activate/:hash', AuthController.activateUser);
router.get('/auth/signin', AuthController.signIn)

export default router
