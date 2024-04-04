// Import necessary modules
const CommonService = require("./commonService");
const mongoose = require("mongoose");
const common = new CommonService();
const PickupModel = require("../models/pickupModel");

const pickup = new PickupModel();
class PickupManagementService {
  async findPickupByPickupId(req) {
    const _id = req.params.pickupId;
    const pickup = await PickupModel.findById(_id);
    if (!pickup) {
      throw new Error("Pickup not found");
    }

    return pickup;
  }

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
    try {
      const _id = req.params.pickupId;

      // Check if the pickup exists
      const pickup = await PickupModel.findById(_id);
      if (!pickup) {
        throw new Error("Pickup not found");
      }

      // Remove the driver ID from the pickup document
      pickup.DriverId = null;
      const updatedPickup = await pickup.save();

      // Return the updated pickup document
      return updatedPickup;
    } catch (error) {
      console.error("Error deleting driver from pickup:", error);
      throw error;
    }
  }

  /**
   *  Assigne pickups by truck and dirivers
   */
  async AssignePickupForDriver(req) {
    const _id = req.params.pickupId;
    const driverId = req.body.driverId;
    const assign = await PickupModel.findByIdAndUpdate(_id, {
      DriverId: driverId,
    });
    const findById = await PickupModel.findById(_id);
    // after assign the dirvers for pickup . then use  your sms or email funtion
    // get driver  email by driverIds
    // send the emails using dirverIds
    return findById;
  }

  /**
   * Update driver task status
   */
  async UpdateDriverStatus(req) {
    try {
      const _id = req.params.pickupId;
      const status = req.query.status;

      // Find the pickup by its ID
      const pickup = await PickupModel.findById(_id);

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
        PickupDate: req.body.pickupDate,
        PickupStartTime: req.body.pickupStartTime,
        PickupEndTime: req.body.pickupEndTime,
        DumpType: req.body.dumpType,
        Location: req.body.location,
        CustomerId: req.body.customerId,
        Status: "NEW",
      });
      console.log(newPickup);
      const savedPickup = await newPickup.save();
      return savedPickup;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async FindPickupByDriverId(req) {
    try {
      const driverId = req.params.driverId;
      console.log(typeof driverId);
      // Find pickups with the given driverId
      const pickups = await PickupModel.find({ DriverId: driverId });

      // Return the pickups found
      return pickups;
    } catch (error) {
      console.error("Error finding pickups by driver ID:", error);
      throw error;
    }
  }

  async FindPickupHistoryByCustomerId(req) {
    try {
      const customerId = req.params.customerId;
      // Find pickups with the given driverId
      const pickups = await PickupModel.find({ CustomerId: customerId });

      // Return the pickups found
      return pickups;
    } catch (error) {
      console.error("Error finding pickups by driver ID:", error);
      throw error;
    }
  }

  async UpdatePickupByCustomer(req) {
    try {
      const _id = req.params.pickupId;

      // Find the pickup by its ID
      const pickup = await PickupModel.findById(_id);

      if (!pickup) {
        throw new Error("Pickup not found");
      }
      pickup.PickupDate = req.body.pickupDate ?? pickup.PickupDate;
      pickup.PickupStartTime =
        req.body.pickupStartTime ?? pickup.PickupStartTime;
      pickup.PickupEndTime = req.body.pickupEndTime ?? pickup.PickupEndTime;
      pickup.Location = req.body.location ?? pickup.Location;
      // Save the updated pickup document
      const updatedPickup = await pickup.save();

      return updatedPickup;
    } catch (error) {
      console.error("Error updating pickup status:", error);
      return error;
    }
  }

  async UpdatePickupByDriver(req) {
    try {
      const _id = req.params.pickupId;

      // Find the pickup by its ID
      const pickup = await PickupModel.findById(_id);

      if (!pickup) {
        throw new Error("Pickup not found");
      }
      pickup.TotalPrice = req.body.totalPrice ?? pickup.TotalPrice;
      const updatedPickup = await pickup.save();

      return updatedPickup;
    } catch (error) {
      console.error("Error updating pickup status:", error);
      return error;
    }
  }
}

module.exports = PickupManagementService;
