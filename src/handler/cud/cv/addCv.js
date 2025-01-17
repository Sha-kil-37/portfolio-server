'use strict'
const Cv = require("../../../model/cv/cv.model");
//
module.exports = async function (request, reply) {
  const { email } = request.headers;
  //
  try {
    // Check if the uploaded file is a PDF
    const file = request.file;
    if (file.mimetype !== "application/pdf") {
      return reply
        .status(400)
        .send({ success: false, msg: "Pdf file require" });
    }
    // FIND EXISTING EDUCATION BEFORE NEW CREATE
    const findExistCv = await Cv.findOne({
      user: email,
    });
    //
    if (findExistCv !== null) {
      return reply.status(400).send({
        success: false,
        msg: "Cv Already Exist",
      });
    }
    const result = await this.cloudinary.uploader.upload(file.path, {
      resource_type: "raw", // For PDF files
      folder: "portfolio-cv",
      public_id: file.originalname, // shakil.pdf
    });
    //
    const newCv = new Cv({
      user: email,
      name: result.public_id,
      pdfUrl: result.secure_url,
      user: email,
    });
    await newCv.save();
    return reply.status(201).send({
      success: true,
      msg: "Cv Add Successfully",
    });
  } catch (error) {
    return reply.status(500).send({
      success: false,
      msg: "Internal Server Error",
    });
  }
};
