const mongoose = require("mongoose");
const Meta = require("../../../model/meta/meta.model");
// 
module.exports = async function (request, reply) {
  //
  const { email } = request.headers;
  const { id } = request.query;
  try {
    // Validate Mongoose ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return reply.status(400).send({ error: "Invalid Id" });
    }
    // 
    await this.cloudinary.api.delete_resources_by_prefix("portfolio-meta");
    await Meta.deleteOne({ _id: id, user: email });
    return reply.status(200).send({
      success: true,
      msg: "Meta Delete Successfully",
    });
  } catch (error) {
    return reply.status(500).send({
      success: false,
      msg: "Internal Server Error",
    });
  }
};
