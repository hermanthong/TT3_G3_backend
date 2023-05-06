const express = require("express");
const router = express.Router();
const usersController = require("../controller/user");
const verifyJWT = require("../auth/verifyJWT");

router.use(verifyJWT);

router.post("/createUser", usersController.createUser);
router.get("/getUser", usersController.getUser);
router.put("/email", usersController.updateEmailAndAddress);
router.delete("/email", usersController.removeEmailAndAddress);

module.exports = router;
