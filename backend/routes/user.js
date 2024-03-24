const UserController = require("../controllers/userController");

const express = require("express");
const router = express.Router();

router.post("/registration", UserController.userRegistration);
router.put("/:id", UserController.updateUserDetails);
router.delete("/:id", UserController.deleteUser);
router.post("/redeemPoints", UserController.redeemPoints)

module.exports = router;

