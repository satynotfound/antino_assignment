const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    wordCount: { type: Number },
    titleHash: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Data = mongoose.model("Data", dataSchema);
module.exports = Data;
