const eventsModel = require('../models/eventsModel')
const userModel = require('../models/userModel');
const randomString = require('randomstring');

class EventsService {
    //used to create an event
    async eventsOrganize(eventsDetails){
        let OrganizerID = eventsDetails.eventOrganizer;
        if (await this.isOrganizerInDB(OrganizerID)){
            let eventTime = new Date(eventsDetails.eventTime)
            //check whther the event time is in the future
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
    }

    //checks whether the organizer is valid
    async isOrganizerInDB(organizerID){
        try {
            const organizer = await userModel.findById(organizerID);
            return !!organizer; 
        } catch (error) {
            throw new Error('User not exist in the database:', error); 
        }
    }

    //obtain events list
    async getEventsList() {
        try {
            const eventsList = await eventsModel.find();
            return eventsList;
        } catch (error) {
            throw new Error(`Error fetching events from the database: ${error.message}`);
        }
    }

    //obtain events related to an organizer
    async getOrganizedEventsList(eventOrganizer) {
        try {
            const OrganizerEventsList = await eventsModel.find({ eventOrganizer });
            return OrganizerEventsList;
        } catch (error) {
            throw new Error(`Error fetching events from the database: ${error.message}`);
        }
    }

    //used to generate unique event tokens
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

    //used to update unique event tokens
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
    }

    async participateUser(eventID, userID, res){
        // Getting the user and event details
        let event; 
        let user;
        
        // Check if eventId is provided
        if (eventID) {
            event = await eventsModel.findById(eventID)
            // Validating event
            if(!event) { throw new Error ("Event not found") }   
        } else {
            throw new Error('Event ID is required');
        }

        // Check if userID is provided
        if (userID) {
            user = await userModel.findById(userID);
            // Validating User
            if(!user) { throw new Error("User not found") }
            // organizer shouldn't participate
            if(userID == event.eventOrganizer){ throw new Error('Organizer not  allowed to participate') }
        } else {
            throw new Error('User ID is required');
        }

        // Check if the user already exists in the event participants array
        const existingParticipant = event.eventParticipant.find(participant => participant.user._id.toString() === userID);
        if (existingParticipant) {
            throw new Error('User is already a participant in this event');
        }

        // Add the new participant to the eventParticipant array
        event.eventParticipant.push({ user: userID });
        await event.save();

        // return await eventsModel.findById(eventID).populate('eventParticipant.user');
    }

        async getTotalRegistered(eventId) {
        const event = await eventsModel.findOne({ _id: eventId }).populate('eventParticipant.user');
        return event;
    } 
    catch (error) {
        throw new Error(`Error fetching event from the database: ${error.message}`);
    }
}

module.exports = EventsService