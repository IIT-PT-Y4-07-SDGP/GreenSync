// Import necessary modules
const CommonService = require("./commonService");
const mongoose = require("mongoose");
const common = new CommonService();
const MCModal = require("../models/MCModel");
const accountModel = require("../models/accountModel");

class MCService {
    async MCRegister(MCDetails){
        // Validate password
        let hashedPassword;
        if (common.isPasswordValid(MCDetails.account.password)) {
            hashedPassword = await common.hashPassword(MCDetails.account.password)
        } else {
            throw new Error("Invalid password. Please ensure it meets the requirements.")
        } 
        
        // Validating Email
        if(!common.validateEmail(MCDetails.account.email)) throw new Error("Invalid email. Please enter a valid email.");
        
        // Validating phone number
        const phoneNumber = common.validatePhoneNumber(MCDetails.account.phoneNumber);
        if(!phoneNumber.isValid) throw new Error("Invalid phone number. Please enter valid phone number");

        MCDetails.account.password = hashedPassword;
        let session;
        let account
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
                        accountStatus: "INACTIVE"
                    }], { session }
                );
            } catch(error) {
                console.error(error);
                await session.abortTransaction();
                throw new Error('Error occurred when creating account');
            }
            
            try{
                await MCModal.create(
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
}

module.exports = MCService;