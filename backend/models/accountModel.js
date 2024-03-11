const mongoose = require("mongoose");
const schema = mongoose.Schema;

const accountSchema = new schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    userRole: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    accountStatus:{
        type: String,
        required: true
    },
    refreshToken:{
        type:[String]
    },
}, { timestamps: true })

module.exports = mongoose.model('accounts', accountSchema);