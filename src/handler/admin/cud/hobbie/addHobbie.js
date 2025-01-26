'use strict'
const Hobbie = require("../../../../model/hobbie/hobbie.model.js");
//
module.exports = async function (request, reply) {
  //
  const { email } = request.headers;
  const { name, iconClass, description } = request.body;
  //
  try {
    const findExistHobbie = await Hobbie.findOne({
      user: email,
      name: name,
    });
    if (findExistHobbie !== null) {
      return reply.status(400).send({
        success: false,
        msg: "Hobbie Already Exist",
      });
    }
    const newHobbie = new Hobbie({
      name: name,
      iconClass: iconClass,
      description: description,
      user: email,
    });
    await newHobbie.save();
    return reply
      .status(201)
      .send({ success: true, msg: "Hobbie Add Successfully" });
  } catch (error) {
    console.log(error);
    return reply
      .status(500)
      .send({ success: false, msg: "Internal Server Error" });
  }
};
