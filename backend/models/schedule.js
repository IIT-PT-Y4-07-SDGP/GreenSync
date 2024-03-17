const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scheduleSchema = new Schema(
  {
    arrival: {
      type: Date,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    pickupPoint: [
      {
        type: String,
        required: true,
      },
    ],
    typeOfWaste: {
      type: String,
      enum: ["organic", "plastic", "paper", "metal", "glass", "other"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("schedule", scheduleSchema);
