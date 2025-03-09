"use strict";

const Footer = require("../../../model/footer/footer.model");

//
module.exports = async (req, reply) => {
  try {
    const footer = await Footer.findOne();
    return reply.status(200).send({
      success: true,
      message: "Footer data fetched successfully",
      data: footer
    });
  } catch (error) {
    reply.status(500).send({
      success: false,
      msg: "Internal Server Error",
    });
  }
};
