const mongoose = require('mongoose');
const userScheme = require("../models/userModel");
const schema = mongoose.Schema;


const WalletSchema = new schema({
    privateKey: {
        type: String,
        required: true
    },
    publicKey: {
        type: String,
        required: true
    },
    userId: {
        type: schema.Types.ObjectId,
        ref: 'general-user-Account',
        required: true
    }
})

module.exports = mongoose.model('Wallet', WalletSchema);