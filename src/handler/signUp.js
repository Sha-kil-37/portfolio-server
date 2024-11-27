const Admin = require("../model/admin/admin.model");
const bcrypt = require("bcryptjs");
module.exports = async function (request, reply) {
  const { name, email, password } = request.body;
  try {
    const findAdmin = await Admin.findOne({ email });
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);
    if (findAdmin !== null) {
      return reply
        .status(400)
        .send({ success: false, msg: "Admin Already  Exist" });
    }
    const newAdmin = new Admin({
      name: name,
      email: email,
      password: hashPass,
    });
    await newAdmin.save();
    return reply
      .status(201)
      .send({ success: true, msg: "Admin Created Successfully" });
  } catch (error) {
    if (error.code === 11000) {
      return reply
        .status(400)
        .send({ success: false, msg: "Duplicate Email Error" });
    } else {
      return reply
        .status(500)
        .send({ success: false, msg: "Internal Server Error" });
    }
  }
};
