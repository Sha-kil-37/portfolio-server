// ADD SERVICE HANDLER
"use strict";
const Service = require("../../../../model/service/service.model.js");
module.exports = async function (request, reply) {
  const { email } = request.headers;
  const { title, description, features } = request.body;
  try {
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
   

    // FIND EXISTING SERVICE BEFORE NEW CREATE
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
    const result = await this.cloudinary.uploader.upload(request.file.path, {
      folder: "portfolio-service",
      public_id: request.file.originalname,
    });
    const newService = new Service({
      title: title,
      description: description,
      features: features,
      image: {
        url: result.secure_url,
        public_id: result.public_id,
      },
      user: email,
    });
    await newService.save();
    return reply.status(201).send({
      success: true,
      msg: "Service Add Successfully",
    });
  } catch (error) {
    return reply.status(500).send({
      success: false,
      msg: "Internal Server Error",
    });
  }
};