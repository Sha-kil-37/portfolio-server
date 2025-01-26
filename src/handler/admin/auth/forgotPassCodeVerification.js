'use strict'
module.exports = async function (request, reply) {
  //
  const { email } = request.body;
  try {
    //
    const token = this.jwt.sign(
      { email }, // Payload
      { expiresIn: "30m" } // Expiration time
    );
    return reply.status(200).send({
      success: true,
      msg: "Forgot Password Code Verify Successfully",
      token: token,
    });
  } catch (error) {
    return reply
      .status(500)
      .send({ success: false, msg: "Internal Server Error" });
  }
};
