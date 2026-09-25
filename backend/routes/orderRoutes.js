const express = require("express");

const {
  createOrder,
  getOrders,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
} = require("../controllers/orderController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createOrder);

router.get(
  "/",
  authMiddleware,
  roleMiddleware("admin", "superadmin"),
  getOrders
);

router.get(
  "/my-orders",
  authMiddleware,
  getMyOrders
);

router.get(
  "/:id",
  authMiddleware,
  getOrderById
);

router.put(
  "/:id/status",
  authMiddleware,
  roleMiddleware("admin", "superadmin"),
  updateOrderStatus
);

module.exports = router;