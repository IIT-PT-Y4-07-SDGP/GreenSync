// Import necessary modules
const CommonService = require("./commonService");
const mongoose = require("mongoose");
const common = new CommonService();
const AuthService = require("./authService");
const PRCModal = require("../models/PRCModel");
const accountModel = require("../models/accountModel");

class PRCService {
  async PRCRegister(prcDetails, res) {
    // Validate password
    let hashedPassword;
    if (common.isPasswordValid(prcDetails.account.password)) {
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

    try {
      session = await mongoose.startSession();
      session.startTransaction();

      try {
        account = await accountModel.create(
          [
            {
              username: prcDetails.account.username,
              phoneNumber: prcDetails.account.phoneNumber,
              userRole: prcDetails.account.userRole,
              email: prcDetails.account.email,
              password: prcDetails.account.password,
              accountStatus: "INACTIVE",
              refreshToken: [tokens.refreshToken],
            },
          ],
          { session }
        );
      } catch (error) {
        console.error(error);
        await session.abortTransaction();
        throw new Error("Error occurred when creating account");
      }

      try {
        PRC = await PRCModal.create(
          [
            {
              PRCName: prcDetails.PRCName,
              PRCBusinessRegNumber: prcDetails.PRCBusinessRegNumber,
              District: prcDetails.District,
              Address: prcDetails.Address,
              PRCStatus: "PENDING",
              account: account[0]._id,
            },
          ],
          { session }
        );
        await session.commitTransaction();
      } catch (error) {
        console.log(error);
        await session.abortTransaction();
        throw new Error("Error occurred when uploading user data to database");
      }
    } catch (error) {
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

  /**
   *  Assigne pickups by truck and dirivers
   */
  async PRCAssignePickups(req, res) {
    const prcId = req.params.prcId;
    const driverIds = req.body.driverIds;

    console.log(driverIdS);
    const assign = await PRCModal.findByIdAndUpdate(prcId, {
      driverIds: driverIds,
    });
    // after assign the dirvers for pickup . then use  your sms or email funtion
    // get driver  email by driverIds
    //send the emails using dirverIds
    return assign;
  }

  /**
   * Change driver for pickup
   * @param {*} @prcId unique prcId
   * @param {*} driverIds[] are array
   */
  async PRCChangeDriver(prcId, driverIds) {
    const id = prcId;
    try {
      let prc = await PRCModal.findByIdAndUpdate(id, {
        driverIds: driverIds,
      });
      return prc;
    } catch (error) {
      console.log(error);
    }
  }
  /**
   * Update driver task status
   */
  async PRCDriverUpdateTask(req) {
    try {
      const prcId = req.params.prcId;
      const task = req.query.task;
      let updateTask = await PRCModal.findByIdAndUpdate(new ObjectId(prcId), {
        PRCStatus: task,
      });
      return updateTask;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = PRCService;
