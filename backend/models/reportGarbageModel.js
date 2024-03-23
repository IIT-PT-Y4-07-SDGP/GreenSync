const { Timestamp, ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const schema = mongoose.Schema;

const reportGarbageSchema = new schema({
    reportTitle: {
        type: String,
        required: true,
    },
     reportTime: {
        type: Date,
        required: true,
     },
     reportPictures: {
        type: String,
        required: false,
     },
     reportAuthor: {
        type: ObjectId,
        required: true,
     },
     reportDescription: {
        type: String,
        required: false,
     }
})
module.exports = mongoose.model('Reports', reportGarbageSchema);