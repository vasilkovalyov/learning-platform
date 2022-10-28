const express = require('express');
const router = express.Router();
const authUserMiddleware = require('../middleware/auth.middleware')

import RoleModel from "../models/role.model"

import AuthController from '../controllers/auth.controller'

router.get('/auth/activate/:hash', AuthController.activateUser);
router.post('/auth/signup', AuthController.signUp);
router.post('/auth/signin', AuthController.signIn);
router.get('/user/:id', AuthController.getUserById);

router.get('/users/', authUserMiddleware, (req, res) => {
  async function getUsers() {
    const data = await RoleModel.find();
    return data
  }
  getUsers()
  .then(response => {
    res.json({
      data: response
    })
  })
})

module.exports = router 