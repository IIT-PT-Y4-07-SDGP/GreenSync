const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },  
    email: {
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
    points:{
        type:Number,
        default: 0
    },
    account: {
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        profilePic: {
            type: String,
            required: false
        },
    },
}, { timestamps: true })

module.exports = mongoose.model('user-Account',userSchema);