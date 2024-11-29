// EXPERIENCE DATA MODEL
const mongoose = require("mongoose");
const { Schema } = mongoose;
//
const experienceSchema = new Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    position: {
      type: Array,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);
//

//
const experience = mongoose.model("Experience", experienceSchema);
module.exports = experience;
