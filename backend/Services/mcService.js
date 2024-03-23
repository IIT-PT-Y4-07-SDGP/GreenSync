// Import necessary modules
const CommonService = require("./commonService");
const AuthService = require("./authService");
const AuthService = require("./authService");
const mongoose = require("mongoose");
const common = new CommonService();
const MCModel = require("../models/MCModel");
const userModel = require('../models/userModel');
const accountModel = require("../models/accountModel");
const districtModel = require("../models/district");
const scheduleModel= require("../models/schedule");
const reportGarbageModel = require("../models/reportGarbageModel");

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


  static async getPickupPoints(MC) {
    try {
        // Find the MC document
        const mcDocument = await MCModel.findById(MC).populate('DistrictId');
        if (!mcDocument) {
            throw new Error(`MC '${MC}' not found`);
        }

        // Extract the district associated with the MC
        const districtName = mcDocument.DistrictId.name;

        // Find the district document and populate its pickups
        const districtWithPickups = await districtModel.findOne({ name: districtName });


        if (!districtWithPickups) {
            throw new Error(`District '${districtName}' not found or has no pickups`);
        }

        // Extract and return the pickup points for the district
        const pickups = districtWithPickups.pickups
        .filter(pickup => pickup.MC.equals(mcDocument._id))
        .map(pickup => ({ _id: pickup._id, name: pickup.name }));
        return pickups;
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
}

static async createSchedule(schedule) {
  const { date, time, MC, pickupPoints, typesOfWaste } = schedule;
  if (!date || !time || !MC || !pickupPoints || !typesOfWaste) {
      throw new Error("Missing required inputs");
  }
  const arrival = new Date(`${date}T${time}`);
  if (arrival < new Date()) {
    throw new Error("The schedule arrival time cannot be in the past");
}
  try {
      const mcDocument = await MCModel.findById(MC);
      if (!mcDocument) {
          throw new Error("Municipal council not found");
      }

      const { DistrictId } = mcDocument;

      // Validate each pickup point
      for (const pickupPointId of pickupPoints) {
          const pickupPoint = await districtModel.findOne({
              _id: DistrictId,
              'pickups._id': pickupPointId,
              'pickups.MC': MC
          });
          if (!pickupPoint) {
              throw new Error(`Invalid pickup point '${pickupPointId}' for the provided MC`);
          }
      }

      // Create the schedule
      const schedule = await scheduleModel.create({
          arrival,
          MC,
          DistrictId,
          pickupPoints,
          typesOfWaste
      });

      return {
        _id:schedule._id,
        arrival:schedule.arrival,
        DistrictId:schedule.DistrictId,
        pickupPoints:schedule.pickupPoints,
        typesOfWaste:schedule.typesOfWaste
      }; 
  } catch (error) {
      console.error(error);
      throw new Error(error.message);
  }
}

static async updateSchedule(scheduleId, updatedSchedule) {
  const { date, time, MC, pickupPoints,typesOfWaste } = updatedSchedule;
  
  if (!date || !time || !MC || !pickupPoints ||!typesOfWaste) {
    throw new Error("Missing required inputs");
  }
  
  // Check if the schedule exists and is related to the provided MC
  const existingSchedule = await scheduleModel.findById(scheduleId);
  if (!existingSchedule) {
    throw new Error("Schedule not found");
  }
  if (existingSchedule.MC.toString() !== MC) {
    throw new Error("The provided schedule is not related to the provided MC");
  }

  // Validate if the new date and time are not in the past
  const newArrival = new Date(`${date}T${time}`);
  if (newArrival < new Date()) {
    throw new Error("The updated schedule arrival time cannot be in the past");
  }

  // Validate each updated pickup point
  const mcDocument = await MCModel.findById(MC);
  const { DistrictId } = mcDocument;
  for (const pickupPointId of pickupPoints) {
    const pickupPoint = await districtModel.findOne({
      _id: DistrictId,
      'pickups._id': pickupPointId,
      'pickups.MC': MC
    });
    if (!pickupPoint) {
      throw new Error(`Invalid pickup point '${pickupPointId}' for the provided MC`);
    }
  }

  // Update the schedule
  try {
    const updatedSchedule = await scheduleModel.findByIdAndUpdate(scheduleId, {
      arrival: newArrival,
      pickupPoints: pickupPoints,
      typesOfWaste:typesOfWaste
    }, { new: true }); 
  
    return updatedSchedule;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
}

static async reportGarbage(reportDetails){
  let authorID = reportDetails.reportAuthor;
        if (await this.isAuthorInDB(authorID)){
          reportDetails.reportAuthor = authorID;
          const event = await reportGarbageModel.create(reportDetails);
          return event;
        } else {
            throw new Error('Organizer is not a registered users')
        }  
}

static async isAuthorInDB(authorID){
  try {
    const author = await userModel.findById(authorID);
            return !!author; // Returns true if organizer exists, false otherwise
        } catch (error) {
            throw new Error('User not exist in the database:', error); // Handle the error accordingly
        }
  }
}

module.exports = MCService;

