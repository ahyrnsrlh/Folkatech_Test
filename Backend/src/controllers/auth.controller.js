"use strict";

const authService = require("../services/auth.service");
const { getValidationErrors } = require("../validators/auth.validator");
const {
  wantsJsonApi,
  sendJsonApi,
  validationErrorsDocument,
  userDocument,
  tokenDocument,
} = require("../utils/json-api");

function requestAttributes(req) {
  if (!wantsJsonApi(req)) {
    return req.body;
  }

  return req.body?.data?.attributes || req.body;
}

async function register(req, res, next) {
  try {
    const validationErrors = getValidationErrors(req);
    if (validationErrors) {
      if (wantsJsonApi(req)) {
        return sendJsonApi(
          res,
          422,
          validationErrorsDocument(validationErrors),
        );
      }
      return res.status(422).json(validationErrors);
    }

    const { first_name, last_name, email, phone, password } =
      requestAttributes(req);

    const user = await authService.register({
      first_name,
      last_name,
      email,
      phone,
      password,
    });

    const response = {
      message: "Registration successful",
      data: user,
    };

    if (wantsJsonApi(req)) {
      return sendJsonApi(res, 201, {
        ...userDocument(user),
        meta: { message: response.message },
      });
    }

    return res.status(201).json(response);
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const validationErrors = getValidationErrors(req);
    if (validationErrors) {
      if (wantsJsonApi(req)) {
        return sendJsonApi(
          res,
          422,
          validationErrorsDocument(validationErrors),
        );
      }
      return res.status(422).json(validationErrors);
    }

    const { email, password } = requestAttributes(req);
    const result = await authService.login({ email, password });

    const response = {
      message: "Login successful",
      data: result,
    };

    if (wantsJsonApi(req)) {
      return sendJsonApi(res, 200, {
        ...tokenDocument(result.token),
        meta: { message: response.message },
      });
    }

    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
}

module.exports = { register, login };
