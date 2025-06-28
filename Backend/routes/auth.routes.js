const express = require("express");
const { register, login, validateRegister, validateLogin } = require("../controllers/auth.controller");
const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);

module.exports = router;


