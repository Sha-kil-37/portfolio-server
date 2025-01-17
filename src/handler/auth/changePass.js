'use strict'
const Admin = require("../../model/admin/admin.model.js");
const bcrypt = require("bcryptjs");
module.exports = async function (request, reply) {
  const { email } = request.headers;
  const { password } = request.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);
    await Admin.updateOne(
      { email: email },
      {
        $set: { password: hashPass },
      }
    );
    return reply
      .status(200)
      .send({ success: true, msg: "Change Password Successfully" });
  } catch (error) {
    return reply
      .status(500)
      .send({ success: false, msg: "Internal Server Error" });
  }
};
