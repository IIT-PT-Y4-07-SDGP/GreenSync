// Import necessary modules
const CommonService = require("./CommonService");
const AuthService = require("./AuthService");
const mongoose = require("mongoose");
const common = new CommonService();
const MCModel = require("../models/MCModel");
const accountModel = require("../models/accountModel");

class MCService {
    static async MCRegister(MCDetails){
        // Validate password
        if (common.isPasswordValid(MCDetails.account.password)) {
            MCDetails.account.password = await common.hashPassword(MCDetails.account.password)
        } else {
            throw new Error("Invalid password. Please ensure it meets the requirements.")
        } 
        
        // Validating Email
        if(!common.validateEmail(MCDetails.account.email)) throw new Error("Invalid email. Please enter a valid email.");
        
        // Validating phone number
        const phoneNumber = common.validatePhoneNumber(MCDetails.account.phoneNumber);
        if(!phoneNumber.isValid) throw new Error("Invalid phone number. Please enter valid phone number");

        let session;
        let account;
        let MC;

        // Getting JWT Tokens
        let tokens = AuthService.generateJWTToken(MCDetails.account.username,MCDetails.account.userRole);

        try{
            session = await mongoose.startSession();
            session.startTransaction();
            
            try {
                account = await accountModel.create(
                    [{
                        username: MCDetails.account.username,
                        phoneNumber: MCDetails.account.phoneNumber,
                        userRole: "MC-ADMIN",
                        email: MCDetails.account.email,
                        password: MCDetails.account.password,
                        accountStatus: "INACTIVE",
                        refreshToken:[tokens.refreshToken]
                    }], { session }
                );
            } catch(error) {
                console.error(error);
                await session.abortTransaction();
                throw new Error('Error occurred when creating account');
            }
            
            try{
                MC = await MCModel.create(
                    [{  
                        MCName: MCDetails.MCName,
                        District: MCDetails.District, 
                        Address: MCDetails.Address,
                        MCStatus: "PENDING",
                        account: account[0]._id,
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

        MC = MC[0];
        account = account[0];
        return {
            _id: MC._id,
            MCName: MC.MCName,
            District: MC.District, 
            Address: MC.Address,
            MCStatus: MC.MCStatus,
            account:{
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

module.exports = MCService;