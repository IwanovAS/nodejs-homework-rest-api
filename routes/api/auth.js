const express = require("express");
const router = express.Router();

const { validBody, authenticate, upload } = require("../../middlewares");

const { registerSchema, loginSchema } = require("../../schema/authSchema");

const {
  register,
  login,
  logout,
  getCurrent,
  updateSunscription,
  updateAvatar,
} = require("../../controllers/auth");

router.post("/register", validBody(registerSchema), register);
router.post("/login", validBody(loginSchema), login);
router.post("/logout", authenticate, logout);
router.get("/current", authenticate, getCurrent);
router.patch("/", authenticate, updateSunscription);
router.patch(
  "/avatars",
  authenticate,
  upload.single("avatarURL"),
  updateAvatar
);

module.exports = router;
