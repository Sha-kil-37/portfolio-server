module.exports = async function (request, reply) {
  try {
    const { email } = await request.jwtVerify();
    request.headers.email = email;
  } catch (error) {
    return reply
      .status(400)
      .send({ success: false, msg: "Invalid Credential" });
  }
};
