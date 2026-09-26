'use strict';

const { Router } = require('express');
const authController = require('../controllers/auth.controller');
const { registerValidator, loginValidator } = require('../validators/auth.validator');

const router = Router();

router.post('/register', registerValidator, authController.register);
router.post('/login', loginValidator, authController.login);

module.exports = router;
