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
}

// Export the controller
module.exports = EventsController;