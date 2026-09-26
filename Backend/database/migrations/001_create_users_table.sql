-- Migration: 001_create_users_table
-- Creates the users table with all required constraints and indexes.

CREATE TABLE IF NOT EXISTS `users` (
  `id`         BIGINT UNSIGNED  NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(100)     NOT NULL,
  `last_name`  VARCHAR(100)     NOT NULL,
  `email`      VARCHAR(255)     NOT NULL,
  `phone`      VARCHAR(20)      NOT NULL,
  `password`   VARCHAR(255)     NOT NULL,
  `created_at` TIMESTAMP        NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP        NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  PRIMARY KEY (`id`),

  -- Unique index on email: enforces uniqueness at DB level and speeds up
  -- the "find user by email" query used in both Register and Login.
  UNIQUE INDEX `uq_users_email` (`email`)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;
