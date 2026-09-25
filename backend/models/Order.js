const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Order = sequelize.define("Order", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  totalAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },

  status: {
    type: DataTypes.ENUM(
      "Pending",
      "Processing",
      "Shipped",
      "Delivered",
      "Cancelled"
    ),
    defaultValue: "Pending",
  },
});

module.exports = Order;