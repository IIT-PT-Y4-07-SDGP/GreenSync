const mongoose = require("mongoose");
const accountSchema = require("../models/accountModel");
const schema = mongoose.Schema;

const generalUserSchema = new schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    points:{
        type:Number,
        default: 0
    },
    profilePic: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: true
    },
    account: {
        type: schema.Types.ObjectId,
        ref: 'accountSchema',
        required:true
    },
    participatedEvents: [{
        event:{
            type: schema.Types.ObjectId,
            ref: 'Events',
        },
        participationStatus: {
            type: String,
            required: false
        }
    }],
    tokenBalance: {
        type: String,
        required: false
    }

}, { timestamps: true })

module.exports = mongoose.model('general-user-Account', generalUserSchema);