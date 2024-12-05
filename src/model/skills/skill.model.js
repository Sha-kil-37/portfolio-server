// SKILL DATA MODEL
const mongoose = require("mongoose");
const { Schema } = mongoose;
//
const skillSchema = new Schema(
  {
    skill: {
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
const Skill = mongoose.model("Skill", skillSchema);
module.exports = Skill;
