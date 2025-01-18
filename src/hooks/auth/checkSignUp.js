'use strict'
require("dotenv").config();
module.exports = async function (request, reply) {
  const { name, email, password } = request.body;
  try {
    if (email !== `${process.env.OWNER_GMAIL}`) {
      return reply
        .status(400)
        .send({ success: false, msg: "Invalid Credential" });
    }
  } catch (error) {
    
    return reply
      .status(500)
      .send({ success: false, msg: "Internal Server Error" });
  }
};
