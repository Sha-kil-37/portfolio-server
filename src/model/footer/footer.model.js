// ADMIN FOOTER DATA MODEL
const mongoose = require("mongoose");
//
const footerSchema = new mongoose.Schema(
  {
    version: { type: String, required: true }, // e.g., '1.0.0'
    releaseDate: { type: String, default: () => new Date().toISOString() },
    contactInfo: {
      email: { type: String, required: true },
      phone: { type: String, required: false },
      address: { type: String, required: false },
    },
    socialLinks: [
      {
        platform: { type: String, required: true }, // e.g., 'LinkedIn', 'GitHub'
        url: { type: String, required: true },
        icon: { type: String, required: true }, // e.g., 'LinkedInIcon', 'GitHubIcon'
      },
    ],
    addressMap: { type: String, required: true },
    copyrightText: { type: String, required: true }, // e.g., '© 2025 Your Name'
    logo: {
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
