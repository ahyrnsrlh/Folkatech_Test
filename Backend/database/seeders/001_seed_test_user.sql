-- Seeder: 001_seed_test_user
-- Inserts one test user so the reviewer can immediately log in.
--
-- Credentials:
--   email:    test@folkatech.com
--   password: password123
--
-- The password hash below was generated with bcrypt (cost factor 10).
-- Do NOT store plain-text passwords.

INSERT INTO `users`
  (`first_name`, `last_name`, `email`, `phone`, `password`)
VALUES
  (
    'Test',
    'User',
    'test@folkatech.com',
    '08123456789',
    '$2b$10$EGxMVOC2aVb74idSrrG05Onr8gLSX5AccIWA15Zn2ijvoaQm9LGiS'
  )
ON DUPLICATE KEY UPDATE `updated_at` = CURRENT_TIMESTAMP;
