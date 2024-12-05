// 
const mongoose = require("mongoose");
const Education = require("../../../model/education/education.model");
module.exports = async function (request, reply) {
  //
  const { email } = request.headers;
  const { id } = request.query;
  try {
    // Validate Mongoose ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return reply.status(400).send({ error: "Invalid Id" });
    }
    // DELETE CLOUDINARY PROJECT IMAGE BEFORE DELETE Education
    const findImageId = await Education.findOne({
      user: email,
      _id: id,
    });
    await this.cloudinary.uploader.destroy(
      `${"portfolio-education"}/${findImageId.image.public_id}`
    );
    await Education.deleteOne({ _id: id, user: email });
    return reply.status(200).send({
      success: true,
      msg: "Education Delete Successfully",
    });
  } catch (error) {
    return reply.status(500).send({
      success: false,
      msg: "Internal Server Error",
    });
  }
};
