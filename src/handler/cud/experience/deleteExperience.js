

const mongoose = require("mongoose");
const Experience = require("../../../model/experience/experience.model");


//
module.exports = async function (request, reply) {
  const { email } = request.headers;
  const { id } = request.query;
  try {
    // Validate Mongoose ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return reply.status(400).send({ error: "Invalid Id" });
    }
    await Experience.deleteOne({ user: email, _id: id });
    return reply.status(200).send({
      success: true,
      msg: "Footer Delete Successfully",
    });
  } catch (error) {
    return reply.status(500).send({
      success: false,
      msg: "Internal Server Error",
    });
  }
};
