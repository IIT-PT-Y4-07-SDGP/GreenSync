const AuthController = require("../controllers/authController");

const express = require("express")
const router = express.Router();

router.post("/login", AuthController.login);
router.post("/logout", AuthController.logout);
router.post("/refresh", AuthController.handleRefreshToken);

module.exports = router;