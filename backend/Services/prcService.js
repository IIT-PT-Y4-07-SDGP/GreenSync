// Import necessary modules
const CommonService = require("./commonService");
const mongoose = require("mongoose");
const common = new CommonService();
const AuthService = require("./authService");
const PRCModal = require("../models/PRCModel");
const accountModel = require("../models/accountModel");

class PRCService {
    async PRCRegister(prcDetails, res){
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
        let account;
        let PRC;

        // Getting JWT Tokens
        let tokens = AuthService.generateJWTToken(prcDetails.account.username,prcDetails.account.userRole);

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
                PRC = await PRCModal.create(
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

        PRC = PRC[0];
        account = account[0];

        res.cookie("jwt", tokens.refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 24 * 60 * 60 * 1000,
        });

        return {
            _id: PRC._id,
            PRCName: PRC.PRCName,
            PRCBusinessRegNumber: PRC.PRCBusinessRegNumber,
            District: PRC.District, 
            Address: PRC.Address,
            PRCStatus: PRC.PRCStatus,
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

     async getPRCByUsername(username) {
        if(!username){
            throw new Error("Username is required");
        }
        try {
            const account = await accountModel.findOne({ username });
            if (!account) {
                throw new Error("PRC not found");
            }
            const accountId=account._id;
            const PRC = await PRCModal.findOne({ account:accountId }).populate('account');
            if (!PRC) {
                throw new Error("PRC not found");
            }
      
      
            return {
              _id:PRC._id,
              PRCName:PRC.PRCName,
              PRCBusinessRegNumber:PRC.PRCBusinessRegNumber,
              District:PRC.District,
              Address:PRC.Address,
              PRCStatus:PRC.PRCStatus,
              account:{
                  _id:PRC.account[0]._id,
                  username:PRC.account[0].username,
                  phoneNumber:PRC.account[0].phoneNumber,
                  userRole:PRC.account[0].userRole,
                  email:PRC.account[0].email,
                  accountStatus:PRC.account[0].accountStatus,
              }
          };
        
        } catch (error) {
            console.error(error);
            throw new Error(error.message);
        }
      }
}

module.exports = PRCService;
