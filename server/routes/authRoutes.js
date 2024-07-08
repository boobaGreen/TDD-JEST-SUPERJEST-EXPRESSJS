const { Router } = require("express");
const {
  getUsersController,
  createUserController,
  loginController,
} = require("../contollers/authController");

const router = Router();

// routes api/auth/register
router.get("/register", getUsersController);
router.post("/register", createUserController);
router.post("/login", loginController);
module.exports = router;
