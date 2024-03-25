const EventsController = require("../controllers/eventsController");
const eventsController = new EventsController();

const express = require("express");
const router = express.Router();

router.post("/organize-event", eventsController.eventsOrganize);
router.get("/get-events", eventsController.getEvents);
router.get("/get-my-organizing-events", eventsController.getMyOrganizingEvents);
router.get("/get-participated-events", eventsController.getParticipatedEvents);
router.post("/start-event/:eventId", eventsController.startEvents);
router.post("/participate", eventsController.participateUser);
router.get("/get-event-total-registered", eventsController.getTotalRegistered);
router.post("/verify-event-token", eventsController.verifyEventToken);
router.post("/end-event", eventsController.endEvent);
router.delete("/delete-event", eventsController.deleteEvent);

module.exports = router;