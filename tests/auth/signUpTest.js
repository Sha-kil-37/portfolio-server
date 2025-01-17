"use strict";
// admin signUp route test
const tap = require("tap");
const buildFastify = require("../../app"); // Path to your Fastify instance
tap.test("POST `/portfolio/api/v1/admin/sign-up`", async (t) => {
  const fastify = buildFastify;
  try {
    // Start the server
    await fastify.ready();
    // Perform the GET request
    const response = await fastify.inject({
      method: "POST",
      url: "/portfolio/api/v1/admin/sign-up",
      payload: {
        name: "shakil",
        email: "sakildevmern@gmail.com",
        password: "123456",
      },
    });
    //
    console.log(response);
    //
    // Assertions
    // t.equal(response.statusCode, 200, "Status should be 200");
    // t.same(JSON.parse(response.payload), {
    //   success: true,
    //   msg: "hello admin!",
    // });
    // Close the server after tests
    await fastify.close();
  } catch (error) {
    console.log(error);
    // Close the server after tests
    await fastify.close();
  }
});
