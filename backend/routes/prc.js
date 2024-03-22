const PRCController = require("../controllers/PRCController");
const prc = new PRCController();

const express = require("express");
const router = express.Router();

// router.post("/registration", prc.PRCRegistration);

router.put("/assign-pickups/:prcId", PRCController.PRCAssignePickups);

router.put("/change-driver/:prcId", PRCController.PRCChangeDriver);

module.exports = router;
