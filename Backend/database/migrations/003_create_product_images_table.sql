-- Migration: 003_create_product_images_table
-- Relational product images table with cascade constraint on delete

CREATE TABLE IF NOT EXISTS `product_images` (
  `id`         BIGINT UNSIGNED  NOT NULL AUTO_INCREMENT,
  `product_id` BIGINT UNSIGNED  NOT NULL,
  `image_url`  VARCHAR(500)     NOT NULL,
  `is_primary` BOOLEAN          NOT NULL DEFAULT FALSE,
  `created_at` TIMESTAMP        NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP        NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  PRIMARY KEY (`id`),
  INDEX `idx_product_images_product_id` (`product_id`),
  CONSTRAINT `fk_product_images_product`
    FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;
