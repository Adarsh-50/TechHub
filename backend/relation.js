const User = require("./models/User");
const Product = require("./models/Product");
const Order = require("./models/Order");
const OrderItem = require("./models/OrderItem");
const OrderHistory = require("./models/OrderHistory");

// User -> Orders
User.hasMany(Order, {
  foreignKey: "userId",
});

Order.belongsTo(User, {
  foreignKey: "userId",
});

// Order -> OrderItems
Order.hasMany(OrderItem, {
  foreignKey: "orderId",
});

OrderItem.belongsTo(Order, {
  foreignKey: "orderId",
});

// Product -> OrderItems
Product.hasMany(OrderItem, {
  foreignKey: "productId",
});

OrderItem.belongsTo(Product, {
  foreignKey: "productId",
});

// Order -> OrderHistory
Order.hasMany(OrderHistory, {
  foreignKey: "orderId",
});

OrderHistory.belongsTo(Order, {
  foreignKey: "orderId",
});

// User -> OrderHistory
User.hasMany(OrderHistory, {
  foreignKey: "adminUserId",
});

OrderHistory.belongsTo(User, {
  foreignKey: "adminUserId",
});

module.exports = {
  User,
  Product,
  Order,
  OrderItem,
  OrderHistory,
};