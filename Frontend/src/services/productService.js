import api from "./api.js";

export function getProducts(params) {
  return api.get("/list-product", { params });
}

export function getProductFilters() {
  return api.get("/product-filters");
}

export function getProductById(productId) {
  return api.get(`/product/${productId}`);
}

export function resolveProductImageUrl(imageUrl) {
  if (!imageUrl) return "";

  try {
    return new URL(imageUrl, api.defaults.baseURL || window.location.origin).href;
  } catch {
    return imageUrl;
  }
}

export function resolveProductImageFallbackUrl(imageUrl) {
  if (!imageUrl) return "";

  try {
    return new URL(imageUrl, window.location.origin).href;
  } catch {
    return imageUrl;
  }
}
