const nodemailer = require("nodemailer");
// EMAIL SENDING CONFIG
const transporter = nodemailer.createTransport({
  service: "gmail.com",
  port: 465,
  secure: true, // true for port 465, false for other ports
  auth: {
    user: process.env.OWNER_GMAIL,
    pass: process.env.MAIL_PASS,
  },
});
module.exports = transporter;
