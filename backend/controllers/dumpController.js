// Importing the service class
const DumpService = require("../Services/dumpService");

const dump = new DumpService();
// const authService = new AuthService();

class DumpController {
  static async findDumpById(req, res) {
    try {
      const findById = await dump.findDumpById(req);
      return res.status(200).json({ findById });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  /**
   * Find all dumps
   */
  static async findAllDumps(req, res) {
    try {
      const allDumps = await dump.findAllDumps();
      return res.status(200).json({ allDumps });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async createDump(req, res) {
    try {
      const createDump = await dump.createDump(req);
      return res.status(200).json({ createDump });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async updateDump(req, res) {
    try {
      const updateDump = await dump.updateDump(req);
      return res.status(200).json({ updateDump });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async deleteDump(req, res) {
    try {
      const deleteDump = await dump.deleteDump(req);
      return res.status(200).json({ deleteDump });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async findDumpPriceByQTYAndName(req, res) {
    try {
      const price = await dump.findDumpPriceByQTYAndName(req);
      return res.status(200).json({ price });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = DumpController;
