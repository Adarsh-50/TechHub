const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const { sequelize, connectDB } = require("./config/db");
require("./models/User");
require("./models/Product");
require("./models/Order");
require("./models/OrderItem");
require("./relation");

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("TechHub Backend is running!");
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  try {
    await sequelize.sync();

    console.log("Database tables synchronized successfully!");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Database synchronization error:", error.message);
  }
};

startServer();