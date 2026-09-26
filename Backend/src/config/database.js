'use strict';

const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 3306,
  database: process.env.DB_NAME || 'folkatech_test',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Validates database connectivity on startup
async function testConnection() {
  const connection = await pool.getConnection();
  connection.release();
  console.log('✅ MySQL connected successfully');
}

module.exports = { pool, testConnection };
