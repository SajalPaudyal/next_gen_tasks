const mongoose = require("mongoose");
require('dotenv').config()

const DB_CONNECT = process.env.DB_URI

const dbConnect = async () => {
  try {
    await mongoose.connect(DB_CONNECT, {
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

module.exports = dbConnect;
