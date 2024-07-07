const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");

//set up middleware
app.use(express.json());
app.use(cookieParser());

//set up routes
app.use("/api/auth", authRoutes);

module.exports = app;
