'use strict';

const authService = require('../services/auth.service');
const { getValidationErrors } = require('../validators/auth.validator');

async function register(req, res, next) {
  try {
    const validationErrors = getValidationErrors(req);
    if (validationErrors) {
      return res.status(422).json(validationErrors);
    }

    const { first_name, last_name, email, phone, password } = req.body;

    const user = await authService.register({
      first_name,
      last_name,
      email,
      phone,
      password,
    });

    return res.status(201).json({
      message: 'Registration successful',
      data: user,
    });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const validationErrors = getValidationErrors(req);
    if (validationErrors) {
      return res.status(422).json(validationErrors);
    }

    const { email, password } = req.body;
    const result = await authService.login({ email, password });

    return res.status(200).json({
      message: 'Login successful',
      data: result,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { register, login };
