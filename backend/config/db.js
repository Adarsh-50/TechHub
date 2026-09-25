const { Sequelize } = require("sequelize");
const mysql = require("mysql2/promise");
require("dotenv").config();

const createDatabase = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    });

    await connection.query(
      `CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\``
    );

    await connection.end();

    console.log("Database checked successfully!");
  } catch (error) {
    console.error("Database creation error:", error.message);
  }
};

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  }
);

const connectDB = async () => {
  try {
    await createDatabase();

    await sequelize.authenticate();

    console.log("MySQL database connected successfully!");
  } catch (error) {
    console.error("Unable to connect to MySQL:", error.message);
  }
};

module.exports = { sequelize, connectDB };