
'use strict'
const Admin = require("../../model/admin/admin.model");

module.exports = async function (request, reply) {
  //
  const { code } = request.body;
  try {
    const findAdmin = await Admin.findOne({ verifyCode: code });
    if (findAdmin === null) {
      return reply
        .status(400)
        .send({ success: false, msg: "Invalid Credential" });
    }
    if (Number(findAdmin.verifyCodeExp) < Date.now()) {
      return reply
        .status(400)
        .send({ success: false, msg: "Verify Code Expire" });
    }
    request.body = { ...request.body, email: findAdmin.email };
  } catch (error) {
    return reply
      .status(500)
      .send({ success: false, msg: "Internal Server Error" });
  }
};
