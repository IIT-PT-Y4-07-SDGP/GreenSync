// Importing the service class
const EventsService = require("../Services/eventsService");
// creating instances for service class
const events = new EventsService();

class EventsController{
    // Event Organizing
    async eventsOrganize (req,res) {
        try{
            // Validate the user data and add ussr to database
            const newEvents = await events.eventsOrganize(req.body);
            return res.status(200).json({newEvents});
        }
        catch(error){
            res.status(400).json({error:error.message})
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
            const newEvents = await events.getOrganizedEventsList(organizerId);
            res.status(200).json(newEvents);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async startEvents(req, res) {
        try {
            const eventId = req.params.eventId;
            const newToken = await events.startEvent(eventId);
            res.status(200).json({newToken});
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Event starting error'})
        }
    }

    /*Required values from frontend
      - Event ID
      - User ID              
    */
    async participateUser(req, res){
        try{
            const participationResponse = await events.participateUser(req.body.eventID, req.body.userID)
            res.status(201).json({message: 'User is participated'})
        } catch(error) {
            console.error(error);
            res.status(500).json({error: "Error occurred during participation"})
        }
    }
}

// Export the controller
module.exports = EventsController;