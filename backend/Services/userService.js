// Import necessary modules
const userModel = require('../models/userModel');
const accountModel = require("../models/accountModel");
const mongoose = require("mongoose");
const CommonService = require("./CommonService");
const AuthService = require("./AuthService");
const common = new CommonService();

class UserService {
    async userRegister(userDetails, res){
        if (common.isPasswordValid(userDetails.account.password)) {
            userDetails.account.password = await common.hashPassword(userDetails.account.password);
        } else {
            throw new Error("Invalid password. Please ensure it meets the requirements.")
        } 
        
        // Validating Email
        if(!common.validateEmail(userDetails.account.email)) throw new Error("Invalid email. Please enter a valid email.");
        
        // Validating phone number
        const phoneNumber = common.validatePhoneNumber(userDetails.account.phoneNumber);
        if(!phoneNumber.isValid) throw new Error("Invalid phone number. Please enter valid phone number");

        // updating the data to database
        let session;
        let account;
        let generalUserDetails;

        // Getting JWT Tokens
        let tokens = AuthService.generateJWTToken(userDetails.account.username,userDetails.account.userRole)

        try{
            session = await mongoose.startSession();
            session.startTransaction();
            
            try {
                account = await accountModel.create(
                    [{
                        username: userDetails.account.username,
                        phoneNumber: userDetails.account.phoneNumber,
                        userRole: userDetails.account.userRole,
                        email: userDetails.account.email,
                        password: userDetails.account.password,
                        accountStatus: "ACTIVE",
                        refreshToken:[tokens.refreshToken]
                    }], { session }
                );
            } catch(error) {
                console.error('Error creating account:', error);
                await session.abortTransaction();
                throw new Error('Error occurred when creating account');
            }
            
            try {
                generalUserDetails = await userModel.create(
                    [{  
                        firstName: userDetails.firstName,
                        lastName: userDetails.lastName,
                        profilePic: "Default", // Passing the values from frontend.. It is required to save the profile picture in server and pass the path in the db
                        address: userDetails.address,
                        account: account[0]._id
                    }], { session }
                );
                await session.commitTransaction();
                
            } catch (error) {
                console.error(error);
                await session.abortTransaction();
                throw new Error("Error occurred when uploading user data to database");
            }

        } catch (error){
            console.error(error);
        } finally {
            if (session) { session.endSession(); }
        }
        generalUserDetails = generalUserDetails[0];
        account = account[0];

        res.cookie("jwt", tokens.refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 24 * 60 * 60 * 1000,
        });

        return {
            _id: generalUserDetails._id,
            firstName: generalUserDetails.firstName,
            lastName: generalUserDetails.lastName,
            points: generalUserDetails.points,
            profilePic: generalUserDetails.profilePic,
            address: generalUserDetails.address,
            account: {
                _id: account._id,
                username: account.username,
                phoneNumber: account.phoneNumber,
                userRole: account.userRole,
                email: account.email,
                accountStatus: account.accountStatus,
                refreshToken: account.refreshToken,
                accessToken: tokens.accessToken
            }
        }
    }
}

module.exports = UserService;