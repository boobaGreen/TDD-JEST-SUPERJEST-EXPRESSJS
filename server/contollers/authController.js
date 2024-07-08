const { getUsers, createUser } = require("../utility/helper");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getUsersController = async (req, res, next) => {
  const users = await getUsers();
  return res.status(200).json(users);
};

const createUserController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await createUser({ name, email, password });
    return res.status(201).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    const { password: hashedPassword, ...rest } = user._doc; // ._doc is a mongoose method for getting the document in JSON format
    res.cookie("jwt", token);
    return res.status(200).json(rest);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

const getUserProfileController = async (req, res, next) => {
  try {
    // ._doc is a mongoose method for getting the document in JSON format from the user object in BSON format
    const { password, ...rest } = req.user._doc;
    console.log("rest", rest);
    return res.status(200).json(rest);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

// logout controller
const logoutController = async (req, res, next) => {
  res.clearCookie("jwt");
  return res.json({ message: "user logged out" });
};

module.exports = {
  getUsersController,
  createUserController,
  loginController,
  getUserProfileController,
  logoutController,
};
