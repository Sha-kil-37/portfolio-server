
"use strict";
// hello admin route test
const tap = require("tap");
const buildFastify = require("../../app"); // Path to your Fastify instance
tap.test("GET `/portfolio/api/v1/admin/`", async (t) => {
  const fastify = buildFastify;
  try {
    // Start the server
    await fastify.ready();
    // Perform the GET request
    const response = await fastify.inject({
      method: "GET",
      url: "/portfolio/api/v1/admin/",
    });
    // Assertions
    t.equal(response.statusCode, 200, "Status should be 200");
    t.same(JSON.parse(response.payload), {
      success: true,
      msg: "hello admin!",
    });
    // Close the server after tests
    await fastify.close();
  } catch (error) {
    console.log(error);
    // Close the server after tests
    await fastify.close();
  }
});
