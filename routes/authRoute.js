const auth = require('../auth/auth');
const express = require("express");
const router = express.Router();
const loginController = auth.login;

router.post("/login", loginController);

module.exports = router;
