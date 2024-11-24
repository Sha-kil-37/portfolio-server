const Admin = require("../model/admin/admin.model");

module.exports = async function (request, reply) {
  const { code } = request.body;
  const { email } = request.headers;
  try {
    const verifyAdmin = await Admin.findOne({
      verifyCode: code,
      email: email,
    });
    if (verifyAdmin === null) {
      return reply.status(400).send({ success: false, msg: "Unauthorize" });
    }
    return reply
      .status(200)
      .send({ success: true, msg: "Reset Password Code Verify Successfully" });
  } catch (error) {
    return reply
      .status(500)
      .send({ success: true, msg: "Internal Server Error" });
  }
};
