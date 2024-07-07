const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

// create a new user
const createUser = async (userData) => {
  try {
    const { name, email, password } = userData;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    return newUser;
  } catch (error) {
    console.log(error.message);
    return { error: error.message };
  }
};

// get list of all users
const getUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    console.log(error.message);
    return { error: error.message };
  }
};

module.exports = { createUser, getUsers };
