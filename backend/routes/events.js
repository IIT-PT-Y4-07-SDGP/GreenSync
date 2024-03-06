const EventsController = require("../controllers/eventsController");
const eventsController = new EventsController();

const express = require("express");
const router = express.Router();

router.post("/organize_event", eventsController.eventsOrganize);

module.exports = router;