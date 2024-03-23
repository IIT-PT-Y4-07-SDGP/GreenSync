const PRCController = require("../controllers/PRCController");
const prc = new PRCController(); 

const express = require("express")
const router = express.Router();

router.get("/prc-list", PRCController.getPRCs);
// router.post("/registration", prc.PRCRegistration);

module.exports = router;
