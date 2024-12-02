const mongoose = require("mongoose");
const Skill = require("../../../model/skills/skill.model");
//
module.exports = async function (request, reply) {
  const { email } = request.headers;
  const { id } = request.query;
  try {
    // Validate Mongoose ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return reply.status(400).send({ error: "Invalid Id" });
    }
    await Skill.deleteOne({ _id: id, user: email });
    return reply.status(200).send({
      success: true,
      msg: "Skill Delete Successfully",
    });
  } catch (error) {
    return reply.status(500).send({
      success: false,
      msg: "Internal Server Error",
    });
  }
};
