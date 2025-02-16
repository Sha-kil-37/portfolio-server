// visitor route
"use strict";
function visitorRouter(fastify, options, done) {
  // contact route
  fastify.post("/contact", {
    schema: {
      body: {
        type: "object",
        required: ["name", "email", "message"],
        properties: {
          name: {
            type: "string",
          },
          email: {
            type: "string",
            format: "email",
          },
          message: {
            type: "string",
          },
        },
      },
    },
    handler: require("../handler/visitor/contact/contact.js"),
  });
  fastify.get("/get-admin",require("../handler/visitor/getAdmin.js"));
  // contact route end
  done();
}
module.exports = visitorRouter;
