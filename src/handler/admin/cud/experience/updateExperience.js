'use strict'
const mongoose = require("mongoose");
const Experience = require("../../../../model/experience/experience.model");
module.exports = async function (request, reply) {
  const { email } = request.headers;
  const { id } = request.query;
  const { companyName, position, duration, description } = request.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return reply.status(400).send({ error: "Invalid Id" });
    }
    const findExistExperience = await Experience.findOne({
      companyName: companyName,
      user: email,
    });
    if (findExistExperience !== null) {
      return reply.status(400).send({
        success: false,
        msg: "Experience Already Exist",
      });
    }
    await Experience.updateOne(
      {
        user: email,
        _id: id,
      },
      {
        $set: {
          companyName: companyName,
          position: position,
          duration: duration,
          description: description,
        },
      }
    );
    return reply.status(200).send({
      success: true,
      msg: "Experience Update Successfully",
    });
  } catch (error) {
    return reply.status(500).send({
      success: false,
      msg: "Internal Server Error",
    });
  }
};
