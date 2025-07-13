'use strict'
// 
const {
  forgotPassEmailVerifyTemplate,
} = require("../../../config/mail/mailTemplate");
require("dotenv").config();
const {
  sendPassForgotEmailVerification,
} = require("../../../utils/mailSender/mailSender.js");
const Admin = require("../../../model/admin/admin.model.js");
//
module.exports = async function (request, reply) {
  try {
    //
    const { email } = request.body;
    // forgot email verification code
    const verifyCodeExp = Date.now() + 5 * 60 * 1000;
    const verifyCodeExpMail = Math.floor(
      (verifyCodeExp - Date.now()) / 1000 / 60
    );
    const verificationLink =
      "http://localhost:5000/portfolio/api/v1/admin/forgot-email-verification"; // forgot password email verification code verify client browser link

    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    const html = forgotPassEmailVerifyTemplate
      .replace("{verifyCode}", verifyCode)
      .replace("{verifyCodeExpMail}", verifyCodeExpMail)
      .replace(/{verificationLink}/g, verificationLink);
    await Admin.updateOne(
      { email: email },
      {
        $set: { verifyCode: verifyCode, verifyCodeExp: verifyCodeExp },
      }
    );
    await sendPassForgotEmailVerification(
      email,
      "Portfolio Password Forgot Email Verification",
      "hello text",
      html
    );
    return reply.status(200).send({
      success: true,
      msg: "Password Forgot Code Send Successfully",
      codeExp: verifyCodeExp,
    });
  } catch (error) {
    return reply
      .status(500)
      .send({ success: false, msg: "Internal Server Error" });
  }
};
