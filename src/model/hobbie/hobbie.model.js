// HOBBIE DATA MODEL
const mongoose = require("mongoose");
const { Schema } = mongoose;
//
const hobbieSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    iconURL: {
      type: String,
      required: true,
    },
    description: {
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

//
const Hobbie = mongoose.model("hobbie", hobbieSchema);
module.exports = Hobbie;
