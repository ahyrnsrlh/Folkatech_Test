'use strict';

const { body, validationResult } = require('express-validator');

// Formats validation errors into the standard API response structure
function getValidationErrors(req) {
  const errors = validationResult(req);
  if (errors.isEmpty()) return null;

  return {
    message: 'Validation failed',
    errors: errors.array().map((e) => ({
      field: e.path,
      message: e.msg,
    })),
  };
}

const registerValidator = [
  body('first_name').trim().notEmpty().withMessage('First name is required'),
  body('last_name').trim().notEmpty().withMessage('Last name is required'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Email must be valid')
    .normalizeEmail(),
  body('phone').trim().notEmpty().withMessage('Phone is required'),
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
  body('password_confirmation')
    .notEmpty().withMessage('Password confirmation is required')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password');
      }
      return true;
    }),
];

const loginValidator = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Email must be valid')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Password is required'),
];

module.exports = { registerValidator, loginValidator, getValidationErrors };
