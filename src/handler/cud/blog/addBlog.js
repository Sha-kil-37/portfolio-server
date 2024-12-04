const Blog = require("../../../model/blog/blog.model");

//
module.exports = async function (request, reply) {
  const { email } = request.headers;
  const { title, slug, content, tags } = request.body;
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
    if (!slug) {
      return reply.status(400).send({
        success: false,
        msg: "Slug Required",
      });
    }
    if (!content) {
      return reply.status(400).send({
        success: false,
        msg: "Content Required",
      });
    }
    if (!tags) {
      return reply.status(400).send({
        success: false,
        msg: "Tag Required",
      });
    }

    // FIND EXISTING PROJECT BEFORE NEW CREATE
    const findExistBlog = await Blog.findOne({
      user: email,
      title: title,
    });
    if (findExistBlog !== null) {
      return reply.status(400).send({
        success: false,
        msg: "Blog Already Exist",
      });
    }
    const publidId = `${Date.now()}-${Math.random().toString(36).substring(2)}`;
    const result = await this.cloudinary.uploader.upload(request.file.path, {
      folder: "portfolio blog",
      public_id: publidId,
    });
    const newBlog = new Blog({
      title: title,
      slug: slug,
      content: content,
      tags: tags,
      imageURL: {
        url: result.secure_url,
        public_id: publidId,
      },
      user: email,
    });
    await newBlog.save();
    return reply.status(201).send({
      success: true,
      msg: "Blog Add Successfully",
    });
  } catch (error) {
    return reply.status(500).send({
      success: false,
      msg: "Internal Server Error",
    });
  }
};
