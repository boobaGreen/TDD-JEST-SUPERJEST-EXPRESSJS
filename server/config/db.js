const mongoose = require("mongoose");

const connectDB = async (url) => {
  try {
    const connect = await mongoose.connect(url);
    // console.log(`MongoDB connected: ${connect.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
