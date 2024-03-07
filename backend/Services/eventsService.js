const mongoose = require('mongoose')
const eventsModel = require('../models/eventsModel')
const userModel = require('../models/userModel');

class EventsService {
    async eventsOrganize(eventsDetails){
        let OrganizorID = eventsDetails.eventOrganizer;
        if (await this.isOrganizerInDB(OrganizorID)){
            let eventTime = new Date(eventsDetails.eventTime)
            if (eventTime > new Date()){
                console.log('Creating Event')
                eventsDetails.eventOrganizer = OrganizorID;
                const event = await eventsModel.create(eventsDetails);
                
                return event;
            } else {
                console.log('Event Time is not a Future Time')
            }
        } else {
            console.log('Organizer is not a registered users')
        }
        //Handle the case when the organizer doesn't exist
        
    }
    async isOrganizerInDB(organizerID){
        try {
            // Assuming Account is your mongoose model for the 'accounts' collection
            const organizer = await userModel.findById(organizerID);
            return !!organizer; // Returns true if organizer exists, false otherwise
        } catch (error) {
            console.error('Error checking organizer in the database:', error);
            return false; // Handle the error accordingly
        }
    }
}

module.exports = EventsService