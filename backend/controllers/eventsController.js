const EventsService = require("../Services/eventsService");
const events = new EventsService();

class EventsController {
    async eventsOrganize(req, res) {
        try {
            const newEvents = await events.eventsOrganize(req.body);
            return res.status(200).json({ newEvents });
        }
        catch (error) {
            res.status(400).json({ error: error.message })
        }
    }

    async getEvents(_, res) {
        try {
            const newEvents = await events.getEventsList();
            res.status(200).json(newEvents);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async getMyOrganizingEvents(req, res) {
        try {
            const organizerId = req.query.organizerId;
            const orgEvents = await events.getOrganizedEventsList(organizerId);
            res.status(200).json(orgEvents);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async startEvents(req, res) {
        try {
            const eventId = req.params.eventId;
            const newToken = await events.startEvent(eventId);
            res.status(200).json({ newToken });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Event starting error' })
        }
    }

    /*Required values from frontend
      - Event ID
      - User ID              
    */
    async participateUser(req, res) {
        try {
            await events.participateUser(req.body.eventID, req.body.userID)
            res.status(201).json({ message: 'Successfully registered to event' })
        } catch (error) {
            console.error(error);
            res.status(500).json(error.message);
        }
    }

    async getParticipatedEvents(req, res) {
        try {
            const participatedEvents = await events.getParticipatedEvents(req.query.participantId)
            res.status(201).json(participatedEvents)
        } catch (error) {
            console.error(error);
            res.status(500).json(error.message);
        }
    }

    async getTotalRegistered(req, res) {
        try {
            const eventId = req.query.eventId;
            const newEvents = await events.getTotalRegistered(eventId);
            res.status(200).json(newEvents);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async verifyEventToken(req, res) {
        try {
            const isValidToken = await events.verifyEventToken(req.body.eventID, req.body.userID, req.body.token);
            res.status(200).json(isValidToken);
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: error.message });
        }
    }

    async endEvent(req, res) {
        try {
            const endEvent = await events.endEvent(req.body.eventID);
            res.status(200).json({ endEvent });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Event starting error' })
        }
    }

    async deleteEvent(req, res) {
        try {
            const { eventID, organizerID } = req.query;
            const deleteEvent = await events.deleteEvent(eventID, organizerID);
            res.status(200).json({ deleteEvent });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Event starting error' })
        }
    }
}

module.exports = EventsController;