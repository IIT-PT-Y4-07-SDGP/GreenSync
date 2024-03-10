const {login,logout,handleRefreshToken} = require("../controllers/authController");


const express = require("express")
const router = express.Router();

router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh", handleRefreshToken);

module.exports = router;