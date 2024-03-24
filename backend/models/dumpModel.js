const mongoose = require("mongoose");

const schema = mongoose.Schema;

const dumpSchema = new schema(
  {
    DumpName: {
      type: String,
    },
    Price: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("dump", dumpSchema);
