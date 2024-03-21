const eventsModel = require('../models/eventsModel')
const userModel = require('../models/userModel');
const randomString = require('randomstring');

class EventsService {
    async eventsOrganize(eventsDetails){
        let OrganizerID = eventsDetails.eventOrganizer;
        if (await this.isOrganizerInDB(OrganizerID)){
            let eventTime = new Date(eventsDetails.eventTime)
            if (eventTime > new Date()){
                eventsDetails.eventOrganizer = OrganizerID;
                const event = await eventsModel.create(eventsDetails);
                return event;
            } else {
                throw new Error('Event Time is not Valid')
            }
        } else {
            throw new Error('Organizer is not a registered users')
        }
        //Handle the case when the organizer doesn't exist
        
    }
    async isOrganizerInDB(organizerID){
        try {
            // Assuming Account is your mongoose model for the 'accounts' collection
            const organizer = await userModel.findById(organizerID);
            return !!organizer; // Returns true if organizer exists, false otherwise
        } catch (error) {
            throw new Error('User not exist in the database:', error); // Handle the error accordingly
        }
    }

    async getEventsList() {
        try {
            const eventsList = await eventsModel.find();
            return eventsList;
        } catch (error) {
            throw new Error(`Error fetching events from the database: ${error.message}`);
        }
    }

    async getOrganizedEventsList(eventOrganizer) {
        try {
            const OrganizerEventsList = await eventsModel.find({ eventOrganizer });
            return OrganizerEventsList;
        } catch (error) {
            throw new Error(`Error fetching events from the database: ${error.message}`);
        }
    }

    generateUniqueToken() {
        let token;
        token = randomString.generate({ length: 6, charset: 'numeric' });
        if (eventsModel.findOne({ eventToken: token })) {
            token = randomString.generate({ length: 6, charset: 'numeric' });
        }else {
            return token;
        }
        return token;
    }

    async updateEventToken(eventId, newToken) {
        try {
            await eventsModel.updateOne(
                { _id: eventId },
                { $set: { eventToken: newToken, eventStatus: 'Started' } }
            );
            console.log('Event token updated successfully.');
        } catch (error) {
            console.error('Error updating event token:', error);
        }
    }

    async startEvent(eventId) {

        try {
        // Check if the event has already started
        const existingEvent = await eventsModel.findOne({ _id: eventId });
        if (existingEvent.eventStatus === 'Started' && /^\d{6}$/.test(existingEvent.eventToken)) {
            console.log('Event already started with token:', existingEvent.eventToken);
            return 'Event already started';
        }

        // Generate a unique token
        const newToken = this.generateUniqueToken();

        // Update event token and status
        await this.updateEventToken(eventId, newToken);

        console.log('New token generated and updated for event:', newToken);
        return newToken;
    } catch (error) {
        console.error('Error starting event:', error);
        throw new Error('Error starting event');
    }

    async participateUser(eventID, userID){
        // Check if eventId is provided
        if (!eventID) {
            return res.status(400).json({ error: 'Event ID is required' });
        }

        // Check if userID is provided
        if (!userID) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        // Getting the user and event details
        const event = await eventsModel.findById(eventID)
        const user = await userModel.findById(userID);
        
        // Validating event
        if(!event){
            return res.status(400).json({ error: 'Event not found' });
        }
        
        // Validating User
        if(!user){
            return res.status(400).json({ error: 'User not found' });
        }
        
        // organizer shouldn't participate
        if(userID == event.organizerID){
            return res.status(400).json({ error: 'Organizer not  allowed to participate' });
        }

        // Check if the user already exists in the event participants array
        const existingParticipant = event.eventParticipant.find(participant => participant.userID.toString() === userID);
        if (existingParticipant) {
            return res.status(400).json({ error: 'User is already a participant in this event' });
        }

        // Add the new participant to the eventParticipant array
        event.eventParticipant.push({ userID: userID });
        await event.save();
    }
}
}

module.exports = EventsService