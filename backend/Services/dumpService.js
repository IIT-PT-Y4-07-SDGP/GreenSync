// Import necessary modules
const CommonService = require("./commonService");
const mongoose = require("mongoose");
const common = new CommonService();
const DumpModel = require("../models/dumpModel");

const dump = new DumpModel();
class DumpService {
  async findDumpById(req) {
    const dumpId = req.params.dumpId;
    const dump = await DumpModel.findById(dumpId);
    if (!dump) {
      throw new Error("Dump not found");
    }
    return dump;
  }

  /**
   * Find all pickups
   * @returns pickup entity as array
   */
  async findAllDumps() {
    try {
      // Find all pickups
      const dumps = await DumpModel.find();
      return dumps;
    } catch (error) {
      console.error("Error finding all pickups:", error);
      return error;
    }
  }

  async createDump(req) {
    try {
      const dumpName = req.body.dumpName;
      const price = req.body.price;

      const newDump = new DumpModel({
        DumpName: dumpName,
        Price: price,
        // Add other properties as required
      });
      console.log(newDump);
      // Save the new dump to the database
      const savedDump = await newDump.save();

      // Return the newly created dump
      return savedDump;
    } catch (error) {
      // Handle errors
      console.error("Error creating dump:", error);
      throw error; // Throw error to be caught by the caller
    }
  }

  async deleteDump(req) {
    try {
      const dumpId = req.params.dumpId;

      // Check if the dump exists before attempting to delete it
      const dump = await DumpModel.findById(dumpId);
      if (!dump) {
        throw new Error("Dump not found");
      }

      // Delete the dump
      await DumpModel.findByIdAndDelete(dumpId);

      return { message: "Dump deleted successfully" };
    } catch (error) {
      // Handle errors
      console.error("Error deleting dump:", error);
      throw error; // Throw error to be caught by the caller
    }
  }

  async updateDump(req) {
    try {
      const dumpId = req.params.dumpId;
      const DumpName = req.body.dumpName;
      const Price = req.body.dumpName.price;

      // Check if the dump exists before attempting to update it
      const dump = await DumpModel.findById(dumpId);
      if (!dump) {
        throw new Error("Dump not found");
      }

      // Update the dump with the provided data
      // Here we are updating only the dumpName and price fields
      await DumpModel.findByIdAndUpdate(
        dumpId,
        { $set: { DumpName, Price } }, // Update only dumpName and price
        { new: true } // Return the modified document
      );

      // Fetch the updated dump after the update operation
      const updatedDump = await DumpModel.findById(dumpId);

      return updatedDump;
    } catch (error) {
      // Handle errors
      console.error("Error updating dump:", error);
      throw error; // Throw error to be caught by the caller
    }
  }

  async findDumpPriceByQTYAndName(req) {
    try {
      const dumpName = req.params.dumpName;
      const qty = req.body.qty;
      console.log(dumpName);
      const dump = await DumpModel.findOne({ DumpName: dumpName });
      if (dump) {
        console.log("Dump found:", dump);
        const priceForQty = dump.Price * qty;
        return priceForQty;
      } else {
        const priceForQty = Math.floor(Math.random() * 999) + 2;
        return priceForQty;
      }
    } catch (error) {
      console.error("Error finding dump:", error);
    }
  }
}

module.exports = DumpService;
