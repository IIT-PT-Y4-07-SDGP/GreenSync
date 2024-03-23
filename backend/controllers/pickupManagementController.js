// Importing the service class
const PickupService = require("../Services/pickupManagementService");
// const AuthService = require("../Services/authService");
// creating instances for service class
const pickup = new PickupService();
// const authService = new AuthService();

class PickupManagementController {
  /**
   * Assigne pickups by truck and dirivers
   * @param {*} req
   * @param {*} res
   */
  static async AssignePickupForDriver(req, res) {
    try {
      const assignedPickups = await pickup.AssignePickupForDriver(req, res);
      return res.status(200).json({ assignedPickups });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  // /**
  //  * Change driver for pickup
  //  * @param {*} req in request pickupId as a param and req.body in driverIds
  //  */
  // static async pickupChangeDriver(req, res) {
  //   try {
  //     const changedDriver = await pickup.pickupChangeDriver(
  //       req.params.pickupId,
  //       req.body
  //     );
  //     return res.status(200).json({ changedDriver });
  //   } catch (error) {
  //     res.status(403).json({ error: error.message });
  //   }
  // }
  /**
   * pickup update driver task
   * @param {*} req  req.params include pickupId and req.query in task
   */
  static async UpdateDriverStatus(req, res) {
    try {
      const updateStatus = await pickup.UpdateDriverStatus(req);
      return res.status(200).json({ updateStatus });
    } catch (error) {
      res.status(403).json({ error: error.message });
    }
  }
  /**
   * GP request for on demand pickups
   * @param {*} req proccessing
   * @param {*} res
   */
  static async GPRequestForPickups(req, res) {
    try {
      const demandPickups = await pickup.GPRequestForPickups(req);
      return res.status(200).json({ demandPickups });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  /**
   * Delete Driver by pickupId and driverId
   * @Param pickupId
   * @Query driverId
   */
  static async DeleteDriverFromPickup(req, req) {
    try {
      const deleteDriver = await pickup.DeleteDriverFromPickup(req);
      return res.status(200).json({ deleteDriver });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

// Export the controller
module.exports = PickupManagementController;
