// visitor route
"use strict";
function visitorRouter(fastify, options, done) {
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
  }); // contact route

  fastify.get("/get-admin", require("../handler/visitor/getAdmin.js")); // get admin route
  fastify.get("/get-footer", require("../handler/visitor/footer/getFooter.js")); // get footer route

  done();
}
module.exports = visitorRouter;
