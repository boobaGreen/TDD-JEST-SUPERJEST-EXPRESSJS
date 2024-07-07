const dotenv = require("dotenv").config();
const connectDB = require("../config/db");
const mongoose = require("mongoose");
const User = require("../models/userModel");
const users = require("./data/users");
const { createUser } = require("../utility/helper");

const config = async () => {
  beforeAll(async () => {
    // use a different database for testing
    await connectDB(
      "mongodb+srv://claudiodallaradev:sKxpQVsRxuFH0b87@tdd-project-test.l0jfkjv.mongodb.net/?retryWrites=true&w=majority&appName=TDD-Project-Test"
    );
    // console.log("run this before all tests");
    await User.deleteMany();
  });
  beforeEach(async () => {
    // console.log("run this before each test");
    await User.deleteMany();

    // create a list of base users
    await Promise.all(users.map((user) => createUser(user)));
  });
  afterAll(async () => {
    // console.log("run this after all tests");
    // await User.deleteMany();
    await mongoose.connection.close();
  });
};

config();
