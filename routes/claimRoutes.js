const express = require("express");
const router = express.Router();
const claimsController = require("../controller/claims");

router.put("/updateClaim", claimsController.updateProjectExpenseClaims);
router.delete("/deleteClaim", claimsController.deleteProjectExpenseClaims);
router.post("/createClaim",claimsController.postProjectExpenseClaims);
module.exports = router;
