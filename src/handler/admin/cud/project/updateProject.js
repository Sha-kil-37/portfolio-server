'use strict'
const mongoose = require("mongoose");
const Project = require("../../../../model/projects/project.model.js");
//
module.exports = async function (request, reply) {
  const { email } = request.headers;
  const { id } = request.query;
  const { title, description, technology, liveURL, repoURL } = request.body;
  //
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return reply.status(400).send({ error: "Invalid Id" });
    }
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
    const getExistProject = await Project.findOne({
      _id: id,
      user: email,
    });
    const getExistProjectImagesArray = getExistProject.images.map(
      (item) => item.public_id
    );
    // delete before each image from cloudinary
    const deletePromise = getExistProjectImagesArray.map((public_id) =>
      this.cloudinary.uploader.destroy(public_id)
    );
    // Wait for all delete to complete
    await Promise.all(deletePromise);
    // Upload each file to Cloudinary
    const uploadPromises = files.map((file) =>
      this.cloudinary.uploader.upload(file.path, {
        folder: "portfolio-projects", // Cloudinary folder
        public_id: file.originalname,
      })
    );
    // // Wait for all uploads to complete
    const uploadResults = await Promise.all(uploadPromises);
    const images = uploadResults.map((image) => ({
      url: image.secure_url,
      public_id: image.public_id,
    }));
    //
    await Project.updateOne(
      {
        _id: id,
        user: email,
      },
      {
        $set: {
          title: title,
          description: description,
          technology: technology,
          liveURL: liveURL,
          repoURL: repoURL,
          images: images,
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
