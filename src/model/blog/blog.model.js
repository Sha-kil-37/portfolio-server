// BLOG DATA MODEL
const mongoose = require("mongoose");
const { Schema } = mongoose;
//
const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    imageURL: {
      url: String,
      public_id: String,
    },
    user: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);
//

//
const Blog = mongoose.model("blog", blogSchema);
module.exports = Blog;
