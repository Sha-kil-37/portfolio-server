const Admin = require("../model/admin/admin.model");
const bcrypt = require("bcryptjs"); //
module.exports = async function (request, reply) {
  const { email, password } = request.query;
  try {
    // FIND ADMIN BY EMAIL
    const findAdmin = await Admin.findOne({ email: email });
    if (findAdmin === null) {
      return reply.status(400).send({ success: false, msg: "Unauthorize" });
    }
    // COMPARE ADMIN LOGIN PASSWORD
    const isMatch = await bcrypt.compare(password, findAdmin.password);
    if (!isMatch) {
      return reply.status(400).send({ success: false, msg: "Unauthorize" });
    }
    return;
  } catch (error) {
    return reply
      .status(500)
      .send({ success: false, msg: "Internal Server Error" });
  }
};
