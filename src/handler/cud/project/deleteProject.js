const Project = require("../../../model/projects/project.model");
const mongoose = require("mongoose");
module.exports = async function (request, reply) {
  //
  const { email } = request.headers;
  const { id } = request.query;
  try {
    // Validate Mongoose ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return reply.status(400).send({ error: "Invalid Id" });
    }
    // DELETE CLOUDINARY PROJECT IMAGE BEFORE DELETE PROJECT
    const findImages = await Project.findOne({
      user: email,
      _id: id,
    });
    //
    findImages.images.map((image) => {
      this.cloudinary.uploader.destroy(image.public_id);
    });
    //
    await Project.deleteOne({ _id: id, user: email });
    //
    return reply.status(200).send({
      success: true,
      msg: "Project Delete Successfully",
    });
  } catch (error) {
    return reply.status(500).send({
      success: false,
      msg: "Internal Server Error",
    });
  }
};
