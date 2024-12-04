const Education = require("../../../model/education/education.model");

//
module.exports = async function (request, reply) {
  const { email } = request.headers;
  const { degree, institution, description, duration } = request.body;
  try {
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

    // FIND EXISTING EDUCATION BEFORE NEW CREATE
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
    const publidId = `${Date.now()}-${Math.random().toString(36).substring(2)}`;
    const result = await this.cloudinary.uploader.upload(request.file.path, {
      folder: "portfolio education",
      public_id: publidId,
    });
    const newEducation = new Education({
      degree: degree,
      description: description,
      institution: institution,
      duration: duration,
      imageURL: {
        url: result.secure_url,
        public_id: publidId,
      },
      user: email,
    });
    await newEducation.save();
    return reply.status(201).send({
      success: true,
      msg: "Education Add Successfully",
    });
  } catch (error) {
    return reply.status(500).send({
      success: false,
      msg: "Internal Server Error",
    });
  }
};
