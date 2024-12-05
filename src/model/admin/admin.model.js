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
    age: {
      type: String,
      default: null,
    },
    about: {
      type: String,
      default: null,
    },
    images: [{ url: String, public_id: String }],
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
const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
//
