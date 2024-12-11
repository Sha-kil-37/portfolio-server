require("dotenv").config();
const fastify = require("./app");
const dbConnection = require("./src/config/db/dbConnection");
//
async function start() {
  try {
    await fastify.listen({ port: process.env.PORT || 5000});
    dbConnection()
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
}
//
start();
