
'use strict'
const Project = require("../../../../model/projects/project.model.js");
//
module.exports = async function (request, reply) {
  const { email } = request.headers;
  const { title, description, technology, liveURL, repoURL } = request.body;
  try {
    const files = await request.files;
    if (!files || !Array.isArray(files) || files.length === 0) {
      return reply
        .status(400)
        .send({ success: "false", msg: "Files Required" });
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
    if (!technology) {
      return reply.status(400).send({
        success: false,
        msg: "Technology Required",
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
    // FIND EXISTING PROJECT BEFORE NEW CREATE
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
    //
    const uploadPromises = files.map((file) =>
      this.cloudinary.uploader.upload(file.path, {
        folder: "portfolio-projects", // Cloudinary folder
        public_id: file.originalname,
      })
    );

    // Wait for all uploads to complete
    const uploadResults = await Promise.all(uploadPromises);

    // Send response with Cloudinary URLs
    const images = uploadResults.map((result) => ({
      url: result.secure_url,
      public_id: result.public_id,
    }));
    const newProject = new Project({
      title: title,
      description: description,
      technology: technology,
      liveURL: liveURL,
      repoURL: repoURL,
      images: images,
      user: email,
    });
    await newProject.save();
    return reply.status(201).send({
      success: true,
      msg: "Project Add Successfully",
    });
  } catch (error) {
    return reply.status(500).send({
      success: false,
      msg: "Internal Server Error",
    });
  }
};
