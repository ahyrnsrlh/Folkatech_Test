'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { pool } = require('../config/database');

const BCRYPT_ROUNDS = 10;

async function isEmailTaken(email) {
  const [rows] = await pool.execute(
    'SELECT id FROM users WHERE email = ? LIMIT 1',
    [email]
  );
  return rows.length > 0;
}

async function register({ first_name, last_name, email, phone, password }) {
  const taken = await isEmailTaken(email);
  if (taken) {
    const err = new Error('Email is already registered');
    err.statusCode = 409;
    throw err;
  }

  const hashedPassword = await bcrypt.hash(password, BCRYPT_ROUNDS);

  const [result] = await pool.execute(
    `INSERT INTO users (first_name, last_name, email, phone, password)
     VALUES (?, ?, ?, ?, ?)`,
    [first_name, last_name, email, phone, hashedPassword]
  );

  // Return the created user without the password column
  const [rows] = await pool.execute(
    'SELECT id, first_name, last_name, email, phone, created_at FROM users WHERE id = ?',
    [result.insertId]
  );

  return rows[0];
}

async function login({ email, password }) {
  const [rows] = await pool.execute(
    'SELECT id, first_name, last_name, email, phone, password FROM users WHERE email = ? LIMIT 1',
    [email]
  );

  const user = rows[0];
  // Use generic message to prevent email enumeration attacks
  if (!user) {
    const err = new Error('Invalid email or password');
    err.statusCode = 401;
    throw err;
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const err = new Error('Invalid email or password');
    err.statusCode = 401;
    throw err;
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
  );

  return { token };
}

module.exports = { register, login, isEmailTaken };
