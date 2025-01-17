'use strict'
const mongoose = require("mongoose");
const Education = require("../../../model/education/education.model");

//
module.exports = async function (request, reply) {
  const { email } = request.headers;
  const { id } = request.query;
  const { degree, institution, description, duration } = request.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return reply.status(400).send({ error: "Invalid Id" });
    }

    if (typeof request.file !== "object") {
      return reply.status(400).send({ success: false, msg: "File Require" });
    }
    if (!degree) {
      return reply.status(400).send({
        success: false,
        msg: "Degree Required",
      });
    }
    if (!description) {
      return reply.status(400).send({
        success: false,
        msg: "Description Required",
      });
    }
    if (!institution) {
      return reply.status(400).send({
        success: false,
        msg: "Institution Required",
      });
    }
    if (!duration) {
      return reply.status(400).send({
        success: false,
        msg: "Duration Required",
      });
    }
    // FIND EXIST PROJECT BEFORE UPDATE
    const findExistEducation = await Education.findOne({
      user: email,
      degree: degree,
    });
    if (findExistEducation !== null) {
      return reply.status(400).send({
        success: false,
        msg: "Education Already Exist",
      });
    }
    // DELETE CLOUDINARY OLD IMAGE BEFORE UPDATE NEW IMAGE
    const findImageId = await Education.findOne({ user: email, _id: id });
    await this.cloudinary.uploader.destroy(findImageId.image.public_id);
    // UPLOAD EDUCATION IMAGE IN CLOUDINARY
    const result = await this.cloudinary.uploader.upload(request.file.path, {
      folder: "portfolio-education",
      public_id: request.file.originalname,
    });
    await Education.updateOne(
      {
        _id: id,
        user: email,
      },
      {
        $set: {
          degree: degree,
          institution: institution,
          description: description,
          duration: duration,
          imageURL: {
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
    return reply.status(500).send({
      success: false,
      msg: "Internal Server Error",
    });
  }
};
