// Import necessary modules
const CommonService = require("./commonService");
const mongoose = require("mongoose");
const common = new CommonService();
const PRCModal = require("../models/PRCModel");
const accountModel = require("../models/accountModel");

class PRCService {
    async PRCRegister(prcDetails){
        // Validate password
        let hashedPassword;
        if (common.isPasswordValid(prcDetails.account.password)) {
            hashedPassword = await common.hashPassword(prcDetails.account.password)
        } else {
            throw new Error("Invalid password. Please ensure it meets the requirements.")
        } 
        
        // Validating Email
        if(!common.validateEmail(prcDetails.account.email)) throw new Error("Invalid email. Please enter a valid email.");
        
        // Validating phone number
        const phoneNumber = common.validatePhoneNumber(prcDetails.account.phoneNumber);
        if(!phoneNumber.isValid) throw new Error("Invalid phone number. Please enter valid phone number");

        prcDetails.account.password = hashedPassword;
        let session;
        let account
        try{
            session = await mongoose.startSession();
            session.startTransaction();
            
            try {
                account = await accountModel.create(
                    [{
                        username: prcDetails.account.username,
                        phoneNumber: prcDetails.account.phoneNumber,
                        userRole: prcDetails.account.userRole,
                        email: prcDetails.account.email,
                        password: prcDetails.account.password,
                        accountStatus: "INACTIVE"
                    }], { session }
                );
            } catch(error) {
                console.error(error);
                await session.abortTransaction();
                throw new Error('Error occurred when creating account');
            }
            
            try{
                await PRCModal.create(
                    [{  
                        PRCName: prcDetails.PRCName,
                        PRCBusinessRegNumber: prcDetails.PRCBusinessRegNumber,
                        District: prcDetails.District, 
                        Address: prcDetails.Address,
                        PRCStatus: "PENDING",
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

module.exports = PRCService;