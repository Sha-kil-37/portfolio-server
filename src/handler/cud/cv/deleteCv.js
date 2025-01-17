//
'use strict'
const mongoose = require("mongoose");
const Cv = require("../../../model/cv/cv.model");
module.exports = async function (request, reply) {
  //
  const { email } = request.headers;
  const { id } = request.query;
  try {
    // Validate Mongoose ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return reply.status(400).send({ error: "Invalid Id" });
    }
    // DELETE CLOUDINARY CV PDF BEFORE DELETE CV DATA
    const findCv = await Cv.findOne({
      user: email,
      _id: id,
    });
    await this.cloudinary.uploader.destroy(findCv.name, {
      resource_type: "raw",
    });
    await Cv.deleteOne({ user: email, _id: id });
    return reply.status(200).send({
      success: true,
      msg: "Cv Delete Successfully",
    });
  } catch (error) {
    return reply.status(500).send({
      success: false,
      msg: "Internal Server Error",
    });
  }
};
