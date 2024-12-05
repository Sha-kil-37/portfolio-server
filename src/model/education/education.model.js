// EDUCATION DATA MODEL
const mongoose = require("mongoose");
const { Schema } = mongoose;
//
const educationSchema = new Schema(
  {
    degree: {
      type: String,
      required: true,
    },
    institution: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    image: {
      url: String,
      public_id: String,
    },
    user: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);
//

//
const Education = mongoose.model("education", educationSchema);
module.exports = Education;
