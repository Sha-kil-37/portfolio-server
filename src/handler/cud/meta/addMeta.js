const Meta = require("../../../model/meta/meta.model");

//
module.exports = async function (request, reply) {
  //
  const { email } = request.headers;
  const { title, favicon } = request.body;
  //
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
  

    // FIND EXISTING EDUCATION BEFORE NEW CREATE
    const findExistMeta = await Meta.findOne({
      user: email,
      // title: title,
    });
    if (findExistMeta !== null) {
      return reply.status(400).send({
        success: false,
        msg: "Meta Already Exist",
      });
    }
    const result = await this.cloudinary.uploader.upload(request.file.path, {
      folder: "portfolio-meta",
      public_id: request.file.originalname,
    });

    const newMeta = new Meta({
      title: title,
      favicon: {
        url: result.secure_url,
        public_id: result.public_id,
      },
      user: email,
    });
    await newMeta.save();
    return reply
      .status(201)
      .send({ success: true, msg: "Meta Add Successfully" });
  } catch (error) {
    return reply
      .status(500)
      .send({ success: false, msg: "Internal Server Error" });
  }
};
