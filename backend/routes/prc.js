const PRCController = require("../controllers/PRCController");
const prc = new PRCController(); 

const express = require("express")
const router = express.Router();

router.post("/registration", prc.PRCRegistration);

module.exports = router;