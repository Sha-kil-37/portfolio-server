const Skill = require("../../../model/skills/skill.model");
const mongoose = require("mongoose");
//
module.exports = async function (request, reply) {
  const { skill, description } = request.body;
  const { email } = request.headers;
  const { id } = request.query;
  try {
    // Validate Mongoose ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return reply.status(400).send({ error: "Invalid Id" });
    }
    const findExistSkill = await Skill.findOne({
      skill: skill,
      user: email,
      _id: id,
    });
    if (findExistSkill !== null) {
      return reply.status(400).send({
        success: false,
        msg: "Skill Already Exist",
      });
    } else {
      await Skill.updateOne(
        { _id: id, user: email },
        { $set: { skill: skill, description: description } }
      );
      return reply.status(200).send({
        success: true,
        msg: "Update Skill Successfully",
      });
    }
    //
  } catch (error) {
    return reply.status(500).send({
      success: false,
      msg: "Internal Server Error",
    });
  }
};
