-- Align the first page's visible card fields with Product List.png.

UPDATE `products`
SET
  `name` = CASE `id`
    WHEN 1 THEN 'ABID CLEVER DRIPPER 102'
    WHEN 2 THEN 'ABID CLEVER DRIPPER 102'
    WHEN 3 THEN 'ABID CLEVER DRIPPER 102'
    WHEN 4 THEN 'Almond Biscuit'
    WHEN 5 THEN 'Aceh Gayo Coffee Beans 200gr'
    WHEN 6 THEN 'Blackpearl Coffee Beans 200gr'
    WHEN 7 THEN 'Bokasso #3'
    WHEN 8 THEN 'Ciwidey West Java Frinsa'
    WHEN 9 THEN 'Espresso Blend - Kungfu Kicks'
    WHEN 10 THEN 'Espresso Blend 1.0 - 200gr'
    WHEN 11 THEN 'Ethiopia Guji Washed'
    WHEN 12 THEN 'Flores Colol Coffee Beans 200gr'
    ELSE `name`
  END,
  `brand` = CASE `id`
    WHEN 1 THEN 'UbruKopi'
    WHEN 2 THEN 'UbruKopi'
    WHEN 3 THEN 'UbruKopi'
    WHEN 4 THEN 'G Coffee Roastery'
    WHEN 5 THEN 'Anomali Coffee'
    WHEN 6 THEN 'Anomali Coffee'
    WHEN 7 THEN 'Titik Temu Roastery'
    WHEN 8 THEN 'Reirom Coffee Solution'
    WHEN 9 THEN 'G Coffee Roastery'
    WHEN 10 THEN 'Reirom Coffee Solution'
    WHEN 11 THEN 'Irenk Beans'
    WHEN 12 THEN 'Anomali Coffee'
    ELSE `brand`
  END,
  `price` = CASE `id`
    WHEN 1 THEN 480000
    WHEN 2 THEN 480000
    WHEN 3 THEN 480000
    WHEN 4 THEN 250000
    WHEN 5 THEN 90000
    WHEN 6 THEN 90000
    WHEN 7 THEN 160000
    WHEN 8 THEN 104500
    WHEN 9 THEN 185000
    WHEN 10 THEN 99000
    WHEN 11 THEN 150000
    WHEN 12 THEN 90000
    ELSE `price`
  END,
  `rating` = 5.0,
  `review_count` = 7,
  `description` = CASE `id`
    WHEN 1 THEN 'ABID Clever Dripper 102 memadukan teknik seduh imersi dan pour over untuk menghasilkan kopi yang bersih dan praktis. Cocok digunakan untuk seduhan harian di rumah maupun di kantor.'
    WHEN 2 THEN 'ABID Clever Dripper 102 memadukan teknik seduh imersi dan pour over untuk menghasilkan kopi yang bersih dan praktis. Cocok digunakan untuk seduhan harian di rumah maupun di kantor.'
    WHEN 3 THEN 'ABID Clever Dripper 102 memadukan teknik seduh imersi dan pour over untuk menghasilkan kopi yang bersih dan praktis. Cocok digunakan untuk seduhan harian di rumah maupun di kantor.'
    WHEN 4 THEN 'Almond Biscuit dari G Coffee Roastery merupakan camilan renyah dengan rasa almond yang gurih, cocok dinikmati bersama kopi.'
    WHEN 5 THEN 'Biji kopi Arabika pilihan dari dataran tinggi Aceh Gayo dengan karakter manis, body seimbang, dan aroma khas kopi Sumatra.'
    WHEN 6 THEN 'Blackpearl Coffee Beans dari Anomali Coffee menawarkan karakter kopi yang kaya dengan rasa cokelat dan sentuhan rempah.'
    WHEN 7 THEN 'Bokasso #3 dari Titik Temu Roastery menghadirkan racikan biji kopi pilihan dengan body seimbang untuk seduhan harian.'
    WHEN 8 THEN 'Kopi Frinsa dari Ciwidey, Jawa Barat, diproses dengan cermat untuk menjaga karakter origin dan rasa yang bersih.'
    WHEN 9 THEN 'Espresso Blend Kungfu Kicks diracik G Coffee Roastery untuk menghasilkan espresso dengan body kuat dan rasa cokelat.'
    WHEN 10 THEN 'Espresso Blend 1.0 dari Reirom Coffee Solution memiliki karakter seimbang dan cocok digunakan untuk espresso maupun campuran susu.'
    WHEN 11 THEN 'Kopi Arabika Ethiopia Guji dengan proses washed, karakter floral, dan rasa buah yang segar.'
    WHEN 12 THEN 'Biji kopi Flores Colol pilihan dengan aroma khas Flores dan rasa manis yang seimbang.'
    ELSE `description`
  END,
  `origin` = CASE `id`
    WHEN 1 THEN 'Taiwan'
    WHEN 2 THEN 'Taiwan'
    WHEN 3 THEN 'Taiwan'
    WHEN 4 THEN 'Indonesia'
    WHEN 5 THEN 'Aceh Gayo'
    WHEN 6 THEN 'Indonesia'
    WHEN 7 THEN 'Indonesia'
    WHEN 8 THEN 'Bandung'
    WHEN 9 THEN 'Indonesia'
    WHEN 10 THEN 'Indonesia'
    WHEN 11 THEN 'Ethiopia'
    WHEN 12 THEN 'Flores Colol'
    ELSE `origin`
  END,
  `species` = CASE `id`
    WHEN 1 THEN 'Tidak berlaku'
    WHEN 2 THEN 'Tidak berlaku'
    WHEN 3 THEN 'Tidak berlaku'
    WHEN 4 THEN 'Tidak berlaku'
    WHEN 5 THEN 'Arabica'
    WHEN 6 THEN 'Arabica'
    WHEN 7 THEN 'Blend'
    WHEN 8 THEN 'Arabica'
    WHEN 9 THEN 'Blend'
    WHEN 10 THEN 'Blend'
    WHEN 11 THEN 'Arabica'
    WHEN 12 THEN 'Arabica'
    ELSE `species`
  END,
  `roast_level` = CASE `id`
    WHEN 1 THEN 'Tidak berlaku'
    WHEN 2 THEN 'Tidak berlaku'
    WHEN 3 THEN 'Tidak berlaku'
    WHEN 4 THEN 'Tidak berlaku'
    WHEN 5 THEN 'Medium Roast'
    WHEN 6 THEN 'Medium Roast'
    WHEN 7 THEN 'Medium Roast'
    WHEN 8 THEN 'Light Roast'
    WHEN 9 THEN 'Dark Roast'
    WHEN 10 THEN 'Medium Roast'
    WHEN 11 THEN 'Light Roast'
    WHEN 12 THEN 'Medium Roast'
    ELSE `roast_level`
  END,
  `tasted` = CASE `id`
    WHEN 1 THEN 'Tidak berlaku'
    WHEN 2 THEN 'Tidak berlaku'
    WHEN 3 THEN 'Tidak berlaku'
    WHEN 4 THEN 'Tidak berlaku'
    WHEN 5 THEN 'Sweet'
    WHEN 6 THEN 'Cocoa'
    WHEN 7 THEN 'Nutty'
    WHEN 8 THEN 'Floral'
    WHEN 9 THEN 'Cocoa'
    WHEN 10 THEN 'Sweet'
    WHEN 11 THEN 'Fruity'
    WHEN 12 THEN 'Sweet'
    ELSE `tasted`
  END,
  `processing` = CASE `id`
    WHEN 1 THEN 'Tidak berlaku'
    WHEN 2 THEN 'Tidak berlaku'
    WHEN 3 THEN 'Tidak berlaku'
    WHEN 4 THEN 'Tidak berlaku'
    WHEN 5 THEN 'Wet Hulled'
    WHEN 6 THEN 'Natural'
    WHEN 7 THEN 'Natural'
    WHEN 8 THEN 'Washed'
    WHEN 9 THEN 'Natural'
    WHEN 10 THEN 'Washed'
    WHEN 11 THEN 'Washed'
    WHEN 12 THEN 'Washed'
    ELSE `processing`
  END,
  `dimensions` = CASE `id`
    WHEN 1 THEN '13x13x14cm'
    WHEN 2 THEN '13x13x14cm'
    WHEN 3 THEN '13x13x14cm'
    WHEN 4 THEN '12x8x18cm'
    ELSE '12x8x20cm'
  END,
  `weight` = CASE WHEN `id` = 4 THEN '200gr' WHEN `id` BETWEEN 1 AND 3 THEN '300gr' ELSE '200gr' END,
  `capacity` = CASE
    WHEN `id` BETWEEN 1 AND 3 THEN '500ml'
    WHEN `id` = 4 THEN 'Tidak berlaku'
    ELSE '200gr'
  END,
  `color` = CASE
    WHEN `id` BETWEEN 1 AND 3 THEN 'Transparan / Clear'
    WHEN `id` = 4 THEN 'Krem / Cream'
    ELSE 'Cokelat / Brown'
  END,
  `updated_at` = CURRENT_TIMESTAMP
WHERE `id` BETWEEN 1 AND 12;

-- Keep the Hario product used by Product Detail.png available at /products/13.
UPDATE `products`
SET
  `name` = 'HARIO CAFE PRESS SLIM GREY 240ML',
  `brand` = 'Hario',
  `description` = 'French Press dari Hario berbahan dasar kaca berwarna abu-abu, didesain dengan bentuk yang ramping dan menarik. Sangat cocok untuk membuat 1-2 gelas kopi.',
  `price` = 480000,
  `stock` = 15,
  `rating` = 5.0,
  `review_count` = 7,
  `origin` = 'Japan',
  `species` = 'Tidak berlaku',
  `roast_level` = 'Tidak berlaku',
  `tasted` = 'Tidak berlaku',
  `processing` = 'Tidak berlaku',
  `dimensions` = '11x16,5x8cm',
  `weight` = '350gr',
  `capacity` = '240ml',
  `color` = 'Abu-abu / Grey',
  `updated_at` = CURRENT_TIMESTAMP
WHERE `id` = 13;

-- The original Hario primary image follows the product to its new ID.
UPDATE `product_images`
SET `product_id` = 13
WHERE `id` = 1;

-- Remove stale images attached to replaced demo records and the unavailable
-- secondary Hario image. The card images below are crops from the supplied
-- reference screenshot and are served as frontend static assets.
DELETE FROM `product_images`
WHERE `id` = 2
   OR `product_id` BETWEEN 1 AND 12
   OR `id` IN (25, 26);

INSERT INTO `product_images` (`id`, `product_id`, `image_url`, `is_primary`)
VALUES
  (33, 1, '/images/products/reference-list-01.jpg', TRUE),
  (34, 2, '/images/products/reference-list-02.jpg', TRUE),
  (35, 3, '/images/products/reference-list-03.jpg', TRUE),
  (36, 4, '/images/products/reference-list-04.jpg', TRUE),
  (37, 5, '/images/products/reference-list-05.jpg', TRUE),
  (38, 6, '/images/products/reference-list-06.jpg', TRUE),
  (39, 7, '/images/products/reference-list-07.jpg', TRUE),
  (40, 8, '/images/products/reference-list-08.jpg', TRUE),
  (41, 9, '/images/products/reference-list-09.jpg', TRUE),
  (42, 10, '/images/products/reference-list-10.jpg', TRUE),
  (43, 11, '/images/products/reference-list-11.jpg', TRUE),
  (44, 12, '/images/products/reference-list-12.jpg', TRUE)
ON DUPLICATE KEY UPDATE
  `product_id` = VALUES(`product_id`),
  `image_url` = VALUES(`image_url`),
  `is_primary` = VALUES(`is_primary`),
  `updated_at` = CURRENT_TIMESTAMP;
