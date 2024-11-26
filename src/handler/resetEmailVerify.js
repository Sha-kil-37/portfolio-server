const mailSender = require("../utils/mail/mailSender");
const Admin = require("../model/admin/admin.model");
//
module.exports = async function (request, reply) {
  const { email } = request.headers;
  const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
  const verifyCodeExp = Date.now() + 5 * 60 * 1000;
  //
  try {
    const result = await Admin.updateOne(
      { email: email }, // Match the user by email
      { $set: { verifyCode: verifyCode, verifyCodeExp: verifyCodeExp } }
    );
    if (result.modifiedCount > 0) {
      await mailSender(email, verifyCode, verifyCodeExp);
      return reply.status(200).send({
        success: true,
        msg: "Pass Reset Code Send Successfully, Check Your Email",
        codeExpire: verifyCodeExp,
      });
    } else {
      return reply
        .status(500)
        .send({ success: false, msg: "Internal Server Error" });
    }
  } catch (error) {
    return reply
      .status(500)
      .send({ success: false, msg: "Internal Server Error" });
  }
};
