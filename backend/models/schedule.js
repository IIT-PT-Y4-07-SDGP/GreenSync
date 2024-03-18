const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scheduleSchema = new Schema(
  {
    MC: {
      type: Schema.Types.ObjectId,
      ref: 'MC-account',
      required:true
  },
    arrival: {
      type: Date,
      required: true,
    },
    DistrictId: {
      type: Schema.Types.ObjectId,
      ref: 'districts',
      required:true
  },
    pickupPoints: [
      {
        type: Schema.Types.ObjectId,
        required:true
    },
    ],
    typesOfWaste: [{
      type: String,
      enum: ["organic", "plastic", "paper", "metal", "glass", "other"],
      required: true,
    }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("schedule", scheduleSchema);
