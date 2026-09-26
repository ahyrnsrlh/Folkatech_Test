'use strict';

const { Router } = require('express');

const router = Router();

/**
 * GET /health
 * Public endpoint to verify the server is running.
 */
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Folkatech backend is running',
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
