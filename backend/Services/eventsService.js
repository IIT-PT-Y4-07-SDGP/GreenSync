const mongoose = require('mongoose')
const eventsModel = require('../models/eventsModel')
const userModel = require('../models/userModel');

class EventsService {
    async eventsOrganize(eventsDetails){
        let OrganizorID = eventsDetails.eventOrganizer;
        if (await this.isOrganizerInDB(OrganizorID)){
            let eventTime = new Date(eventsDetails.eventTime)
            if (eventTime > new Date()){
                eventsDetails.eventOrganizer = OrganizorID;
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
}

module.exports = EventsService