// PROJECT DATA MODEL
const mongoose = require("mongoose");
const { Schema } = mongoose;
//
const projectSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    frontEndTechnologies: {
      type: [String], // Array of strings to list frontend technologies
      required: true,
    },
    backEndTechnologies: {
      type: [String], // Array of strings to list backend technologies
      required: true,
    },
    liveURL: {
      type: String,
      required: true,
    },
    repoURL: {
      type: String,
      required: true,
    },
    imageURL: {
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
const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
