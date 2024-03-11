const UserController = require("../controllers/userController");
const userController = new UserController();

const express = require("express");
const router = express.Router();

// router.post("/registration", userController.userRegistration);

module.exports = router;

