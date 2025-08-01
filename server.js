"use strict";
require("dotenv").config();
const fastify = require("./app");
const dbConnection = require("./src/config/db/dbConnection");
const port = Number(process.env.PORT) || 8000; // Default port is 8000 if not specified in .env

//
async function start() {
  try {
    await fastify.listen({ port: 8000, host: "0.0.0.0" });
    dbConnection();
  } catch (error) {
    process.exit(1);
  }
}
//
start();
