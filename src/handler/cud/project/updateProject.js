const mongoose = require("mongoose");
const Project = require("../../../model/projects/project.model");
//
module.exports = async function (request, reply) {
  const { email } = request.headers;
  const { id } = request.query;
  const {
    title,
    description,
    frontEndTechnologies,
    backEndTechnologies,
    liveURL,
    repoURL,
  } = request.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return reply.status(400).send({ error: "Invalid Id" });
    }

    if (typeof request.file !== "object") {
      return reply.status(400).send({ success: false, msg: "File Require" });
    }
    if (!title) {
      return reply.status(400).send({
        success: false,
        msg: "Title Required",
      });
    }
    if (!description) {
      return reply.status(400).send({
        success: false,
        msg: "Description Required",
      });
    }
    if (!frontEndTechnologies) {
      return reply.status(400).send({
        success: false,
        msg: "FrontEndTechnologies Required",
      });
    }
    if (!backEndTechnologies) {
      return reply.status(400).send({
        success: false,
        msg: "BackEndTechnologies Required",
      });
    }
    if (!liveURL) {
      return reply.status(400).send({
        success: false,
        msg: "Live Url Required",
      });
    }
    if (!repoURL) {
      return reply.status(400).send({
        success: false,
        msg: "Repo Url Required",
      });
    }
    // FIND EXIST PROJECT BEFORE UPDATE
    const findExistProject = await Project.findOne({
      user: email,
      title: title,
    });
    if (findExistProject !== null) {
      return reply.status(400).send({
        success: false,
        msg: "Project Already Exist",
      });
    }
    // DELETE CLOUDINARY OLD IMAGE BEFORE UPDATE NEW IMAGE
    const findImageId = await Project.findOne({ user: email, _id: id });
    await this.cloudinary.uploader.destroy(
      `${"portfolio project"}/${findImageId.imageURL.public_id}`
    );

    // UPLOAD PROJECT IMAGE IN CLOUDINARY
    const publicId = `${Date.now()}-${Math.random().toString(36).substring(2)}`;
    const result = await this.cloudinary.uploader.upload(request.file.path, {
      folder: "portfolio project",
      public_id: publicId,
    });
    await Project.updateOne(
      {
        _id: id,
        user: email,
      },
      {
        $set: {
          title: title,
          description: description,
          frontEndTechnologies: frontEndTechnologies,
          backEndTechnologies: backEndTechnologies,
          liveURL: liveURL,
          repoURL: repoURL,
          imageURL: {
            url: result.secure_url,
            public_id: publicId,
          },
        },
      }
    );
    return reply.status(200).send({
      success: true,
      msg: "Project Update Successfully",
    });
  } catch (error) {
    
    return reply.status(500).send({
      success: false,
      msg: "Internal Server Error",
    });
  }
};
