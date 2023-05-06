const express = require("express");
const router = express.Router();
const currencyController = require("../controller/currency");

router.get("", currencyController.getCurrencies);

module.exports = router;
