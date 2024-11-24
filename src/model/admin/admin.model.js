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
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false, timestamps: true }
);

adminSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
//
const Admin = mongoose.model("admin", adminSchema);
module.exports = Admin;
//
