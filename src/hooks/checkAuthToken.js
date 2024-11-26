const Admin = require("../model/admin/admin.model");

require("dotenv").config();
//
module.exports = async function (request, reply) {
  try {
    const requestToken = await request.jwtVerify();
    const { email, password } = requestToken;
    // FIND ADMIN BY EMAIL AND PASSWORD
    const findAdmin = await Admin.findOne({ email: email });
    if (findAdmin === null) {
      return reply.status(400).send({ success: false, msg: "Unauthorize" });
    }
    request.headers.email = email;
    return;
    //
  } catch (error) {
    if (error.code === "FST_JWT_AUTHORIZATION_TOKEN_EXPIRED") {
      return reply.status(400).send({ success: false, msg: "Unauthorize" });
    } else {
      return reply
        .status(500)
        .send({ success: false, msg: "Internal Server Error" });
    }
  }
};
