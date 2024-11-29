// ADMIN DATA MODEL
const mongoose = require("mongoose");
const { Schema } = mongoose;
// 
const adminSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: null,
    },
    verifyCode: {
      type: String,
      default: null,
    },
    verifyCodeExp: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);
//

//
const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
//
