"use strict";

require("dotenv").config();

const express = require("express");
const cors = require("cors");

const healthRoutes = require("./routes/health.routes");
const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");
const {
  wantsJsonApi,
  sendJsonApi,
  errorDocument,
} = require("./utils/json-api");

const { errorHandler } = require("./middleware/error.middleware");

const app = express();

app.use(cors());
app.use(
  express.json({ type: ["application/json", "application/vnd.api+json"] }),
);
app.use(express.urlencoded({ extended: true }));

app.use("/", healthRoutes);
app.use("/", authRoutes);
app.use("/", productRoutes);

app.use((req, res) => {
  if (wantsJsonApi(req)) {
    return sendJsonApi(
      res,
      404,
      errorDocument(404, "Not Found", "Route not found"),
    );
  }

  res.status(404).json({ message: "Route not found" });
});

// Global error handler must remain last to intercept unhandled errors from routes
app.use(errorHandler);

module.exports = app;
