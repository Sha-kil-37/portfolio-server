module.exports = async function (request, reply) {
  try {
    const verify = await request.jwtVerify();
    request.headers.email = verify.email;
  } catch (error) {
    return reply
      .status(400)
      .send({ success: false, msg: "Invalid Credential" });
  }
};
