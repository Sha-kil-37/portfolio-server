const Admin = require("../model/admin/admin.model");
require("dotenv").config();
module.exports = async function (request, reply) {
  const { email, password } = request.body;
  try {
    const token = await this.jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
        data: request.body,
      },
      process.env.TOKEN_SECRET
    );
    return reply
      .status(200)
      .send({ success: true, msg: "Sign In Success", token: token });
  } catch (error) {
    return reply
      .status(500)
      .send({ success: false, msg: "Internal Server Error" });
  }
};
