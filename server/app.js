const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const { auth } = require("./middleware/authMiddleware");

//set up middleware
app.use(express.json());
app.use(cookieParser());

//set up routes
app.get("/api/auth", auth);
app.use("/api/auth", authRoutes);

module.exports = app;
