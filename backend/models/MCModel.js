const mongoose = require("mongoose");
const accountSchema = require("./accountModel");
const schema = mongoose.Schema;


const MCSchema = new schema({
    MCName: {
        type: String,
        required: true,
        unique: true
    },
    District:{
        type:String,
        required: true
    },
    Address: {
        type: String,
        required: true
    },
    MCStatus: {
        type: String,
        required: true
    },
    account: [{
        type: schema.Types.ObjectId,
        ref: 'accounts',
        required:true
    }],
    DistrictId: {
        type: schema.Types.ObjectId,
        ref: 'districts',
        required:true
    },
}, { timestamps: true })

module.exports = mongoose.model('MC-account', MCSchema);