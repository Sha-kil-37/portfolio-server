'use strict'
const mongoose = require("mongoose");
const Meta = require("../../../model/meta/meta.model");
//
module.exports = async function (request, reply) {
  const { email } = request.headers;
  const { id } = request.query;
  const { title } = request.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return reply.status(400).send({ error: "Invalid Id" });
    }
    if (typeof request.file !== "object") {
      return reply.status(400).send({ success: false, msg: "File Require" });
    }
    if (!title) {
      return reply.status(400).send({
        success: false,
        msg: "Title Required",
      });
    }
    // FIND EXIST PROJECT BEFORE UPDATE
    const findExistMeta = await Meta.findOne({
      user: email,
      title: title,
    });
    if (findExistMeta !== null) {
      return reply.status(400).send({
        success: false,
        msg: "Meta Already Exist",
      });
    }
    const findExistMetaFavicon = await Meta.findOne({
      _id: id,
      user: email,
    });
    // DELETE CLOUDINARY OLD IMAGE BEFORE UPDATE NEW META
    await this.cloudinary.uploader.destroy(
      findExistMetaFavicon.favicon.public_id
    );
    // UPLOAD META IMAGE IN CLOUDINARY
    const result = await this.cloudinary.uploader.upload(request.file.path, {
      folder: "portfolio-meta",
      public_id: request.file.originalname,
    });
    await Meta.updateOne(
      {
        _id: id,
        user: email,
      },
      {
        $set: {
          title: title,
          favicon: {
            url: result.secure_url,
            public_id: request.file.originalname,
          },
        },
      }
    );
    return reply.status(200).send({
      success: true,
      msg: "Education Update Successfully",
    });
  } catch (error) {
    console.log(error);
    return reply.status(500).send({
      success: false,
      msg: "Internal Server Error",
    });
  }
};
