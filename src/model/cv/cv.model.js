// EDUCATION DATA MODEL
const mongoose = require("mongoose");
const { Schema } = mongoose;
//
const cvSchema = new Schema(
  {
    name: { type: String, required: true },
    pdfUrl: { type: String, required: true },
    user: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);
//

//
const Cv = mongoose.model("cv", cvSchema);
module.exports = Cv;
