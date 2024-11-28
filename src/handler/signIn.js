
require("dotenv").config();
module.exports = async function (request, reply) {
  const { email, password } = request.body;
  try {
    const token = await this.jwt.sign(
      { email }, // Payload
      { expiresIn: Math.floor(Date.now() / 1000) + 60 * 60 } // Expiration time
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
