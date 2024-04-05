// Import necessary modules
const CommonService = require("./commonService");
const mongoose = require("mongoose");
const common = new CommonService();
const AuthService = require("./authService");
const PRCModal = require("../models/PRCModel");
const accountModel = require("../models/accountModel");
const { MongoClient } = require('mongodb');
const config = require('../configuration/config');
const uri = config.MONGO_URI;
const prcModel = require('../models/PRCModel')



class PRCService {
  async PRCRegister(prcDetails, res) {
    // Validate password
    let hashedPassword;
    if (common.isPasswordValid(prcDetails.account.password)) {

      //hash provided password
      hashedPassword = await common.hashPassword(prcDetails.account.password);
    } else {
      throw new Error(
        "Invalid password. Please ensure it meets the requirements."
      );
    }

    // Validating Email
    if (!common.validateEmail(prcDetails.account.email))
      throw new Error("Invalid email. Please enter a valid email.");

    // Validating phone number
    const phoneNumber = common.validatePhoneNumber(
      prcDetails.account.phoneNumber
    );
    if (!phoneNumber.isValid)
      throw new Error("Invalid phone number. Please enter valid phone number");

    prcDetails.account.password = hashedPassword;
    let session;
    let account;
    let PRC;

    // Getting JWT Tokens
    let tokens = AuthService.generateJWTToken(
      prcDetails.account.username,
      prcDetails.account.userRole
    );

    // try {
    //   session = await mongoose.startSession();
    //   session.startTransaction();

    //   try {
    //     //create PRC account 
    //     account = await accountModel.create(
    //       [
    //         {
    //           username: prcDetails.account.username,
    //           phoneNumber: prcDetails.account.phoneNumber,
    //           userRole: prcDetails.account.userRole,
    //           email: prcDetails.account.email,
    //           password: prcDetails.account.password,
    //           accountStatus: "INACTIVE",
    //           refreshToken: [tokens.refreshToken],
    //         },
    //       ],
    //       { session }
    //     );
    //   } catch (error) {
    //     console.error(error);
    //     await session.abortTransaction();
    //   }

    //   try {
    //     //create PRC record
    //     PRC = await PRCModal.create(
    //       [
    //         {
    //           PRCName: prcDetails.PRCName,
    //           PRCBusinessRegNumber: prcDetails.PRCBusinessRegNumber,
    //           District: prcDetails.District,
    //           Address: prcDetails.Address,
    //           PRCStatus: "PENDING",
    //           account: account[0]._id,
    //         },
    //       ],
    //       { session }
    //     );
    //     await session.commitTransaction();
    //   } catch (error) {
    //     console.log(error);
    //     await session.abortTransaction();
    //   }
    // } catch (error) {
    //   console.log(error);
    //   if(error.code === 11000){
    //     if(error.keyValue.username){
    //         throw new Error("Username already exists");
    //     } else if(error.keyValue.email){
    //         throw new Error("Email already exists");
    //     } else if(error.keyValue.phoneNumber){
    //         throw new Error("Phone number already exists");
    //     }
    //   }
    //   throw new Error(error);
    // } finally {
    //   if (session) {
    //     session.endSession();
    //   }
    // }

    try {
      session = await mongoose.startSession();
      const transactionOptions = { readPreference: 'primary', readConcern: { level: 'local' }, writeConcern: { w: 'majority' } };

      const result = await session.withTransaction(async () => {
        //create PRC account 
        account = await accountModel.create(
          [{
            username: prcDetails.account.username,
            phoneNumber: prcDetails.account.phoneNumber,
            userRole: prcDetails.account.userRole,
            email: prcDetails.account.email,
            password: prcDetails.account.password,
            accountStatus: "INACTIVE",
            refreshToken: [tokens.refreshToken],
          }], { session }
        );

        // create PRC record
        PRC = await PRCModal.create(
          [{
            PRCName: prcDetails.PRCName,
            PRCBusinessRegNumber: prcDetails.PRCBusinessRegNumber,
            District: prcDetails.District,
            Address: prcDetails.Address,
            PRCStatus: "PENDING",
            account: account[0]._id,
          }],
          { session }
        );
      }, transactionOptions);

      if (result) {
        console.log("The transaction was committed.");
      }

    } catch (error) {
      console.error('Error occurred:', error);
      if (error.code === 11000) {
        if (error.keyValue.username) {
          throw new Error("Username already exists");
        } else if (error.keyValue.email) {
          throw new Error("Email already exists");
        } else if (error.keyValue.phoneNumber) {
          throw new Error("Phone number already exists");
        }
      }
      throw new Error(error);
    } finally {
      session.endSession();
    }

    PRC = PRC[0];
    account = account[0];

    //set the refresh token in the response cookie
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
      account: {
        _id: account._id,
        username: account.username,
        phoneNumber: account.phoneNumber,
        userRole: account.userRole,
        email: account.email,
        accountStatus: account.accountStatus,
        refreshToken: account.refreshToken,
        accessToken: tokens.accessToken,
      },
    };
  }

  async getPrcList() {
    try {
      //fetch all prcs
      return await prcModel.find({}, {
        _id: 0,
        PRCName: 1,
        PRCBusinessRegNumber: 1,
        District: 1,
        Address: 1,
        PRCStatus: 1
      });
    } catch (error) {
      throw new Error(`Error fetching events from the database: ${error.message}`);
    }
  }

}

module.exports = PRCService;
