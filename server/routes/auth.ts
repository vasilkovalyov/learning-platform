const express = require('express');
const router = express.Router();

const auth = require('../controllers/auth');

router.post('/registration', auth.registration);

module.exports = router