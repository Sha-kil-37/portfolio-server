const Admin = require("../model/admin/admin.model");
const bcrypt = require("bcryptjs");

module.exports = async function (request, reply) {
  const { email } = request.headers;
  const { newPassword } = request.body;
  try {
    const admin = await Admin.findOne({ email: email });
    const salt = await bcrypt.genSalt(10);
    const newPassHash = await bcrypt.hash(admin.password, salt);
    const updateAdmin = await Admin.updateOne(
      { email: email },
      { $set: { password: newPassHash } }
    );
    const isMatch = bcrypt.compare(newPassword, updateAdmin.password);
    console.log(isMatch);
    

    // if (updateAdmin.modifiedCount > 0) {
    //   return reply
    //     .status(200)
    //     .send({ success: true, msg: "Password Reset Successfully" });
    // } else {
    //   return reply
    //     .status(500)
    //     .send({ success: false, msg: "Internal Server Error" });
    // }
  } catch (error) {
    return reply
      .status(500)
      .send({ success: false, msg: "Internal Server Error" });
  }
};
