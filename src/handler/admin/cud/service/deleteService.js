// DELETE SERVICE
"use strict";
const mongoose = require("mongoose");
const Service = require("../../../../model/service/service.model.js");
//
module.exports = async function (request, reply) {
  const { email } = request.headers;
  const { id } = request.query;
  try {
    // Validate Mongoose ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return reply.status(400).send({ error: "Invalid Id" });
    }
    // DELETE CLOUDINARY SERVICE IMAGE BEFORE DELETE SERVICE
    const findImageId = await Service.findOne({
      user: email,
      _id: id,
    });
    await this.cloudinary.uploader.destroy(findImageId.image.public_id);
    await Service.deleteOne({ _id: id, user: email });
    return reply.status(200).send({
      success: true,
      msg: "Service Delete Successfully",
    });
  } catch (error) {
    return reply.status(500).send({
      success: false,
      msg: "Internal Server Error",
    });
  }
};
