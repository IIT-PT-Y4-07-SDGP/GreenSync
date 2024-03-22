const UserController = require("../controllers/userController");

const express = require("express");
const router = express.Router();

router.post("/registration", UserController.userRegistration);
router.put("/:id", UserController.updateUserDetails);
router.delete("/:id", UserController.deleteUser);
router.get("/:username", UserController.getUserByUsername);

module.exports = router;

