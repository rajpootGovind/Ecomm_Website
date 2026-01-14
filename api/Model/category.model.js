const mongoose = require("mongoose");
const validator = require("validator");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },

    description: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
