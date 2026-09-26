'use strict';

require('dotenv').config();

const app = require('./app');
const { testConnection } = require('./config/database');

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await testConnection();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`   Health check: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
}

start();
