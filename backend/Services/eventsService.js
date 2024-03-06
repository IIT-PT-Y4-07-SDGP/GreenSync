const { model } = require('mongoose')
const { MongoClient, ObjectId } = require('mongodb');
const eventsModel = require('../models/eventsModel')
const userModel = require('../models/userModel');

class EventsService {
    async eventsOrganize(eventsDetails){
        let OrganizorID = eventsDetails.eventOrganizer;
        if (this.isOrganizerInDB(OrganizorID)){
            console.log('Organizer creating')
            eventsDetails.eventOrganizer = OrganizorID;
            const event = await eventsModel.create(eventsDetails);
            return event;
        }
        
    }
    isOrganizerInDB(organizerID){
        try {
            console.log(organizerID)
            // Assuming Account is your mongoose model for the 'accounts' collection
            const organizer = userModel.accounts.findByID(organizerID);
            console.log(organizer)
            return !!organizer; // Returns true if organizer exists, false otherwise
        } catch (error) {
            console.error('Error checking organizer in the database:', error);
            return false; // Handle the error accordingly
        }
    }
}

module.exports = EventsService