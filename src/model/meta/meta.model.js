// SKILL DATA MODEL
const mongoose = require("mongoose");
const { Schema } = mongoose;
//
const MetaSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    favicon: {
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
const Meta = mongoose.model("Meta", MetaSchema);
module.exports = Meta;
