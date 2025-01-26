"use strict";
const mongoose = require("mongoose");
const Service = require("../../../../model/service/service.model.js");
//
module.exports = async function (request, reply) {
  const { email } = request.headers;
  const { id } = request.query;
  const { title, description, features } = request.body;
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
    if (!description) {
      return reply.status(400).send({
        success: false,
        msg: "Description Required",
      });
    }
    if (!features) {
      return reply.status(400).send({
        success: false,
        msg: "Features Required",
      });
    }

    // FIND EXIST SERVICE BEFORE UPDATE
    const findExistService = await Service.findOne({
      user: email,
      title: title,
    });
    if (findExistService !== null) {
      return reply.status(400).send({
        success: false,
        msg: "Service Already Exist",
      });
    }
    // DELETE CLOUDINARY OLD IMAGE BEFORE UPDATE NEW IMAGE
    const findImageId = await Service.findOne({ user: email, _id: id });
    await this.cloudinary.uploader.destroy(findImageId.image.public_id);
    // UPLOAD SERVICE IMAGE IN CLOUDINARY
    const result = await this.cloudinary.uploader.upload(request.file.path, {
      folder: "portfolio-service",
      public_id: request.file.originalname,
    });
    await Service.updateOne(
      {
        _id: id,
        user: email,
      },
      {
        $set: {
          title: title,
          description: description,
          features: features,
          imageURL: {
            url: result.secure_url,
            public_id: request.file.originalname,
          },
        },
      }
    );
    return reply.status(200).send({
      success: true,
      msg: "Service Update Successfully",
    });
  } catch (error) {
    return reply.status(500).send({
      success: false,
      msg: "Internal Server Error",
    });
  }
};
