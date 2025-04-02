// ADMIN FOOTER DATA MODEL
const mongoose = require("mongoose");
//
const footerSchema = new mongoose.Schema(
  {
    version: { type: String, required: true }, // e.g., '1.0.0'
    releaseDate: { type: Date, required: true },
    contactInfo: {
      email: { type: String, required: true },
      phone: { type: String, required: false },
      address: { type: String, required: false },
    },
    socialLinks: [
      {
        platform: { type: String, required: true }, // e.g., 'LinkedIn', 'GitHub'
        url: { type: String, required: true },
        iconClass: { type: String, required: false }, // e.g., 'fab fa-github'
      },
    ],
    addressMap: { type: String, required: true },
    copyrightText: { type: String, required: true }, // e.g., '© 2024 Your Name'
    logo:{
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
const Footer = mongoose.model("Footer", footerSchema);
module.exports = Footer;
