const EventsController = require("../controllers/eventsController");
const eventsController = new EventsController();

const express = require("express");
const router = express.Router();

router.post("/organize-event", eventsController.eventsOrganize);
router.get("/get-events", eventsController.getEvents);
router.post("/start-event/:eventId", eventsController.startEvents);

module.exports = router;