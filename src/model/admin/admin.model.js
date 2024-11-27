const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcryptjs");
const adminSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
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
const Admin = mongoose.model("admin", adminSchema);
module.exports = Admin;
//
