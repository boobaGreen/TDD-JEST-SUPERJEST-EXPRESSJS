const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

//set up middleware
app.use(express.json());
app.use(cookieParser());

//set up routes
app.get("/", (req, res) => {
  return res.json({ message: "Hello from server! TDD project" });
});

module.exports = app;
