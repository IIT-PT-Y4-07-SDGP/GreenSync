// Import necessary modules
const userModel = require('../models/userModel');
const accountModel = require("../models/accountModel");
const mongoose = require("mongoose");
const CommonService = require("./commonService");
const AuthService = require("./authService");
const common = new CommonService();
const bcrypt = require('bcrypt');

class UserService {
    async userRegister(userDetails, res){
        //validate password
        if (common.isPasswordValid(userDetails.account.password)) {
            //hash password
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

        /* try{
            session = await mongoose.startSession();
            session.startTransaction();
            
            try {
                //create an account
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
                //create an user record
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
        } */

        try {
            session = await mongoose.startSession();
            const transactionOptions = { readPreference: 'primary', readConcern: { level: 'local' }, writeConcern: { w: 'majority' } };
        
            const result = await session.withTransaction(async () => {
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
        
                generalUserDetails = await userModel.create(
                    [{  
                        firstName: userDetails.firstName,
                        lastName: userDetails.lastName,
                        profilePic: "Default",
                        address: userDetails.address,
                        account: account[0]._id
                    }], { session }
                );
            }, transactionOptions);
        
            if (result) {
                console.log("The transaction was committed.");
            }
        } catch (error) {
            console.error('Error occurred:', error);
        } finally {
            session.endSession();
        }
        generalUserDetails = generalUserDetails[0];
        account = account[0];

        //set the refresh token in the response cookie
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

       async updateUser(userId, userDetails) {
        let session;
        try {
            session = await mongoose.startSession();
            session.startTransaction();

            // Update general user details
            const updatedGeneralUser = await userModel.findByIdAndUpdate(
                userId,
                {
                    $set: {
                        firstName: userDetails.firstName,
                        lastName: userDetails.lastName,
                        profilePic: userDetails.profilePic,
                        address: userDetails.address
                    }
                },
                { new: true, session }
            );

            // Update account details
            const updatedAccount = await accountModel.findByIdAndUpdate(
                updatedGeneralUser.account,
                {
                    $set: {
                        username: userDetails.username,
                        phoneNumber: userDetails.phoneNumber,
                        email: userDetails.email
                    }
                },
                { new: true, session }
            );

            // If password is provided, update it
            if (userDetails.password) {
                const account = await accountModel.findById(updatedGeneralUser.account);
                if (!account) {
                    throw new Error('Account not found');
                }
                //validate if the provided existing password is correct
                const isMatch = await bcrypt.compare(userDetails.oldPassword, account.password);
                if (!isMatch) {
                    throw new Error('Invalid previous password');
                }
                //hash new password
                const hashedPassword = await common.hashPassword(userDetails.password);
                updatedAccount.password = hashedPassword;
                await updatedAccount.save();
            }

            await session.commitTransaction();

            return {
                _id: updatedGeneralUser._id,
                firstName: updatedGeneralUser.firstName,
                lastName: updatedGeneralUser.lastName,
                points: updatedGeneralUser.points,
                profilePic: updatedGeneralUser.profilePic,
                address: updatedGeneralUser.address,
                account: {
                    _id: updatedAccount._id,
                    username: updatedAccount.username,
                    phoneNumber: updatedAccount.phoneNumber,
                    userRole: updatedAccount.userRole,
                    email: updatedAccount.email,
                    accountStatus: updatedAccount.accountStatus
                }
            };
        } catch (error) {
            console.error(error);
            await session.abortTransaction();
            throw new Error(error.message);
        } finally {
            if (session) {
                session.endSession();
            }
        }
    }


    async deleteUser(accountId) {
        let session;
        try {
            session = await mongoose.startSession();
            session.startTransaction();
            
            //validate input
            if (!accountId) {
                throw new Error("Account ID is required.");
            }
    
            const account = await accountModel.findById(accountId);
            //check whether the provided id is associated to a gp user
            if (!account || account.userRole !== "GP") {
                throw new Error("No account associated with the provided ID.");
            }

            //cannot delete an account thats restricted
            if(account.accountStatus==="BANNED" || account.accountStatus==="SUSPENDED"){
                throw new Error("Account cannot be deleted since its restricted");
            }
    
            //cannot delete an account thats already deleted
            if (account.accountStatus === "DELETED") {
                throw new Error("Account is already deleted.");
            }
    
            //update the status to deleted 
            account.accountStatus = "DELETED";
            await account.save({ session });
    
            await session.commitTransaction();
    
            return {
                _id: account._id,
                username: account.username,
                userRole: account.userRole,
                email: account.email,
                accountStatus: account.accountStatus
            };
        } catch (error) {
            if (session && session.inTransaction()) {
                await session.abortTransaction();
            }
            throw new Error(error.message);
        } finally {
            if (session) {
                session.endSession();
            }
        }
    }
   
    //geting user for the redeem points function
   async getUserById(userId) {
        try {
            const user = await userModel.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        }catch (error) {
            throw new Error(`Error fetching user from the database: ${error.message}`);
        }
    }
}

module.exports = UserService;
