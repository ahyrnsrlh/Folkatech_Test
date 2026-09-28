"use strict";

const { pool } = require("../config/database");

const SORT_COLUMNS = {
  name: "p.name",
  price: "p.price",
  rating: "p.rating",
  review_count: "p.review_count",
  created_at: "p.created_at",
  id: "p.id",
};

const FILTER_COLUMNS = {
  origin: "origin",
  species: "species",
  roast_level: "roast_level",
  tasted: "tasted",
  processing: "processing",
};

async function getProductFilters() {
  const entries = await Promise.all(
    Object.entries(FILTER_COLUMNS).map(async ([key, column]) => {
      const [rows] = await pool.execute(
        `SELECT \`${column}\` AS value, COUNT(*) AS count
         FROM products
         WHERE \`${column}\` IS NOT NULL
           AND TRIM(\`${column}\`) <> ''
           AND LOWER(TRIM(\`${column}\`)) <> 'tidak berlaku'
         GROUP BY \`${column}\`
         ORDER BY \`${column}\` ASC`,
      );

      return [
        key,
        rows.map((row) => ({ value: row.value, count: Number(row.count) })),
      ];
    }),
  );

  return Object.fromEntries(entries);
}

async function listProducts(query = {}) {
  const {
    page = 1,
    limit = 12,
    sort,
    order = "asc",
    search,
    min_price,
    max_price,
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
    conditions.push(
      "(p.name LIKE ? OR p.brand LIKE ? OR p.description LIKE ?)",
    );
    const term = `%${search.trim()}%`;
    params.push(term, term, term);
  }

  if (min_price !== undefined && min_price !== "") {
    conditions.push("p.price >= ?");
    params.push(Number(min_price));
  }

  if (max_price !== undefined && max_price !== "") {
    conditions.push("p.price <= ?");
    params.push(Number(max_price));
  }

  if (origin && origin.trim()) {
    conditions.push("p.origin = ?");
    params.push(origin.trim());
  }

  if (species && species.trim()) {
    conditions.push("p.species = ?");
    params.push(species.trim());
  }

  if (roast_level && roast_level.trim()) {
    conditions.push("p.roast_level = ?");
    params.push(roast_level.trim());
  }

  if (tasted && tasted.trim()) {
    conditions.push("p.tasted = ?");
    params.push(tasted.trim());
  }

  if (processing && processing.trim()) {
    conditions.push("p.processing = ?");
    params.push(processing.trim());
  }

  const whereClause =
    conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  const [countResult] = await pool.execute(
    `SELECT COUNT(*) AS total FROM products p ${whereClause}`,
    params,
  );
  const total = Number(countResult[0]?.total || 0);

  const sortCol = SORT_COLUMNS[sort] || "p.id";
  const sortDir = String(order).toLowerCase() === "desc" ? "DESC" : "ASC";

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
      ORDER BY ${sortCol} ${sortDir}, p.id ASC
     LIMIT ? OFFSET ?`,
    [...params, limitNum, offset],
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

async function getProductById(id) {
  const [rows] = await pool.execute(
    `SELECT
       p.id,
       p.name,
       p.brand,
       p.description,
       p.price,
       p.stock,
       p.rating,
       p.review_count,
       p.origin,
       p.species,
       p.roast_level,
       p.tasted,
       p.processing,
       p.dimensions,
       p.weight,
       p.capacity,
       p.color,
       pi.id AS image_id,
       pi.image_url,
       pi.is_primary
     FROM products p
     LEFT JOIN product_images pi ON pi.product_id = p.id
     WHERE p.id = ?
     ORDER BY pi.is_primary DESC, pi.id ASC`,
    [id],
  );

  if (rows.length === 0) {
    return null;
  }

  const product = rows[0];
  return {
    id: product.id,
    name: product.name,
    brand: product.brand,
    price: Number(product.price),
    rating: Number(product.rating),
    review_count: Number(product.review_count),
    stock: product.stock,
    description: product.description,
    specifications: {
      dimensions: product.dimensions,
      weight: product.weight,
      capacity: product.capacity,
      color: product.color,
      brand: product.brand,
    },
    images: rows
      .filter((row) => row.image_id !== null)
      .map((row) => ({
        url: row.image_url,
        is_primary: Boolean(row.is_primary),
      })),
  };
}

module.exports = {
  getProductFilters,
  listProducts,
  getProductById,
};
