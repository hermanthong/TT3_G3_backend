const express = require("express");
const router = express.Router();
const employeeController = require("../controller/employee");

router.get("/claim/:employeeId", employeeController.getAllClaims);

module.exports = router;
