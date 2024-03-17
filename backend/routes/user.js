const UserController = require("../controllers/userController");

const express = require("express");
const router = express.Router();

router.post("/registration", UserController.userRegistration);
router.put("/update/:id", UserController.updateUserDetails);

module.exports = router;

