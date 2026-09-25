const express = require("express");

const { getDashboard } = require("../controllers/adminController");

const authenticateToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

router.get(
  "/dashboard",
  authenticateToken,
  authorizeRoles("admin", "superadmin"),
  getDashboard
);

module.exports = router;