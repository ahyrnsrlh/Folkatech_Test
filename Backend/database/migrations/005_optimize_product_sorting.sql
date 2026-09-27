-- Index the product fields exposed by the API sorting options.

SET @price_index_exists := (
  SELECT COUNT(*) FROM information_schema.statistics
  WHERE table_schema = DATABASE() AND table_name = 'products'
    AND index_name = 'idx_products_price'
);
SET @add_price_index_sql := IF(
  @price_index_exists = 0,
  'ALTER TABLE `products` ADD INDEX `idx_products_price` (`price`)',
  'SELECT 1'
);
PREPARE add_price_index_stmt FROM @add_price_index_sql;
EXECUTE add_price_index_stmt;
DEALLOCATE PREPARE add_price_index_stmt;

SET @rating_index_exists := (
  SELECT COUNT(*) FROM information_schema.statistics
  WHERE table_schema = DATABASE() AND table_name = 'products'
    AND index_name = 'idx_products_rating'
);
SET @add_rating_index_sql := IF(
  @rating_index_exists = 0,
  'ALTER TABLE `products` ADD INDEX `idx_products_rating` (`rating`)',
  'SELECT 1'
);
PREPARE add_rating_index_stmt FROM @add_rating_index_sql;
EXECUTE add_rating_index_stmt;
DEALLOCATE PREPARE add_rating_index_stmt;

SET @review_count_index_exists := (
  SELECT COUNT(*) FROM information_schema.statistics
  WHERE table_schema = DATABASE() AND table_name = 'products'
    AND index_name = 'idx_products_review_count'
);
SET @add_review_count_index_sql := IF(
  @review_count_index_exists = 0,
  'ALTER TABLE `products` ADD INDEX `idx_products_review_count` (`review_count`)',
  'SELECT 1'
);
PREPARE add_review_count_index_stmt FROM @add_review_count_index_sql;
EXECUTE add_review_count_index_stmt;
DEALLOCATE PREPARE add_review_count_index_stmt;

SET @created_at_index_exists := (
  SELECT COUNT(*) FROM information_schema.statistics
  WHERE table_schema = DATABASE() AND table_name = 'products'
    AND index_name = 'idx_products_created_at'
);
SET @add_created_at_index_sql := IF(
  @created_at_index_exists = 0,
  'ALTER TABLE `products` ADD INDEX `idx_products_created_at` (`created_at`)',
  'SELECT 1'
);
PREPARE add_created_at_index_stmt FROM @add_created_at_index_sql;
EXECUTE add_created_at_index_stmt;
DEALLOCATE PREPARE add_created_at_index_stmt;
