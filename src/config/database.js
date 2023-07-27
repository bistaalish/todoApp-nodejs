// /config/database.js

const { Sequelize } = require('sequelize');
require('dotenv').config();

// Replace the values below with your actual MySQL database credentials
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;

// Create a Sequelize instance to connect to the MySQL database
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'mysql', // Specify the database dialect (e.g., 'mysql', 'postgres', 'sqlite', etc.)
  define: {
    timestamps: false, // Disable timestamps (createdAt and updatedAt) in the tables
  },
});

// Test the database connection
async function testDatabaseConnection() {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

// Export the Sequelize instance and the test function
module.exports = {
  sequelize,
  testDatabaseConnection,
};
