const nodemailer = require("nodemailer");
require("dotenv").config();
const transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 587,
  secure: false, // true for port 465
  auth: {
    user: 'your-email@example.com', // your SMTP username
    user:process.env.OWNER_GMAIL,
    pass: process.env.APP_PASS,    // your SMTP password
  },
});
// 
const mailOption = function (recever, subject, text, html) {
  // 
  
  // 
  return {
    from: process.env.OWNER_GMAIL,
    to: recever,
    subject: subject, // Subject line
    text: text,
    html: html, // html body
  };
};
module.exports = { transporter, mailOption };
