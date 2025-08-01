"use strict";
require("dotenv").config();
const fastify = require("./app");
const dbConnection = require("./src/config/db/dbConnection");
const port = process.env.PORT || 8000;
//
async function start() {
  try {
    await fastify.listen({ port: port });
    dbConnection();
  } catch (error) {

    process.exit(1);
  }
}
//
start();
