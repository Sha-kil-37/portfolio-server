const Skill = require("../../../model/skills/skill.model");
//
module.exports = async function (request, reply) {
  //
  const { email } = request.headers;
  const { skill, description } = request.body;
  //
  try {
    const findExistSkill = await Skill.findOne({
      user: email,
      skill: skill,
    });
    if (findExistSkill !== null) {
      return reply.status(400).send({
        success: false,
        msg: "Skill Already Exist",
      });
    }
    const newSkill = new Skill({
      skill: skill,
      description: description,
      user: email,
    });
    await newSkill.save();
    return reply
      .status(201)
      .send({ success: true, msg: "Skill Add Successfully" });
  } catch (error) {
    return reply
      .status(500)
      .send({ success: false, msg: "Internal Server Error" });
  }
};
