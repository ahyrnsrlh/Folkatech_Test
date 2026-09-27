"use strict";

const JSON_API_MEDIA_TYPE = "application/vnd.api+json";

function wantsJsonApi(req) {
  const acceptsJsonApi = (req.get("Accept") || "")
    .split(",")
    .some(
      (value) =>
        value.trim().split(";", 1)[0].trim().toLowerCase() ===
        JSON_API_MEDIA_TYPE,
    );
  const contentType = (req.get("Content-Type") || "")
    .split(";", 1)[0]
    .trim()
    .toLowerCase();

  return acceptsJsonApi || contentType === JSON_API_MEDIA_TYPE;
}

function sendJsonApi(res, statusCode, document) {
  res.status(statusCode);
  res.set("Content-Type", JSON_API_MEDIA_TYPE);
  res.vary("Accept");
  return res.end(JSON.stringify(document));
}

function validationErrorsDocument(validationPayload) {
  return {
    errors: validationPayload.errors.map((error) => ({
      status: "422",
      title: "Validation Error",
      detail: error.message,
      source: {
        pointer: `/data/attributes/${error.field}`,
      },
    })),
  };
}

function errorDocument(statusCode, title, detail) {
  return {
    errors: [
      {
        status: String(statusCode),
        title,
        detail,
      },
    ],
  };
}

function productResource(product) {
  const { id, images, image, ...attributes } = product;
  const resource = {
    type: "products",
    id: String(id),
    attributes: {
      ...attributes,
      ...(image !== undefined ? { image } : {}),
    },
  };

  if (images) {
    resource.relationships = {
      images: {
        data: images.map((productImage) => ({
          type: "product-images",
          id: String(productImage.url),
        })),
      },
    };
  }

  return resource;
}

function productImagesIncluded(product) {
  return (product.images || []).map((productImage) => ({
    type: "product-images",
    id: String(productImage.url),
    attributes: {
      url: productImage.url,
      is_primary: productImage.is_primary,
    },
  }));
}

function productListDocument(result) {
  return {
    data: result.data.map(productResource),
    meta: result.meta,
  };
}

function productDetailDocument(product) {
  return {
    data: productResource(product),
    included: productImagesIncluded(product),
  };
}

function userDocument(user) {
  return {
    data: {
      type: "users",
      id: String(user.id),
      attributes: {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone: user.phone,
        created_at: user.created_at,
      },
    },
  };
}

function tokenDocument(token) {
  return {
    data: {
      type: "auth-tokens",
      id: "access-token",
      attributes: { token },
    },
  };
}

module.exports = {
  JSON_API_MEDIA_TYPE,
  wantsJsonApi,
  sendJsonApi,
  validationErrorsDocument,
  errorDocument,
  productListDocument,
  productDetailDocument,
  userDocument,
  tokenDocument,
};
