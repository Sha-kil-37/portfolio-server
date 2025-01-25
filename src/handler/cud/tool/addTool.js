"use strict";
const Tool = require("../../../model/tool/tool.model");
//
module.exports = async function (request, reply) {
  const { email } = request.headers;
  const { toolName, iconClass } = request.body;
  try {
    const findExistTool = await Tool.findOne({
      user: email,
      toolName: toolName,
      iconClass: iconClass,
    });
    if (findExistTool !== null) {
      return reply.status(400).send({
        success: false,
        msg: "Tool Already Exist",
      });
    }
    const newTool = new Tool({
      toolName: toolName,
      iconClass: iconClass,
      user: email,
    });
    await newTool.save();
    return reply
      .status(201)
      .send({ success: true, msg: "Tool Add Successfully" });
  } catch (error) {
    return reply
      .status(500)
      .send({ success: false, msg: "Internal Server Error" });
  }
};
