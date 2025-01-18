"use strict";
// hello admin route test
const tap = require("tap");
const fastify = require("../../app"); // Replace with the path to your Fastify app
tap.test("GET http://localhost:8000/portfolio/api/v1/admin", async (t) => {
  try {
    // Ready the app for testing
    await fastify.ready();
    // Make a GET request
    const response = await fastify.inject({
      method: "GET",
      url: "http://localhost:8000/portfolio/api/v1/admin", // Replace with your API route
    });

    // Assertions
    t.same(JSON.parse(response.payload), {
      success: true,
      msg: "hello admin!",
    });
    // Close the Fastify instance
    await fastify.close();
  } catch (error) {
    console.log(error);
    // Close the Fastify instance
    await fastify.close();
  }
});
