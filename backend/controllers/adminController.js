const Product = require("../models/Product");
const Order = require("../models/Order");
const User = require("../models/User");

const getDashboard = async (req, res) => {
  try {
    const totalUsers = await User.count();

    const totalProducts = await Product.count();

    const totalOrders = await Order.count();

    const orders = await Order.findAll({
      attributes: ["totalAmount"],
    });

    const totalRevenue = orders.reduce(
      (sum, order) => sum + Number(order.totalAmount),
      0
    );

    const recentOrders = await Order.findAll({
      limit: 5,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: User,
          attributes: ["id", "name", "email"],
        },
      ],
    });

    res.json({
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenue,
      recentOrders,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching dashboard data",
      error: error.message,
    });
  }
};

module.exports = {
  getDashboard,
};