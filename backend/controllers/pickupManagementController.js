const PickupService = require("../Services/pickupManagementService");
// const AuthService = require("../Services/authService");
const pickup = new PickupService();
// const authService = new AuthService();

class PickupManagementController {
  static async findPickupByPickupId(req, res) {
    try {
      const findById = await pickup.findPickupByPickupId(req);
      return res.status(200).json({ findById });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  /**
   * Find all pickups
   */
  static async findAllPickups(req, res) {
    try {
      const allPickups = await pickup.findAllPickups();
      return res.status(200).json({ allPickups });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

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
  static async DeleteDriverFromPickup(req, res) {
    try {
      const deleteDriver = await pickup.DeleteDriverFromPickup(req);
      return res.status(200).json({ deleteDriver });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async FindPickupByDriverId(req, res) {
    try {
      const findByDirverId = await pickup.FindPickupByDriverId(req);
      return res.status(200).json({ findByDirverId });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  static async FindPickupHistoryByCustomerId(req, res) {
    try {
      const findByCustomerId = await pickup.FindPickupHistoryByCustomerId(req);
      return res.status(200).json({ findByCustomerId });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async UpdatePickupByCustomer(req, res) {
    try {
      const updatePickup = await pickup.UpdatePickupByCustomer(req);
      return res.status(200).json({ updatePickup });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async UpdatePickupByDriver(req, res) {
    try {
      const updatePickup = await pickup.UpdatePickupByDriver(req);
      return res.status(200).json({ updatePickup });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = PickupManagementController;
