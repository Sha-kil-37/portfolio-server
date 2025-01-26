
'use strict'
const mongoose = require("mongoose");
const Tool = require("../../../../model/tool/tool.model.js");
//
module.exports = async function (request, reply) {
  const { email } = request.headers;
  const { id } = request.query;
  try {
    // Validate Mongoose ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return reply.status(400).send({ error: "Invalid Id" });
    }
    await Tool.deleteOne({ _id: id, user: email });
    return reply.status(200).send({
      success: true,
      msg: "Tool Delete Successfully",
    });
  } catch (error) {
    return reply.status(500).send({
      success: false,
      msg: "Internal Server Error",
    });
  }
};