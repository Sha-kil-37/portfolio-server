const Admin = require("../../model/admin/admin.model");
const bcrypt = require("bcryptjs");
module.exports = async function (request, reply) {
  const { email, password } = request.body;
  try {
    const findAdmin = await Admin.findOne({ email: email });
    if (findAdmin === null) {
      return reply
        .status(400)
        .send({ success: false, msg: "Invalid Credential" });
    }
    const isMatch = await bcrypt.compare(password, findAdmin.password);
    if (!isMatch) {
      return reply
        .status(400)
        .send({ success: false, msg: "Invalid Credential" });
    }
    return;
  } catch (error) {
    return reply
      .status(500)
      .send({ success: false, msg: "Internal Server error" });
  }
};
