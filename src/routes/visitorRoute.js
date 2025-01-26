"use strict";
function visitorRouter(fastify, options, done) {
  //
  fastify.get("/", (request, reply) => {
    reply.send({
      msg: "Visitor Route",
    });
  });
  //
  done();
}
module.exports = visitorRouter;
