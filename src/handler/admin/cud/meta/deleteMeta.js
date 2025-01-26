'use strict'

const mongoose = require("mongoose");
const Meta = require("../../../../model/meta/meta.model.js");
//
module.exports = async function (request, reply) {
  //
  const { email } = request.headers;
  const { id } = request.query;
  try {
    // Validate Mongoose ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return reply.status(400).send({ error: "Invalid Id" });
    }
    //
    const findExistFavicon = await Meta.findOne({
      _id: id,
      user: email,
    });
    // delete cloudinary meta favicon image before delete meta data
    await this.cloudinary.uploader.destroy(findExistFavicon.favicon.public_id);
    await Meta.deleteOne({ _id: id, user: email });
    return reply.status(200).send({
      success: true,
      msg: "Meta Delete Successfully",
    });
  } catch (error) {
    return reply.status(500).send({
      success: false,
      msg: "Internal Server Error",
    });
  }
};
