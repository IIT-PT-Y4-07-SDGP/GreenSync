// Import necessary modules
const userModel = require("../models/userModel");
const accountModel = require("../models/accountModel");
const MCModel = require("../models/MCModel");
const PRCModel = require("../models/PRCModel");
const districtModel=require("../models/district")
const mongoose = require("mongoose");
const CommonService = require("./commonService");
const AuthService = require("./authService");
const common = new CommonService();
const bcrypt = require("bcrypt");

class AdminService {
  async adminRegister(userDetails, res) {
    //validate password
    if (common.isPasswordValid(userDetails.password)) {
      userDetails.password = await common.hashPassword(userDetails.password);
    } else {
      throw new Error(
        "Invalid password. Please ensure it meets the requirements."
      );
    }

    // Validating Email
    if (!common.validateEmail(userDetails.email))
      throw new Error("Invalid email. Please enter a valid email.");

    // Validating phone number
    const phoneNumber = common.validatePhoneNumber(userDetails.phoneNumber);
    if (!phoneNumber.isValid)
      throw new Error("Invalid phone number. Please enter valid phone number");

    // updating the data to database
    let session;
    let account;

    // Getting JWT Tokens by embedding the username and user role
    let tokens = AuthService.generateJWTToken(
      userDetails.username,
      userDetails.userRole
    );

    try {
      session = await mongoose.startSession();
      session.startTransaction();

      try {
        //create a record in the account model
        account = await accountModel.create(
          [
            {
              username: userDetails.username,
              phoneNumber: userDetails.phoneNumber,
              userRole: "SYSTEM-ADMIN",
              email: userDetails.email,
              password: userDetails.password,
              accountStatus: "ACTIVE",
              refreshToken: [tokens.refreshToken],
            },
          ],
          { session }
        );
        await session.commitTransaction();
      } catch (error) {
        console.error("Error creating account:", error);
        await session.abortTransaction();
        throw new Error("Error occurred when creating account");
      }
    } catch (error) {
      throw new Error(error.message);
    } finally {
      if (session) {
        session.endSession();
      }
    }
    account = account[0];

    //set the refresh token to the response cookie
    res.cookie("jwt", tokens.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return {
      _id: account._id,
      username: account.username,
      phoneNumber: account.phoneNumber,
      userRole: account.userRole,
      email: account.email,
      accountStatus: account.accountStatus,
      refreshToken: account.refreshToken,
      accessToken: tokens.accessToken,
    };
  }

  async updateAdmin(adminId, userDetails) {
    let session;
    try {
      session = await mongoose.startSession();
      session.startTransaction();

      // Update account details
      const updatedAccount = await accountModel.findByIdAndUpdate(
        adminId,
        {
          $set: {
            username: userDetails.username,
            phoneNumber: userDetails.phoneNumber,
            email: userDetails.email,
          },
        },
        { new: true, session }
      );

      // If password is provided, update it
      if (userDetails.password) {
        const account = await accountModel.findById(adminId);
        if (!account) {
          throw new Error("Account not found");
        }

        //check whther the existing password is correct before updating
        const isMatch = await bcrypt.compare(
          userDetails.oldPassword,
          account.password
        );

        if (!isMatch) {
          throw new Error("Invalid previous password");
        }
        const hashedPassword = await common.hashPassword(userDetails.password);
        updatedAccount.password = hashedPassword;
        await updatedAccount.save();
      }

      await session.commitTransaction();

      return {
        _id: updatedAccount._id,
        username: updatedAccount.username,
        phoneNumber: updatedAccount.phoneNumber,
        userRole: updatedAccount.userRole,
        email: updatedAccount.email,
        accountStatus: updatedAccount.accountStatus,
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

  //used to approve a business by the super admin
  async approveBusiness(Id, businessType,status) {
    let session;
    try {
      session = await mongoose.startSession();
      session.startTransaction();
      let user;

      //validate types and status inputted
      if (businessType !== "PRC" && businessType !== "MC") {
        throw new Error("Invalid business type ");
      }
      if (status !== "ACTIVE" && status !== "REJECTED") {
        throw new Error("Invalid status");
      }
      

      if (businessType === "PRC") {
        const prcUser = await PRCModel.findOne({ _id: Id });
        if (!prcUser) {
          throw new Error("No business found");
        }

        //only the business with pending status can be approved
        if (prcUser.PRCStatus !== "PENDING") {
          throw new Error("Business is not awaiting approval");
        }
        user = prcUser;
          //find the admin account associated with the business
          const adminAcoountId = prcUser.account[0];
          const adminAccount = await accountModel.findOne({
            _id: adminAcoountId,
          });
          if (!adminAccount || adminAccount.userRole !== "PRC-ADMIN") {
            throw new Error("Admin account not found");
          }

        //change admin acct and business  status 
          adminAccount.accountStatus = status;
          prcUser.PRCStatus = status;
          await prcUser.save({ session });
          await adminAccount.save({ session });
        
      } 
      else if (businessType === "MC") {
        const mcUser = await MCModel.findOne({ _id: Id });
        if (!mcUser) {
          throw new Error("No business found");
        }

        //only the business with pending status can be approved
        if (mcUser.MCStatus !== "PENDING") {
          throw new Error("Business is not awaiting approval");
        }
         user = mcUser;
          //find the admin account associated with the business
        const adminAcoountId = mcUser.account[0];
        const adminAccount = await accountModel.findById(adminAcoountId);
        if (!adminAccount || adminAccount.userRole !== "MC-ADMIN") {
          throw new Error("Admin account not found");
        }
        //change admin acct status 
        adminAccount.accountStatus = status;
          mcUser.MCStatus = status;
          await mcUser.save({ session });
          await adminAccount.save({ session });
      }else{
        throw new Error("Invalid business type")
      }

      await session.commitTransaction();

      return {
        user,
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

  async updateAdmin(adminId, userDetails) {
    let session;
    try {
      session = await mongoose.startSession();
      session.startTransaction();

      // Update account details
      const updatedAccount = await accountModel.findByIdAndUpdate(
        adminId,
        {
          $set: {
            username: userDetails.username,
            phoneNumber: userDetails.phoneNumber,
            email: userDetails.email,
          },
        },
        { new: true, session }
      );

      // If password is provided, update it
      if (userDetails.password) {
        const account = await accountModel.findById(adminId);
        if (!account) {
          throw new Error("Account not found");
        }

        //check whether the existing password is correct
        const isMatch = await bcrypt.compare(
          userDetails.oldPassword,
          account.password
        );
        if (!isMatch) {
          throw new Error("Invalid previous password");
        }
        const hashedPassword = await common.hashPassword(userDetails.password);
        updatedAccount.password = hashedPassword;
        await updatedAccount.save();
      }

      await session.commitTransaction();

      return {
        _id: updatedAccount._id,
        username: updatedAccount.username,
        phoneNumber: updatedAccount.phoneNumber,
        userRole: updatedAccount.userRole,
        email: updatedAccount.email,
        accountStatus: updatedAccount.accountStatus,
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

  //used to restrict (ban or suspend) a general public user
  async restrictGP(Id, status, duration) {
    let session;
    try {
      session = await mongoose.startSession();
      session.startTransaction();

      //validate provided status
      if (status !== "BANNED" && status !== "SUSPENDED") {
        throw new Error("Invalid status");
      }


      const GPaccount = await accountModel.findOne({ _id: Id });
      if (!GPaccount || GPaccount.userRole !== "GP") {
        throw new Error("General public account not found");
      }

      //cannot restrict an account which is already banned
      if (GPaccount.accountStatus === "BANNED") {
        throw new Error("Account is already banned");
      }
      if (GPaccount.accountStatus === "DELETED") {
        throw new Error("Account cannot be restrcited since its deleted");
      }

      //assign this to null by default
      GPaccount.suspensionEndDate=null;
      GPaccount.suspensionDuration=null;
      if (status === "SUSPENDED") {
        if (!duration) {
          throw new Error("duration is needed to suspend account");
        }
        //if suspended ,the suspensionEndDate and suspensionDuration will be assigned through moongose
        GPaccount.suspensionDuration = duration;
      }
      GPaccount.accountStatus = status;
      await GPaccount.save({ session });
      await session.commitTransaction();
      return {
        _id: GPaccount._id,
        username: GPaccount.username,
        accountStatus: GPaccount.accountStatus,
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

  //used to restrict a business (MC or PRC)
  async restrictBusiness(Id, type , status) {
    let session;
    let business;
    try {
      session = await mongoose.startSession();
      session.startTransaction();

      //validate status inputted
      if (status !== "DELETED" && status !== "SUSPENDED" && status !== "ACTIVE" ) {
        throw new Error("Invalid status");
      }
      if(type==="MC"){
        business=await MCModel.findOne({_id:Id});
        if(!business){
          throw new Error("no account found for this id")
        }

        //cannot restrict an account which is pending for approval
        if(business.MCStatus==="PENDING"){
          throw new Error("you are trying to alter a pending account")
        }

        //cannot restrict an account that has already been deleted
        if(business.MCStatus==="DELETED"){
          throw new Error("you are trying to alter a deleted account")
        }
        business.MCStatus=status;
      }

      if(type==="PRC"){
        business=await PRCModel.findOne({_id:Id});
        if(!business){
          throw new Error("no account found for this id")
        }

        //cannot restrict an account which is pending for approval
        if(business.PRCStatus==="PENDING"){
          throw new Error("you are trying to alter a pending account")
        }

        //cannot restrict an account that has already been deleted
        if(business.PRCStatus==="DELETED"){
          throw new Error("you are trying to alter a deleted account")
        }
        business.PRCStatus=status;
      }
      else{
        throw new Error("Invalid business type")
      }

      await business.save({ session });
      await session.commitTransaction();
      return {
        _id: business._id,
        accountStatus: status,
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

  //used to add a new district
  async registerDistrict(name) {
    let session;
    let district;
    if(!name){
      throw new Error("name is required")
    }
    try {
      session = await mongoose.startSession();
      session.startTransaction();

      try {
        const existingDistrict=await districtModel.findOne({name});

        //validate if provided disctrict name is unique
        if(existingDistrict){
          throw new Error("A district has been already registered for the given name")
        }

        //create district record
        district = await districtModel.create(
          [
            {
              name: name,
            },
          ],
          { session }
        );
        await session.commitTransaction();
      } catch (error) {
        await session.abortTransaction();
        throw new Error(error.message);
      }
    } catch (error) {
      throw new Error(error.message);
    } finally {
      if (session) {
        session.endSession();
      }
    }

    return {
      district
    };
  }


}

module.exports = AdminService;
