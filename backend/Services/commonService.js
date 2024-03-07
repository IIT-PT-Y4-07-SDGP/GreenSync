// Import necessary modules
const bcrypt = require("bcrypt");
const emailValidator = require("email-validator");
const phoneNumberValidation = require("phone");

class CommonService{
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

    async hashPassword(password){
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    }

    validateEmail(email){
        return emailValidator.validate(email);
    }

    validatePhoneNumber(phoneNumber){
        return phoneNumberValidation.phone(phoneNumber)
    }
}

module.exports = CommonService;