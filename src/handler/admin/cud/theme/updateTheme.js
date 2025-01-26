
'use strict'
const mongoose = require("mongoose");
const Theme = require("../../../../model/theme/theme.model.js");
//
module.exports = async function (request, reply) {
  const {
    name,
    isActive,
    primaryColor,
    secondaryColor,
    backgroundColor,
    textColor,
  } = request.body;
  const { email } = request.headers;
  const { id } = request.query;
  try {
    // Validate Mongoose ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return reply.status(400).send({ error: "Invalid Id" });
    }
    const existingTheme = await Theme.findOne({
      name: name,
      user: email,
    });
    if (existingTheme !== null) {
      return reply.status(400).send({
        success: false,
        msg: "Theme Already Exist",
      });
    }
    await Theme.updateOne(
      { _id: id, user: email },
      {
        $set: {
          name: name,
          isActive: isActive,
          primaryColor: primaryColor,
          secondaryColor: secondaryColor,
          backgroundColor: backgroundColor,
          textColor: textColor,
        },
      }
    );
    return reply.status(200).send({
      success: true,
      msg: "Update Theme Successfully",
    });
  } catch (error) {
    return reply.status(500).send({
      success: false,
      msg: "Internal Server Error",
    });
  }
};
