// Importing the service class
const PRCService = require("../Services/prcService");
const AuthService = require("../Services/authService");
const { param } = require("../routes/prc");
// creating instances for service class
const prc = new PRCService();
const authService = new AuthService();

class PRCController {
  // prc Registration
  static async PRCRegistration(req, res) {
    try {
      // Validate the prc data and add prc to database
      const newPRC = await prc.PRCRegister(req.body, res);
      return res.status(200).json({ newPRC });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  /**
   * Assigne pickups by truck and dirivers
   * @param {*} req
   * @param {*} res
   */
  static async PRCAssignePickups(req, res) {
    try {
      const assignedPickups = await prc.PRCAssignePickups(req, res);
      return res.status(200).json({ assignedPickups });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  /**
   * Change driver for pickup
   * @param {*} req in request prcId as a param and req.body in driverIds
   */
  static async PRCChangeDriver(req, res) {
    try {
      const changedDriver = await prc.PRCChangeDriver(
        req.params.prcId,
        req.body
      );
      return res.status(200).json({ changedDriver });
    } catch (error) {
      res.status(403).json({ error: error.message });
    }
  }

  /**
   * Prc update driver task
   * @param {*} req  req.params include prcId and req.query in task
   */
  static async PRCDriverUpdateTask(req, res) {
    try {
      const changedDriver = await prc.PRCDriverUpdateTask(req, res);
      return res.status(200).json({ changedDriver });
    } catch (error) {
      res.status(403).json({ error: error.message });
    }
  }

  /**
   * GP request for on demand pickups
   * @param {*} req
   * @param {*} res
   */
  static async PRCRequestDemandPickups(req) {
    try {
      const demandPickups = await prc.PRCRequestDemandPickups(req);
      return res.status(200).json({ demandPickups });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

// Export the controller
module.exports = PRCController;
