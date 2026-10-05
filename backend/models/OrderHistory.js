const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const OrderHistory = sequelize.define("OrderHistory", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  adminUserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  previousStatus: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  newStatus: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = OrderHistory;