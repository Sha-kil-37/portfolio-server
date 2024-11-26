const Admin = require("../model/admin/admin.model");
const bcrypt = require("bcryptjs");

//
module.exports = async function (request, reply) {
  const { email } = request.headers;
  const { newPassword } = request.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const newPassHash = await bcrypt.hash(newPassword, salt);
    await Admin.updateOne(
      { email: email },
      { $set: { password: newPassHash } }
    );
    return reply
      .status(200)
      .send({ success: true, msg: "Password Reset Successfully" });
  } catch (error) {
    return reply
      .status(500)
      .send({ success: false, msg: "Internal Server Error" });
  }
};
