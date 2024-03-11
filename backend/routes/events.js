const EventsController = require("../controllers/eventsController");
const eventsController = new EventsController();

const express = require("express");
const router = express.Router();

router.post("/organize-event", eventsController.eventsOrganize);
router.get("/get-events", eventsController.getEvents);

module.exports = router;