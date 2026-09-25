const bcrypt = require("bcrypt");
const { sequelize } = require("../config/db");
const User = require("../models/User");

const createSuperAdmin = async () => {
  try {
    await sequelize.authenticate();

    const existingSuperAdmin = await User.findOne({
      where: {
        role: "superadmin",
      },
    });

    if (existingSuperAdmin) {
      console.log("Super Admin already exists.");
      return;
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    await User.create({
      name: "Super Admin",
      email: "superadmin@techhub.com",
      password: hashedPassword,
      role: "superadmin",
    });

    console.log("Super Admin created successfully!");
  } catch (error) {
    console.error("Error creating Super Admin:", error.message);
  } finally {
    await sequelize.close();
  }
};

createSuperAdmin();