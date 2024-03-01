// Import necessary modules
const bcrypt = require("bcrypt");
const emailValidator = require("email-validator");
const phoneNumberValidation = require("phone");
const userModel = require('../models/userModel');
const AuthService = require("../Services/authService");
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
        if(!emailValidator.validate(userDetails.email)) throw new Error("Invalid email. Please enter a valid email.");
        
        // Validating phone number
        const phoneNumber = phoneNumberValidation.phone(userDetails.phoneNumber);
        if(!phoneNumber.isValid) throw new Error("Invalid phone number. Please enter valid phone number");

        userDetails.account.password = hashedPassword;
        const user = await userModel.create(userDetails);
        return user;
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