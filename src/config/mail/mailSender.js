'use strict'
const { transporter, mailOption } = require("./mailConfig.js");
//
const sendPassForgotEmailVerification = async function (recever, subject, text, html) {
  const option = mailOption(recever, subject, text, html);
  return await transporter.sendMail(option);
};
//
module.exports = { sendPassForgotEmailVerification };
