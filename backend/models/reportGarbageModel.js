const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");
const schema = mongoose.Schema;

const reportGarbageSchema = new schema({
    reportTitle: {
        type: String,
        required: true,
    },
     reportTime: {
        type: Timestamp,
        required: true,
     },
     reportDate: {
        type: Date,
        required: true,
     },
     reportImages: {
        type: String,
        required: false,
     },
     reportDescription: {
        type: String,
        required: false,
     }
})
module.exports = mongoose.model('Reports', reportGarbageSchema);