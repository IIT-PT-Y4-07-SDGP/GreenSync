const mongoose = require("mongoose");
const accountSchema = require("./accountModel");
const schema = mongoose.Schema;


const PRCSchema = new schema({
    PRCName: {
        type: String,
        required: true,
        unique: true
    },
    PRCBusinessRegNumber: {
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
    PRCStatus: {
        type: String,
        required: true
    },
    account: [{
        type: schema.Types.ObjectId,
        ref: 'accountSchema',
        required:true
    }],
}, { timestamps: true })

module.exports = mongoose.model('prc-account', PRCSchema);