const Admin = require("../../model/admin/admin.model");
//
require("dotenv").config();
//
module.exports = async function (request, reply) {
  const { email } = request.headers;
  try {
    const files = await request.files;
    if (!files || !Array.isArray(files) || files.length === 0) {
      return reply
        .status(400)
        .send({ success: "false", msg: "Files Required" });
    }
    // GET ALL IMAGE FROM CLOUDINARY
    const resources = await this.cloudinary.api.resources({
      type: "upload",
      prefix: "portfolio-profiles",
    });
    //
    const existingImageIds = resources.resources.map((res) => res.public_id);
    const newImageIds = files.map(
      (file) => `portfolio-profiles/${file.originalname}`
    ); //
    const imagesToDelete = existingImageIds.filter((image) =>
      newImageIds.includes(image)
    );
    const deletePromises = imagesToDelete.map((publicId) =>
      this.cloudinary.uploader.destroy(publicId)
    );
    await Promise.all(deletePromises);
    // Upload each file to Cloudinary
    const uploadPromises = files.map((file) =>
      this.cloudinary.uploader.upload(file.path, {
        folder: "portfolio-profiles", // Cloudinary folder
        public_id: file.originalname,
      })
    );
    // Wait for all uploads to complete
    const uploadResults = await Promise.all(uploadPromises);
    const images = uploadResults.map((image) => ({
      url: image.secure_url,
      public_id: image.public_id,
    }));
    // // UPDATE ADMIN IMAGE
    await Admin.updateOne(
      { email: email },
      {
        $set: {
          images: images,
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
