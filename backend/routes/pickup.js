const PickupController = require("../controllers/pickupManagementController");

const express = require("express");
const router = express.Router();

router.get("/find-by-id/:pickupId", PickupController.findPickupByPickupId);

router.get("/find-all-pickups", PickupController.findAllPickups);

router.put("/assign-pickup/:pickupId", PickupController.AssignePickupForDriver);

router.put("/delete-driver/:pickupId", PickupController.DeleteDriverFromPickup);

//FROM DRIVER SIDE
router.patch(
  "/update-driver-status/:pickupId",
  PickupController.UpdateDriverStatus
);

router.post("/request-for-pickup", PickupController.GPRequestForPickups);
router.get(
  "/find-pickups-by-driverId/:driverId",
  PickupController.FindPickupByDriverId
);

router.get(
  "/find-pickups-by-customerId/:customerId",
  PickupController.FindPickupHistoryByCustomerId
);

router.put(
  "/update-pickup-by-customer/:pickupId",
  PickupController.UpdatePickupByCustomer
);

router.put(
  "/update-pickup-by-driver/:pickupId",
  PickupController.UpdatePickupByDriver
);

module.exports = router;
