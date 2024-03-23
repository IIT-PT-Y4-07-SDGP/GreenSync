// Import necessary modules
const CommonService = require("./commonService");
const mongoose = require("mongoose");
const common = new CommonService();
const PickupModel = require("../models/pickupModel");

const pickup = new PickupModel();
class PickupManagementService {
  /**
   * Find all pickups
   * @returns pickup entity as array
   */
  async findAllPickups() {
    try {
      // Find all pickups
      const pickups = await PickupModel.find();
      return pickups;
    } catch (error) {
      console.error("Error finding all pickups:", error);
      return error;
    }
  }

  /**
   * Delete Driver by pickupId and driverId
   * @Param pickupId
   * @Query driverId
   */
  async DeleteDriverFromPickup(req) {
    const pickupId = req.params.pickupId;
    const driverId = req.body.driverId;
    console.log("req res");
    const pickup = await PickupModel.findById(pickupId);

    if (!pickup) {
      throw new Error("Pickup not found");
    }
    const assign = await PickupModel.findByIdAndDelete(pickupId, {
      driverId: driverId,
    });
    return assign;
  }

  /**
   *  Assigne pickups by truck and dirivers
   */
  async AssignePickupForDriver(req) {
    const pickupId = req.params.pickupId;
    const driverId = req.body.driverId;
    const assign = await pickup.findByIdAndUpdate(pickupId, {
      driverId: driverId,
    });
    // after assign the dirvers for pickup . then use  your sms or email funtion
    // get driver  email by driverIds
    //send the emails using dirverIds
    return assign;
  }

  /**
   * Update driver task status
   */
  async UpdateDriverStatus(req) {
    try {
      const pickupId = req.params.pickupId;
      const status = req.query.status;

      // Find the pickup by its ID
      const pickup = await PickupModel.findById(pickupId);

      if (!pickup) {
        throw new Error("Pickup not found");
      }

      // Update the status
      pickup.Status = status;

      // Save the updated pickup
      const updatedPickup = await pickup.save();
      return updatedPickup;
    } catch (error) {
      console.error("Error updating pickup status:", error);
      return error;
    }
  }
  /**
   * GP request for on demand pickups
   * @param {*} req
   * @param {*} res
   */
  async GPRequestForPickups(req) {
    try {
      const newPickup = new PickupModel({
        PickupDate: req.body.PickupDate,
        PickupStartTime: req.body.PickupStartTime,
        PickupEndTime: req.body.PickupEndTime,
        DumpType: req.body.DumpType,
        Location: req.body.Location,
        Status: "PENDING",
      });
      console.log(newPickup);
      const savedPickup = await newPickup.save();
      return savedPickup;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}

module.exports = PickupManagementService;
