
'use strict'
const mongoose = require("mongoose");
const Cv = require("../../../model/cv/cv.model");
//
module.exports = async function (request, reply) {
  const { email } = request.headers;
  const { id } = request.query;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return reply.status(400).send({ error: "Invalid Id" });
    }
    const file = request.file;
    if (file.mimetype !== "application/pdf") {
      return reply
        .status(400)
        .send({ success: false, msg: "Pdf file require" });
    }
    // get cv data from db
    const findCv = await Cv.findOne({ _id: id, user: email });
    // DELETE CLOUDINARY OLD CV BEFORE UPDATE NEW CV
    await this.cloudinary.uploader.destroy(findCv.name, {
      resource_type: "raw",
    });
    const result = await this.cloudinary.uploader.upload(file.path, {
      resource_type: "raw", // For PDF files
      folder: "portfolio-cv",
      public_id: file.originalname, //
    });
    await Cv.updateOne(
      {
        _id: id,
        user: email,
      },
      {
        $set: {
          name: result.public_id,
          pdfUrl: result.secure_url,
        },
      }
    );
    return reply.status(200).send({
      success: true,
      msg: "Cv Update Successfully",
    });
  } catch (error) {

    return reply.status(500).send({
      success: false,
      msg: "Internal Server Error",
    });
  }
};
