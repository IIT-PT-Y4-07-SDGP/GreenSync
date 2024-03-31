const { Timestamp, ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const schema = mongoose.Schema;

const createComplaintSchema = new schema({
    reportTitle: {
        type: String,
        required: true,
    },
     reportAuthor: {
        type: ObjectId,
        required: true,
     },
     reportDescription: {
        type: String,
        required: true,
     },
     reportLocation: {
        type: String,
        required: true,
     },
     createdTimestamp: {
        type: String,
        required: true,
     }
})
module.exports = mongoose.model('Complaints', createComplaintSchema);