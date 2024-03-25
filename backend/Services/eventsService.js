const eventsModel = require('../models/eventsModel')
const userModel = require('../models/userModel');
const randomString = require('randomstring');
const { ObjectId } = require('mongodb');

class EventsService {
    //used to create an event
    async eventsOrganize(eventsDetails) {
        let OrganizerID = eventsDetails.eventOrganizer;
        if (await this.isOrganizerInDB(OrganizerID)) {
            let eventTime = new Date(eventsDetails.eventTime)
            //check whther the event time is in the future
            if (eventTime > new Date()) {
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

    //checks whether the organizer is valid
    async isOrganizerInDB(organizerID) {
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
        } else {
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

    async participateUser(eventID, userID, res) {
        // Getting the user and event details
        let event;
        let user;

        // Check if eventId is provided
        if (eventID) {
            event = await eventsModel.findById(eventID)
            // Validating event
            if (!event) { throw new Error("Event not found") }
        } else {
            throw new Error('Event ID is required');
        }

        // Check if userID is provided
        if (userID) {
            user = await userModel.findById(userID);
            // Validating User
            if (!user) { throw new Error("User not found") }
            // organizer shouldn't participate
            if (userID == event.eventOrganizer) { throw new Error('Organizer not  allowed to participate') }
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

        // Add the event to the relevant user  
        // user.participatedEvents.push({event:eventID, participationStatus:"Registered"})
        // await event.save();

        await userModel.updateOne(
            { _id: userID }, // Query to find the user
            {
                $push: {
                    participatedEvents: {
                        event: eventID,
                        participationStatus: "Registered"
                    }
                },

            },
            { upsert: true }
        );
    }

    async getParticipatedEvents(userID) {
        try {
            let user = await userModel.findOne({ _id: userID }).populate('participatedEvents.event');
            if (!user) {
                throw new Error("User not found");
            }

            console.log(user.participatedEvents.length);
            // Manually update event ObjectIds
            user.participatedEvents.forEach(participatedEvent => {
                participatedEvent._id = new ObjectId(participatedEvent.event);
                console.log(participatedEvent.id);
            });

            return user;
        } catch (err) {
            console.error(err);
            throw new Error("Couldn't fetch participating events");
        }
    }


    async getTotalRegistered(eventId) {
        const event = await eventsModel.findOne({ _id: eventId }).populate('eventParticipant.user');
        return event;
    }
    catch(error) {
        throw new Error(`Error fetching event from the database: ${error.message}`);
    }

    // Verify Event token when user attend
    async verifyEventToken(eventID, userID, token) {
        if (!eventID && !userID && !token) {
            throw new Error("Missing parameter. Unable to continue the process")
        }

        let event;
        try {
            event = await eventsModel.findById(eventID);
        } catch (error) {
            throw new Error("Event not found")
        }

        let user;
        try {
            user = await userModel.findById(userID)
        } catch (error) {
            throw new Error("User not found")
        }

        // Check if the user is already attending the event
        const isAlreadyAttending = user.participatedEvents.some(event => event.event.toString() === eventID && event.participationStatus === 'Attending');
        if (isAlreadyAttending) {
            throw new Error("Already attending the event");
        }


        if (event.eventToken == token) {
            // Find the participant in the eventParticipant array with the matching userID
            const participantIndex = event.eventParticipant.findIndex(participant => participant.user.toString() === userID);
            if (participantIndex !== -1) {
                // Update the participation status to "Attending"
                event.eventParticipant[participantIndex].participationStatus = "Attending";
                try {
                    // Saving the updated event object
                    await event.save();
                } catch (error) {
                    throw new Error("Error updating event: " + error.message);
                }
            } else {
                throw new Error("User is not a participant in the event");
            }

            // Update the participation status of the user in the user's participatedEvents array
            const userEventIndex = user.participatedEvents.findIndex(event => event.event.toString() === eventID);
            if (userEventIndex !== -1) {
                user.participatedEvents[userEventIndex].participationStatus = "Attending";
                try {
                    // Saving the updated user object
                    await user.save();
                } catch (error) {
                    throw new Error("Error updating user: " + error.message);
                }
            } else {
                throw new Error("Event not found in user's participated events");
            }
            return true
        } else {
            return false
        }
    }


    async endEvent(eventId) {
        const event = await eventsModel.findById(eventId);
        if (!event) {
            throw new Error("Event not found");
        }

        if (event.eventStatus === 'Ended') {
            throw new Error("Event already ended");
        }

        // Update the event status to 'Ended'
        event.eventStatus = 'Ended';
        await event.save();

        // Update the points of the participants
        for (const participant of event.eventParticipant) {
            const user = await userModel.findById(participant.user);   
            if (participant.participationStatus === 'Attending') {
                user.points += 10; // Assuming 10 points for attending an event
                // Update the participation status in the event object      
                participant.participationStatus = 'Participated';
            }   
            
            // If the user Registered but didn't attend the event then the status will be 'Absent'
            if (participant.participationStatus === 'Registered') {
                participant.participationStatus = 'Absent';
            }

            // get all the absent users and change the participationStatus in participatedEvents array at user model
            if (participant.participationStatus === 'Absent') {
                const userEventIndex = user.participatedEvents.findIndex(event => event.event.toString() === eventId);
                if (userEventIndex !== -1) {
                    user.participatedEvents[userEventIndex].participationStatus = "Absent";
                }
            }
            await user.save();
            await event.save();
        }

        // Update the organizer's points
        const organizer = await userModel.findById(event.eventOrganizer);
        organizer.points += event.eventParticipant.length * 10; 
        await organizer.save();
        
        return event;
    }

    async deleteEvent(eventId, organizerID) {
        const event = await eventsModel.findById(eventId);
        if (!event) {
            throw new Error("Event not found");
        }

        // Only the organizer can delete the event
        if (event.eventOrganizer.toString() !== organizerID) {
            throw new Error("You are not authorized to delete this event");
        }else{
            // Delete the event
            await eventsModel.deleteOne({ _id: eventId });
        }

        // Delete the event from the user's participatedEvents array
        for (const participant of event.eventParticipant) {
            const user = await userModel.findById(participant.user);    
            const userEventIndex = user.participatedEvents.findIndex(event => event.event.toString() === eventId);
            if (userEventIndex !== -1) {
                user.participatedEvents.splice(userEventIndex, 1);
            }
            await user.save();
        }
    }
}

module.exports = EventsService;