
const Experience = require("../../../model/experience/experience.model"); // experience data model
// 
module.exports = async function (request, reply) {
  const { email } = request.headers;
  const { companyName, position, duration, description } = request.body;
  try {
    const findExistExperience = await Experience.findOne({
      user: email,
      companyName: companyName,
    });
    if (findExistExperience !== null) {
      return reply.status(400).send({
        success: false,
        msg: "Experience Already Exist",
      });
    }
    const newExperience = new Experience({
      companyName: companyName,
      position: position,
      duration: duration,
      description: description,
      user: email,
    });
    await newExperience.save();
    return reply.status(201).send({
      success: true,
      msg: "Experience Add Successfully",
    });
  } catch (error) {
    return reply.status(500).send({
      success: false,
      msg: "Internal Server Error",
    });
  }
};
