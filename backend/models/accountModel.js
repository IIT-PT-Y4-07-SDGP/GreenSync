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
    suspensionEndDate: {
        type: Date,
        default: null
    },
    suspensionDuration: {
        type: Number,
        default: null
    }
}, { timestamps: true })


accountSchema.pre('save', async function(next) {
    if (this.isModified('accountStatus') && this.accountStatus === 'SUSPENDED' && this.suspensionDuration) {
        this.suspensionEndDate = new Date(Date.now() + this.suspensionDuration * 60 * 60 * 1000);
    } else if (this.isModified('suspensionEndDate') && this.suspensionEndDate <= new Date()) {
        if(this.accountStatus === 'SUSPENDED'){
            this.accountStatus = 'ACTIVE';
        }
        this.suspensionEndDate = null; 
        this.suspensionDuration = null; 
    }
    next();
});

module.exports = mongoose.model('accounts', accountSchema);