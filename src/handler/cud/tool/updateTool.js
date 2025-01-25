"use strict";
const Tool = require("../../../model/tool/tool.model");
const mongoose = require("mongoose");
//
module.exports = async function (request, reply) {
  const { toolName, iconClass } = request.body;
  const { email } = request.headers;
  const { id } = request.query;
  try {
    // Validate Mongoose ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return reply.status(400).send({ error: "Invalid Id" });
    }
    const findExistTool = await Tool.findOne({
      toolName: toolName,
      iconClass: iconClass,
      user: email,
      _id: id,
    });
    if (findExistTool !== null) {
      return reply.status(400).send({
        success: false,
        msg: "Tool Already Exist",
      });
    } else {
      await Tool.updateOne(
        { _id: id, user: email },
        { $set: { toolName: toolName, iconClass: iconClass } }
      );
      return reply.status(200).send({
        success: true,
        msg: "Tool Update Successfully",
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
