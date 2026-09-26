'use strict';

function errorHandler(err, req, res, next) { // eslint-disable-line no-unused-vars
  const statusCode = err.statusCode || err.status || 500;

  // Avoid exposing internal error details on server failures
  const message =
    statusCode === 500
      ? 'Internal server error'
      : err.message || 'Something went wrong';

  res.status(statusCode).json({ message });
}

module.exports = { errorHandler };
