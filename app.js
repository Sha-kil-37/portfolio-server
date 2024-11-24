require("dotenv").config();
//
const fastify = require("fastify")({ logger: true });
fastify.register(require("@fastify/jwt"), {
  secret: process.env.TOKEN_SECRECT,
});
//
fastify.register(require("./src/routes/adminRoute"), {
  prefix: "/portfolio/api/v1/admin",
});
//
module.exports = fastify;
