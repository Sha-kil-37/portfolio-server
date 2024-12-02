const Project = require("../../../model/projects/project.model");
//
module.exports = async function (request, reply) {
  const { email } = request.headers;
  const {
    title,
    description,
    frontEndTechnologies,
    backEndTechnologies,
    liveURL,
    repoURL,
  } = request.body;
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
    const publicId = `${"portfolio project"}/${Date.now()}-${Math.random()
      .toString(36)
      .substring(2)}`;
    const result = await this.cloudinary.uploader.upload(request.file.path, {
      folder: "portfolio project",
      public_id: publicId,
    });
    const newProject = new Project({
      title: title,
      description: description,
      frontEndTechnologies: frontEndTechnologies,
      backEndTechnologies: backEndTechnologies,
      liveURL: liveURL,
      repoURL: repoURL,
      imageURL: { url: result.secure_url, public_id: publicId },
      user: email,
    });
    await newProject.save();
    return reply.status(201).send({
      success: true,
      msg: "Project Add Successfully",
    });
  } catch (error) {
    console.log(error);
    return reply.status(500).send({
      success: false,
      msg: "Internal Server Error",
    });
  }
};
