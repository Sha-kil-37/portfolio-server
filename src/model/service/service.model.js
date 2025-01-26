// SERVICE DATA MODEL
const mongoose = require("mongoose");
const { Schema } = mongoose;
//
const serviceSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    features: {
      type: [String], // Array of features for the service
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
  { timestamps: true, versionKey: false }
);

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;
