const Admin = require("../../model/admin/admin.model");
//
require("dotenv").config();

module.exports = async function (request, reply) {
  const { email } = request.headers;
  try {
    const data = request.file;
    if (typeof data !== "object") {
      return reply.status(400).send({ success: false, msg: "File Require" });
    }
    await this.cloudinary.uploader.destroy(`${"portfolio profile"}/${email}`);
    const result = await this.cloudinary.uploader.upload(data.path, {
      folder: "portfolio profile",
      public_id: email,
    });
    // UPDATE ADMIN IMAGE
    await Admin.updateOne(
      { email: email },
      {
        $set: {
          image: result.secure_url,
        },
      }
    );
    return reply
      .status(200)
      .send({ success: true, msg: "Profile Upload Successfully" });
  } catch (error) {
    return reply
      .status(500)
      .send({ success: false, msg: "Internal Server Error" });
  }
};
