const express = require("express")
const DriverController = require("../controllers/driverController");
const driverController = new DriverController();

const router = express.Router();

router.get("/driver-list", DriverController.getDriversList);

module.exports = router;
