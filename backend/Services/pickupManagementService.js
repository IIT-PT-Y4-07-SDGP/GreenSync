// Import necessary modules
const CommonService = require("./commonService");
const mongoose = require("mongoose");
const common = new CommonService();
const PickupModel = require("../models/pickupModel");

const pickup = new PickupModel();
class PickupManagementService {
  /**
   * Delete Driver by pickupId and driverId
   * @Param pickupId
   * @Query driverId
   */

  async DeleteDriverFromPickup(req) {
    const pickupId = req.params.pickupId;
    const driverId = req.body.driverId;
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
  // /**
  //  * Change driver for pickup
  //  * @param {*} @prcId unique prcId
  //  * @param {*} driverIds[] are array
  //  */
  // async PRCChangeDriver(req) {
  //   const id = prcId;
  //   try {
  //     let prc = await pickup.findByIdAndUpdate(id, {
  //       driverIds: driverIds,
  //     });
  //     return prc;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
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
