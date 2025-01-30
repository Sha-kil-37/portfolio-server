'use strict'
const { transporter, mailOption } = require("../../config/mail/mailConfig.js");
//
const sendPassForgotEmailVerification = async function (recever, subject, text, html) {
  const option = mailOption(recever, subject, text, html);
  return await transporter.sendMail(option);
};
// send contact form submit email
const sendContactFormSubmitEmail = async function (recever, subject, text, html) {
  const option = mailOption(recever, subject, text, html);
  return await transporter.sendMail(option);
};
//
module.exports = { sendPassForgotEmailVerification, sendContactFormSubmitEmail };
