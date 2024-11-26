const Admin = require("../model/admin/admin.model");
const bcrypt = require("bcryptjs");
module.exports = async function (request, reply) {
  const { email, password } = request.query;
  try {
    // FIND ADMIN BY EMAIL AND PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);
    const admin = await Admin.findOne({ email: email, password: hashPass });
    console.log(admin);
    // if (admin === null) {
    //   return reply.status(400).send({ success: false, msg: "Unauthorize" });
    // }
    // // GENERATE ADMIN TOKEN
    // const token = this.jwt.sign(
    //   {
    //     email: admin.email,
    //     password: admin.password,
    //   },
    //   { expiresIn: "30m" }
    // );
    // return reply
    //   .status(200)
    //   .send({ success: true, msg: "Admin Sign In Success", token: token });
  } catch (error) {
    return reply
      .status(500)
      .send({ success: false, msg: "Internal Server Error" });
  }
};
