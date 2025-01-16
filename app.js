'use strict'
require("dotenv").config();
const cloudinary = require("fastify-cloudinary");
// REGISTER FASTIFY LOGGER
const fastify = require("fastify")({ logger: true });
// REGISTER RATE LIMITE
fastify.register(require("@fastify/rate-limit"), {
  max: 100,
  timeWindow: "1 minute",
});
// REGISTER CORS
fastify.register(require("@fastify/cors"), {
  // put your options here
  origin: true,
});
// REGISTER JWT TOKEN
fastify.register(require("@fastify/jwt"), {
  secret: process.env.TOKEN_SECRET,
});
// REGISTER MULTIPART FOR FORM DATA
fastify.register(require("@fastify/multipart"), {
  limits: {
    fileSize: 10 * 1024 * 1024, // Limit file size to 10MB
  },
});
// REGISTER CLOUDINARY
fastify.register(cloudinary, {
  url: `cloudinary://${process.env.CLOUDINARY_API_KEY}:${process.env.CLOUDINARY_API_SECRET}@${process.env.CLOUDINARY_NAME}`,
});
// REGISTER ADMIN ROUTE
fastify.register(require("./src/routes/adminRoute"), {
  prefix: "/portfolio/api/v1/admin",
});
//
module.exports = fastify;
