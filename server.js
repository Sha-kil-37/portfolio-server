require("dotenv").config();
const fastify = require("./app");
const dbConnection = require("./src/config/db/dbConnection");
const port = Number(process.env.PORT) || 5000;
//
async function start() {
  try {
    await fastify.listen({ port: port });
    dbConnection();
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
}
//
start();
