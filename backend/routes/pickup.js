const PickupController = require("../controllers/pickupManagementController");
const prc = new PickupController();

const express = require("express");
const router = express.Router();

router.put("/assign-pickups/:prcId", PickupController.AssignePickupForDriver);

router.put("/delete-driver/:prcId", PickupController.DeleteDriverFromPickup);

router.patch(
  "/update-driver-status/:pickupId",
  PickupController.UpdateDriverStatus
);

router.post("/request-for-pickup", PickupController.GPRequestForPickups);

module.exports = router;
