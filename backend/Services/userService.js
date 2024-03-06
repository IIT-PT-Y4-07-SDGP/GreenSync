// Import necessary modules
const bcrypt = require("bcrypt");
const emailValidator = require("email-validator");
const phoneNumberValidation = require("phone");
const userModel = require('../models/userModel');
const accountModel = require("../models/accountModel");
const AuthService = require("../Services/authService");
const mongoose = require("mongoose");
const authService = new AuthService();

class UserService {
    async userRegister(userDetails){
        let hashedPassword;
        if (this.isPasswordValid(userDetails.account.password)) {
           const salt = await bcrypt.genSalt(10);
           hashedPassword = await bcrypt.hash(userDetails.account.password, salt);
        } else {
            throw new Error("Invalid password. Please ensure it meets the requirements.")
        } 
        
        // Validating Email
        if(!emailValidator.validate(userDetails.account.email)) throw new Error("Invalid email. Please enter a valid email.");
        
        // Validating phone number
        const phoneNumber = phoneNumberValidation.phone(userDetails.account.phoneNumber);
        if(!phoneNumber.isValid) throw new Error("Invalid phone number. Please enter valid phone number");

        userDetails.account.password = hashedPassword;
        let session;
        let account
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
                    }], { session }
                );
            } catch(error) {
                console.error('Error creating account:', error);
                await session.abortTransaction();
                throw new Error('Error occurred when creating account');
            }
            
            try{
                await userModel.create(
                    [{  
                        firstName: userDetails.firstName,
                        lastName: userDetails.lastName,
                        profilePic: "Default", // Passing the values from frontend.. It is required to save the profile picture in server and pass the path in the db
                        account: account[0]._id
                    }], { session }
                    );
                    await session.commitTransaction();
                    console.log(account);
                } catch (error) {
                    console.log(error);
                    await session.abortTransaction();
                    throw new Error("Error occurred when uploading user data to database");
                }
                
            } catch (error){
                console.log(error);
            } finally {
                if (session) {
                    session.endSession();
            }
        }
        return account
    }

    isPasswordValid(password){
        // Valid password should consist of 
        // minimum of 8 characters, special characters, LowerCase, UpperCase and numbers 
        const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        const minLength = 8
        const hasLowerCase = /[a-z]/
        const hasUpperCase = /[A-Z]/
        const hasNumbers = /[0-9]/;
        return (
            password.length >= minLength &&
            hasSpecialChar.test(password) && 
            hasLowerCase.test(password) &&
            hasUpperCase.test(password) &&
            hasNumbers.test(password)
        );
    }
}

module.exports = UserService;