const PRCController = require("../controllers/PRCController");
new PRCController();
const express = require("express");
const DriverController = require("../controllers/PRCDriverController");
const router = express.Router();

router.get("/prc-list", PRCController.getPRCs);
router.get("/driver-list", DriverController.getDriversList);
// router.post("/registration", prc.PRCRegistration);

module.exports = router;
