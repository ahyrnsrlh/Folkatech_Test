-- Migration: 002_create_products_table
-- Products table schema derived from Figma requirements and AI_CONTEXT.md

CREATE TABLE IF NOT EXISTS `products` (
  `id`           BIGINT UNSIGNED  NOT NULL AUTO_INCREMENT,
  `name`         VARCHAR(255)     NOT NULL,
  `brand`        VARCHAR(150)     NOT NULL,
  `description`  TEXT             NULL,
  `price`        DECIMAL(12,2)    NOT NULL DEFAULT 0.00,
  `stock`        INT              NOT NULL DEFAULT 0,
  `rating`       DECIMAL(2,1)     NOT NULL DEFAULT 0.0,
  `review_count` INT              NOT NULL DEFAULT 0,
  `origin`       VARCHAR(100)     NULL,
  `species`      VARCHAR(100)     NULL,
  `roast_level`  VARCHAR(100)     NULL,
  `tasted`       VARCHAR(100)     NULL,
  `processing`   VARCHAR(100)     NULL,
  `dimensions`   VARCHAR(100)     NULL,
  `weight`       VARCHAR(50)      NULL,
  `capacity`     VARCHAR(50)      NULL,
  `color`        VARCHAR(100)     NULL,
  `created_at`   TIMESTAMP        NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`   TIMESTAMP        NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  PRIMARY KEY (`id`),
  INDEX `idx_products_name` (`name`),
  INDEX `idx_products_origin` (`origin`),
  INDEX `idx_products_species` (`species`),
  INDEX `idx_products_roast_level` (`roast_level`)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;
