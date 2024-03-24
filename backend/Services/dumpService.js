// Import necessary modules
const CommonService = require("./commonService");
const mongoose = require("mongoose");
const common = new CommonService();
const DumpModel = require("../models/dumpModel");

const dump = new DumpModel();
class DumpService {
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

      // Assuming PickupModel is also required
      // const pickupId = req.body.pickupId;
      // const pickup = await PickupModel.findById(pickupId);

      // if (!pickup) {
      //     throw new Error("Pickup not found");
      // }

      // Perform your operations here, for example, creating a new dump
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
}

module.exports = DumpService;
