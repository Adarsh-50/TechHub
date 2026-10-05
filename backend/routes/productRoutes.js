const express = require("express");

const {
  getProducts,
  getProductById,
  createProduct,
  getPendingProducts,
  verifyProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const authenticateToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

// Get all verified products
router.get("/", getProducts);

// Get single verified product
router.get("/:id", getProductById);

// Create product - Admin/Super Admin
// New products will be created with "Pending" status
router.post(
  "/",
  authenticateToken,
  authorizeRoles("admin", "superadmin"),
  createProduct
);

// Get products waiting for verification
// Admin/Super Admin only
router.get(
  "/pending/list",
  authenticateToken,
  authorizeRoles("admin", "superadmin"),
  getPendingProducts
);

// Verify product - Admin/Super Admin
router.put(
  "/:id/verify",
  authenticateToken,
  authorizeRoles("admin", "superadmin"),
  verifyProduct
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