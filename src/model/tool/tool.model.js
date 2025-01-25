const mongoose = require("mongoose");
//
const toolSchema = new mongoose.Schema(
  {
    toolName: {
      type: String,
      required: true,
    },
    iconClass: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);
//
const Tool = mongoose.model("tool", toolSchema);
module.exports = Tool;
