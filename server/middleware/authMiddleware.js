const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const auth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(400).json({ error: "no token found" });
    }

    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    if (!id) {
      return res.status(400).json({ error: "invalid token" });
    }
    const user = await User.findById(id);
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "invalid credentials" });
  }
};

module.exports = { auth };
