"use strict";
const Blog = require("../../../../model/blog/blog.model"); // blog data model
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
    // upload blog image in cloudinary
    const uploadBlogImage = await this.cloudinary.uploader.upload(
      request.file.path,
      {
        folder: "portfolio-blog",
        public_id: request.file.originalname,
      }
    );
    const newBlog = new Blog({
      title: title,
      slug: slug,
      content: content,
      tags: JSON.parse(tags),
      imageURL: {
        url: uploadBlogImage.secure_url,
        public_id: uploadBlogImage.public_id,
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
