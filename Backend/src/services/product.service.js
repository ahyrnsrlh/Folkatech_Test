'use strict';

const { pool } = require('../config/database');

const SORT_COLUMNS = {
  name: 'p.name',
  price: 'p.price',
  rating: 'p.rating',
  review_count: 'p.review_count',
  created_at: 'p.created_at',
  id: 'p.id',
};

async function listProducts(query = {}) {
  const {
    page = 1,
    limit = 12,
    sort,
    order = 'asc',
    search,
    origin,
    species,
    roast_level,
    tasted,
    processing,
  } = query;

  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 12));
  const offset = (pageNum - 1) * limitNum;

  const conditions = [];
  const params = [];

  if (search && search.trim()) {
    conditions.push('(p.name LIKE ? OR p.brand LIKE ? OR p.description LIKE ?)');
    const term = `%${search.trim()}%`;
    params.push(term, term, term);
  }

  if (origin && origin.trim()) {
    conditions.push('p.origin = ?');
    params.push(origin.trim());
  }

  if (species && species.trim()) {
    conditions.push('p.species = ?');
    params.push(species.trim());
  }

  if (roast_level && roast_level.trim()) {
    conditions.push('p.roast_level = ?');
    params.push(roast_level.trim());
  }

  if (tasted && tasted.trim()) {
    conditions.push('p.tasted = ?');
    params.push(tasted.trim());
  }

  if (processing && processing.trim()) {
    conditions.push('p.processing = ?');
    params.push(processing.trim());
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

  const [countResult] = await pool.execute(
    `SELECT COUNT(*) AS total FROM products p ${whereClause}`,
    params
  );
  const total = Number(countResult[0]?.total || 0);

  const sortCol = SORT_COLUMNS[sort] || 'p.id';
  const sortDir = String(order).toLowerCase() === 'desc' ? 'DESC' : 'ASC';

  // Primary image lookup avoids N+1 queries by selecting in one pass
  const [rows] = await pool.execute(
    `SELECT
       p.id,
       p.name,
       p.brand,
       p.price,
       p.rating,
       p.review_count,
       (
         SELECT pi.image_url
         FROM product_images pi
         WHERE pi.product_id = p.id
         ORDER BY pi.is_primary DESC, pi.id ASC
         LIMIT 1
       ) AS image
     FROM products p
     ${whereClause}
     ORDER BY ${sortCol} ${sortDir}
     LIMIT ? OFFSET ?`,
    [...params, limitNum, offset]
  );

  const data = rows.map((r) => ({
    id: r.id,
    name: r.name,
    brand: r.brand,
    price: Number(r.price),
    image: r.image,
    rating: Number(r.rating),
    review_count: Number(r.review_count),
  }));

  const totalPages = Math.ceil(total / limitNum);

  return {
    data,
    meta: {
      page: pageNum,
      limit: limitNum,
      total,
      total_pages: totalPages,
    },
  };
}

module.exports = {
  listProducts,
};
