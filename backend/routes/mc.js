const MCController = require("../controllers/MCController");

const express = require("express")
const router = express.Router();

router.post("/registration", MCController.MCRegistration);
router.get("/", MCController.getAllMCUsers);
router.get("/pending", MCController.getPendingMCUsers);
router.post("/add/pickup", MCController.addPickupPoint);
router.get("/pickups/:id", MCController.getPickupPoints);

module.exports = router;