// Import necessary modules
const CommonService = require("./commonService");
const AuthService = require("./authService");
const mongoose = require("mongoose");
const common = new CommonService();
const MCModel = require("../models/MCModel");
const accountModel = require("../models/accountModel");
const districtModel = require("../models/district");

class MCService {
  static async MCRegister(MCDetails, res) {
    // Validate password
    if (common.isPasswordValid(MCDetails.account.password)) {
      MCDetails.account.password = await common.hashPassword(
        MCDetails.account.password
      );
    } else {
      throw new Error(
        "Invalid password. Please ensure it meets the requirements."
      );
    }

    // Validating Email
    if (!common.validateEmail(MCDetails.account.email))
      throw new Error("Invalid email. Please enter a valid email.");

    // Validating phone number
    const phoneNumber = common.validatePhoneNumber(
      MCDetails.account.phoneNumber
    );
    if (!phoneNumber.isValid)
      throw new Error("Invalid phone number. Please enter valid phone number");

    let session;
    let account;
    let MC;

    
    // Getting JWT Tokens
    let tokens = AuthService.generateJWTToken(
      MCDetails.account.username,
      MCDetails.account.userRole
    );

    try {
      session = await mongoose.startSession();
      session.startTransaction();

      try {
        account = await accountModel.create(
          [
            {
              username: MCDetails.account.username,
              phoneNumber: MCDetails.account.phoneNumber,
              userRole: "MC-ADMIN",
              email: MCDetails.account.email,
              password: MCDetails.account.password,
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
        MC = await MCModel.create(
          [
            {
              MCName: MCDetails.MCName,
              District: MCDetails.District,
              DistrictId: MCDetails.DistrictId,
              Address: MCDetails.Address,
              MCStatus: "PENDING",
              account: account[0]._id,
            },
          ],
          { session }
        );
        await session.commitTransaction();
      } catch (error) {
        console.error(error);
        await session.abortTransaction();
        throw new Error("Error occurred when uploading user data to database");
      }
    } catch (error) {
      console.error(error);
    } finally {
      if (session) {
        session.endSession();
      }
    }

    MC = MC[0];
    account = account[0];

    res.cookie("jwt", tokens.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return {
      _id: MC._id,
      MCName: MC.MCName,
      District: MC.District,
      DistrictId: MC.DistrictId,
      Address: MC.Address,
      MCStatus: MC.MCStatus,
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

  static async getAllMCUsers() {
    try {
      // Query all MC users from the database and populate the 'account' field
      const mcUsers = await MCModel.find().populate("account");

      // Process the data if needed
      const formattedMCUsers = mcUsers.map((mcUser) => {
        return {
          _id: mcUser._id,
          MCName: mcUser.MCName,
          District: mcUser.District,
          Address: mcUser.Address,
          MCStatus: mcUser.MCStatus,
          account: mcUser.account.map((acc) => ({
            _id: acc._id,
            username: acc.username,
            phoneNumber: acc.phoneNumber,
            userRole: acc.userRole,
            email: acc.email,
            accountStatus: acc.accountStatus,
            refreshToken: acc.refreshToken,
          })),
        };
      });

      return formattedMCUsers;
    } catch (error) {
      console.error(error);
      throw new Error("Error occurred while fetching MC users");
    }
  }

  static async getPendingMCUsers() {
    try {
      // Query all MC users from the database and populate the 'account' field
      const mcUsers = await MCModel.find({ MCStatus: "PENDING" }).populate(
        "account"
      );

      // Process the data if needed
      const formattedMCUsers = mcUsers.map((mcUser) => {
        return {
          _id: mcUser._id,
          MCName: mcUser.MCName,
          District: mcUser.District,
          Address: mcUser.Address,
          MCStatus: mcUser.MCStatus,
          account: mcUser.account.map((acc) => ({
            _id: acc._id,
            username: acc.username,
            phoneNumber: acc.phoneNumber,
            userRole: acc.userRole,
            email: acc.email,
            accountStatus: acc.accountStatus,
            refreshToken: acc.refreshToken,
          })),
        };
      });

      return formattedMCUsers;
    } catch (error) {
      console.error(error);
      throw new Error("Error occurred while fetching MC users");
    }
  }

  static async addPickupPoint(name, MC) {
    let session;
    let existingDistrict;
    if (!name || !MC) {
      throw new Error("Name and muncipal council id are required");
    }
    try {
      session = await mongoose.startSession();
      session.startTransaction();

      try {
        const existingMC = await MCModel.findById(MC);
        if (!existingMC) {
          throw new Error("the provided muncipal council id is not valid");
        }

        const district = existingMC.DistrictId;

        existingDistrict = await districtModel
          .findOne({ _id: district })
          .session(session);
        if (!existingDistrict) {
          throw new Error(`District does not exist`);
        }

        const existingPickupPoint = existingDistrict.pickups.find(
          (pickup) => pickup.name === name
        );
        if (existingPickupPoint) {
          throw new Error(
            `A pickup point with the name '${name}' already exists in district '${existingDistrict.name}'`
          );
        }

        existingDistrict.pickups.push({ name, MC });
        await existingDistrict.save();

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
    return existingDistrict;
  }
}

module.exports = MCService;
