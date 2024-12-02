const mongoose = require("mongoose");
// 
const footerSchema = new mongoose.Schema(
  {
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
    navigationLinks: [
      {
        name: { type: String, required: true }, // e.g., 'Home', 'Projects'
        url: { type: String, required: true },
      },
    ],
    copyrightText: { type: String, required: true }, // e.g., '© 2024 Your Name'
  },
  { versionKey: false, timestamps: true }
);

//
const Footer = mongoose.model("Footer", footerSchema);
module.exports = Footer;
