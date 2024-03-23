const EventsController = require("../controllers/eventsController");
const eventsController = new EventsController();

const express = require("express");
const router = express.Router();

router.post("/organize-event", eventsController.eventsOrganize);
router.get("/get-events", eventsController.getEvents);
router.get("/get-my-organizing-events", eventsController.getMyOrganizingEvents);
router.post("/start-event/:eventId", eventsController.startEvents);
router.post("/participate", eventsController.participateUser);

module.exports = router;