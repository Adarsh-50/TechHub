const express = require("express");

const {
  registerUser,
  loginUser,
  getUsers,
  updateUserRole,
} = require("../controllers/userController");

const authenticateToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get(
  "/",
  authenticateToken,
  authorizeRoles("admin", "superadmin"),
  getUsers
);

router.put(
  "/:id/role",
  authenticateToken,
  authorizeRoles("superadmin"),
  updateUserRole
);

module.exports = router;