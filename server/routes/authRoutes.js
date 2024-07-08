const { Router } = require("express");
const { auth } = require("../middleware/authMiddleware");
const {
  getUsersController,
  createUserController,
  loginController,
  getUserProfileController,
  logoutController,
} = require("../contollers/authController");

const router = Router();

// routes api/auth/register
router.get("/register", getUsersController);
router.post("/register", createUserController);
router.post("/login", loginController);
router.get("/profile", auth, getUserProfileController);
router.get("/logout", logoutController);
module.exports = router;
