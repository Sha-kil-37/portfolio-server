const Admin = require("../model/admin/admin.model");
module.exports = async function (request, reply) {
  const { email } = request.query;
  try {
    // FIND ADMIN BY EMAIL
    const admin = await Admin.findOne({ email: email });
    if (admin === null) {
      return reply.status(400).send({ success: false, msg: "Unauthorize" });
    }
    // GENERATE ADMIN TOKEN
    const token = this.jwt.sign(
      {
        email: admin.email,
        password: admin.password,
      },
      { expiresIn: "30m" }
    );
    return reply
      .status(200)
      .send({ success: true, msg: "Admin Sign In Success", token: token });
  } catch (error) {
    return reply
      .status(500)
      .send({ success: false, msg: "Internal Server Error" });
  }
};
