"use strict";
// hello admin route test
const tap = require("tap");
const faker = require("@faker-js/faker");
const fastify = require("../../app"); // Replace with the path to your Fastify app
const mock = require("mock-import");

tap.test(
  "POST http://localhost:8000/portfolio/api/v1/admin/sign-in",
  async (t) => {
    const name = faker.name.findName();
    const email = faker.internet.email();
    const password = faker.internet.password();
    // Ready the app for testing
    await fastify.ready();
    t.teardown(() => {
      fastify.close();
    });
    const stub = mock.mockImport("createAdmin", {
      name,
      email,
      password,
    });
    const response = await fastify.inject({
      method: "POST",
      url: "http://localhost:8000/portfolio/api/v1/admin/sign-up",
      payload: {
        name: name,
        email: email,
        password: password,
      },
    });
    console.log(response);
;
   
  }
);
