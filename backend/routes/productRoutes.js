const express = require("express");

const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const authenticateToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

// Get all products
router.get("/", getProducts);

// Get single product
router.get("/:id", getProductById);

// Create product - Admin/Super Admin
router.post(
  "/",
  authenticateToken,
  authorizeRoles("admin", "superadmin"),
  createProduct
);

// Update product - Admin/Super Admin
router.put(
  "/:id",
  authenticateToken,
  authorizeRoles("admin", "superadmin"),
  updateProduct
);

// Delete product - Admin/Super Admin
router.delete(
  "/:id",
  authenticateToken,
  authorizeRoles("admin", "superadmin"),
  deleteProduct
);

module.exports = router;