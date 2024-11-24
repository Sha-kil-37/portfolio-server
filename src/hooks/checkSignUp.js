require("dotenv").config();

module.exports = function (request, reply, done) {
  if (request.body.email === process.env.OWNER_GMAIL) {
    return done();
  } else {
    return reply.status(401).send({ success: false, msg: "Unauthorize" });
  }
};
