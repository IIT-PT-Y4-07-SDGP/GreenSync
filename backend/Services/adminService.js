// Import necessary modules
const userModel = require("../models/userModel");
const accountModel = require("../models/accountModel");
const MCModel = require("../models/MCModel");
const PRCModel = require("../models/PRCModel");
const mongoose = require("mongoose");
const CommonService = require("./commonService");
const AuthService = require("./authService");
const common = new CommonService();
const bcrypt = require("bcrypt");

class AdminService {
  async adminRegister(userDetails, res) {
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

    // Getting JWT Tokens
    let tokens = AuthService.generateJWTToken(
      userDetails.username,
      userDetails.userRole
    );

    try {
      session = await mongoose.startSession();
      session.startTransaction();

      try {
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

  async approveBusiness(Id, businessType) {
    let session;
    try {
      session = await mongoose.startSession();
      session.startTransaction();
      let user;
      if(businessType!=="PRC" && businessType!=="MC"){
        throw new Error("Invalid business type ");
      }


      if (businessType === "PRC") {
        const prcUser = await PRCModel.findOne({ _id: Id });
        if(!prcUser){
          throw new Error("No business found");
        }
        if (prcUser.PRCStatus === "APPROVED") {
          throw new Error("Business is already approved");
        }
        user = prcUser;
        if (prcUser) {
          prcUser.PRCStatus = "APPROVED";
          await prcUser.save({ session });
        }
      } else if (businessType === "MC") {
        const mcUser = await MCModel.findOne({ _id: Id });
        if(!mcUser){
          throw new Error("No business found");
        }
        if (mcUser.MCStatus === "APPROVED") {
          throw new Error("Business is already approved");
        }
        user = mcUser;
        if (mcUser) {
          mcUser.MCStatus = "APPROVED";
          await mcUser.save({ session });
        }
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
}

module.exports = AdminService;
