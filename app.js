require("dotenv").config();
const cloudinary = require("fastify-cloudinary");
// REGISTER FASTIFY LOGGER
const fastify = require("fastify")({ logger: true });
// REGISTER RATE LIMITE
fastify.register(require("@fastify/rate-limit"), {
  max: 100,
  timeWindow: "1 minute",
});

// REGISTER JWT TOKEN
fastify.register(require("@fastify/jwt"), {
  secret: process.env.TOKEN_SECRET,
});
// REGISTER MULTIPART FOR FORM DATA
fastify.register(require("@fastify/multipart"));
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
