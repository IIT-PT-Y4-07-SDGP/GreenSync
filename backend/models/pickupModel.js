const mongoose = require("mongoose");
const accountSchema = require("./accountModel");
const schema = mongoose.Schema;

const pickupSchema = new schema(
  {
    PickupDate: {
      type: String,
    },
    PickupStartTime: {
      type: String,
    },
    PickupEndTime: {
      type: String,
    },
    DumpType: {
      type: [String],
    },
    Location: {
      type: String,
    },
    DriverId: {
      type: String,
    },
    DriverId: {
      type: String,
    },
    Status: { // accept  or reject , pending
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("pickups", pickupSchema);
