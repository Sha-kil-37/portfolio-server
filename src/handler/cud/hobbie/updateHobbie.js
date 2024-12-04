const Skill = require("../../../model/skills/skill.model");
const mongoose = require("mongoose");
//
module.exports = async function (request, reply) {
  const { category, skill, description } = request.body;
  const { email } = request.headers;
  const { id } = request.query;
  try {
    // Validate Mongoose ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return reply.status(400).send({ error: "Invalid Id" });
    }
    const existingSkill = await Skill.findOne({
      // _id: id,
      category: category,
      skill: skill,
      description: description,
      user: email,
    });
    if (existingSkill !== null) {
      return reply.status(400).send({
        success: false,
        msg: "Skill Already Exist",
      });
    }
    await Skill.updateOne(
      { _id: id, user: email },
      { $set: { category: category, skill: skill, description: description } }
    );
    return reply.status(200).send({
      success: true,
      msg: "Update Skill Successfully",
    });
  } catch (error) {
    return reply.status(500).send({
      success: false,
      msg: "Internal Server Error",
    });
  }
};