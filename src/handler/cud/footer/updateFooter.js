//
'use strict'
const mongoose = require("mongoose");
const Footer = require("../../../model/footer/footer.model");
//
module.exports = async function (request, reply) {
  const { email } = request.headers;
  const { id } = request.query;
  const { contactInfo, socialLinks, navigationLinks, copyrightText } =
    request.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return reply.status(400).send({ error: "Invalid Id" });
    }

    //
    await Footer.updateOne(
      {
        user: email,
        _id: id,
      },
      {
        $set: {
          contactInfo: contactInfo,
          socialLinks: socialLinks,
          navigationLinks: navigationLinks,
          copyrightText: copyrightText,
        },
      }
    );
    return reply.status(200).send({
      success: true,
      msg: "Footer Update Successfully",
    });
    //
  } catch (error) {
    return reply.status(500).send({
      success: false,
      msg: "Internal Server Error",
    });
  }
};
