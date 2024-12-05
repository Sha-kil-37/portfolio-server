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
    technology: {
      type: Array,
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
    images: [{ url: String, public_id: String }],
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
