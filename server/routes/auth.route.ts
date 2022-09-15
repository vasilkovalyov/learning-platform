const express = require('express');
const router = express.Router();

import AuthController from '../controllers/auth.controller'

router.post('/auth/signup', AuthController.signUp);
router.post('/auth/signin', AuthController.signIn);

module.exports = router 