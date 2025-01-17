"use strict";
const mongoose = require("mongoose");
const Blog = require("../../../model/blog/blog.model"); // blog data model
//
module.exports = async function (request, reply) {
  const { email } = request.headers;
  const { id } = request.query;
  const { title, slug, content, tags } = request.body;
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
        msg: "Tags Required",
      });
    }

    // FIND EXIST PROJECT BEFORE UPDATE
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

    const findExistBlogImage = await Blog.findOne({ user: email, _id: id });

    // delete existing blog image before update new blog
    await this.cloudinary.uploader.destroy(
      findExistBlogImage.imageURL.public_id
    );
    // upload blog image cloudinary
    const uploadBlogImage = await this.cloudinary.uploader.upload(
      request.file.path,
      {
        folder: "portfolio-blog",
        public_id: request.file.originalname,
      }
    );

    await Blog.updateOne(
      {
        _id: id,
        user: email,
      },
      {
        $set: {
          title: title,
          slug: slug,
          content: content,
          tags: JSON.parse(tags),
          imageURL: {
            url: uploadBlogImage.secure_url,
            public_id: uploadBlogImage.public_id,
          },
        },
      }
    );
    return reply.status(200).send({
      success: true,
      msg: "Blog Update Successfully",
    });
  } catch (error) {
    return reply.status(500).send({
      success: false,
      msg: "Internal Server Error",
    });
  }
};
