const express = require("express");
const router = express.Router();
const { validBody, authenticate } = require("../../middlewares");
const {registerSchema, loginSchema} = require('../../schema/authSchema');
const { register, login, logout } = require("../../controllers/auth");
const { getCurrent } = require("../../db/services/authServices");

router.post("/register", validBody(registerSchema), register);
router.post("/login", validBody(loginSchema), login);
router.all("/logout", authenticate, logout);
router.get("/current", authenticate, getCurrent);

module.exports = router;