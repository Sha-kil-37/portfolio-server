"use strict";
const Admin = require("../../model/admin/admin.model");

//
module.exports = async (req, reply) => {
  try {
    const admin = await Admin.findOne(
      {},
      { _id: 0, password: 0, verifyCode: 0, verifyCodeExp: 0 }
    );
    return reply.status(200).send({
      success: true,
      msg: "Get Admin Data Successfully",
      data: admin,
    });
  } catch (error) {
    reply.status(500).send({
      success: false,
      msg: "Internal Server Error",
    });
  }
};
