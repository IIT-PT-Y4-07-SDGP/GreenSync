const PickupController = require("../controllers/pickupManagementController");
const prc = new PickupController();

const express = require("express");
const router = express.Router();

router.get("/find-all-pickups", PickupController.findAllPickups);

router.put("/assign-pickup/:pickupId", PickupController.AssignePickupForDriver);

router.put("/delete-driver/:pickupId", PickupController.DeleteDriverFromPickup);

router.patch(
  "/update-driver-status/:pickupId",
  PickupController.UpdateDriverStatus
);

router.post("/request-for-pickup", PickupController.GPRequestForPickups);

module.exports = router;
