const PRCController = require("../controllers/PRCController");
const prc = new PRCController(); 

const express = require("express")
const router = express.Router();

// router.post("/registration", prc.PRCRegistration);

router.put("/assign-pickups/:prcId", PRCController.PRCAssignePickups);

router.put("/change-driver/:prcId", PRCController.PRCChangeDriver);

router.put("/change-driver-task/:prcId", PRCController.PRCDriverUpdateTask);

router.post("/request-demand-pickups", PRCController.PRCRequestDemandPickups);

module.exports = router;