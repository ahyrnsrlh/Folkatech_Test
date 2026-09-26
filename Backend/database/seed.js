'use strict';

// Executes SQL seeder scripts in sequential order

require('dotenv').config();

const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

const SEEDERS_DIR = path.join(__dirname, 'seeders');
const DB_NAME = process.env.DB_NAME || 'folkatech_test';

async function seed() {
  let connection;

  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 3306,
      database: DB_NAME,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      multipleStatements: true,
    });

    console.log(`✅ Connected to '${DB_NAME}'`);

    const files = fs
      .readdirSync(SEEDERS_DIR)
      .filter((f) => f.endsWith('.sql'))
      .sort();

    if (files.length === 0) {
      console.log('ℹ️  No seeder files found.');
    }

    for (const file of files) {
      const filePath = path.join(SEEDERS_DIR, file);
      const sql = fs.readFileSync(filePath, 'utf8');

      await connection.query(sql);
      console.log(`✅ Seeded: ${file}`);
    }

    console.log('\n🎉 All seeders completed successfully.');
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

seed();
