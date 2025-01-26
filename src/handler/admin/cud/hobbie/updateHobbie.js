'use strict'

const mongoose = require("mongoose");
const Hobbie = require("../../../../model/hobbie/hobbie.model.js");
//
module.exports = async function (request, reply) {
  const { name, description, iconClass } = request.body;
  const { email } = request.headers;
  const { id } = request.query;
  try {
    // Validate Mongoose ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return reply.status(400).send({ error: "Invalid Id" });
    }
    const existingHobbie = await Hobbie.findOne({
      name: name,
      user: email,
    });
    if (existingHobbie !== null) {
      return reply.status(400).send({
        success: false,
        msg: "Hobbie Already Exist",
      });
    }
    await Hobbie.updateOne(
      { _id: id, user: email },
      { $set: { name: name, iconClass: iconClass, description: description } }
    );
    return reply.status(200).send({
      success: true,
      msg: "Update Hobbie Successfully",
    });
  } catch (error) {
    return reply.status(500).send({
      success: false,
      msg: "Internal Server Error",
    });
  }
};
