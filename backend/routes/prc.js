const PRCController = require("../controllers/PRCController");
const prc = new PRCController(); 

const express = require("express")
const router = express.Router();

// router.post("/registration", prc.PRCRegistration);
router.get("/:username", PRCController.getPRCByUsername);


module.exports = router;