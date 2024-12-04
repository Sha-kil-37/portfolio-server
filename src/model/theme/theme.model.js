const mongoose = require("mongoose");
//
const themeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // e.g., "Default", "Dark Mode", etc.
    },
    isActive: {
      type: Boolean,
      default: false, // Only one theme can be active at a time
    },
    primaryColor: {
      type: String,
      default: "#1a202c", // Hex color for primary
    },
    secondaryColor: {
      type: String,
      default: "#2d3748",
    },
    backgroundColor: {
      type: String,
      default: "#ffffff",
    },
    textColor: {
      type: String,
      default: "#000000",
    },
    user: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);
//
const Theme = mongoose.model("theme", themeSchema);
module.exports = Theme;
