const mongoose = require("mongoose");
const MCmodel=require("./MCModel")
const Schema = mongoose.Schema;

const pickupSchema = new Schema({
    name: {
        type: String,
        required: false
    },
    MC: {
        type: Schema.Types.ObjectId,
        ref: 'MC-account',
        required:true
    },
});

const districtSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    pickups: [pickupSchema]
}, { timestamps: true });

module.exports = mongoose.model('districts', districtSchema);
