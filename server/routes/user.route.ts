const express = require('express');
const router = express.Router();
const authUserMiddleware = require('../middleware/auth.middleware')

import UserController from '../controllers/user.controller'

router.get('/user/:id', authUserMiddleware, UserController.getUserById);

module.exports = router