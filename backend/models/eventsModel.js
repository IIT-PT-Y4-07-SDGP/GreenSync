const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const schema = mongoose.Schema;
const userModel = require("../models/userModel")

const eventSchema = new schema({
    eventName: {
        type: String,
        required: true
    },
    eventTime: { 
        type: Date,
        required: true
    },
    eventLocation: {
        type: String,
        required: true
    },
    eventOrganizer: {
        type: ObjectId,
        required: true
    },
    eventParticipant: [{
        user:{
            type: schema.Types.ObjectId,
            ref: 'general-user-Account',
        },
        participationStatus: {
            type: String,
            default: "Registered",
            required: false
        }
    }],
    eventToken: {
        type: String,
        default: 0,
        required: true
    },
    eventDescription: {
        type: String,
        required: true
    },
    eventStatus: {
        type: String,
        default: 'Not Started',
        required: true
    }

}, {timestamps: true})

module.exports = mongoose.model('Events',eventSchema);