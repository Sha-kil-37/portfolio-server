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
    technologies: {
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
    imageURL: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);
//

//
const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
