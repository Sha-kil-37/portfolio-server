//
'use strict'
const mongoose = require("mongoose");
const Blog = require("../../../../model/blog/blog.model.js");
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
    // DELETE CLOUDINARY PROJECT IMAGE BEFORE DELETE EDUCATION
    const findImageId = await Blog.findOne({
      user: email,
      _id: id,
    });
    await this.cloudinary.uploader.destroy(findImageId.imageURL.public_id);
    await Blog.deleteOne({ _id: id, user: email });
    return reply.status(200).send({
      success: true,
      msg: "Blog Delete Successfully",
    });
  } catch (error) {
    return reply.status(500).send({
      success: false,
      msg: "Internal Server Error",
    });
  }
};
