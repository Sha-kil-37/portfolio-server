function adminRouter(fastify, options, done) {
  // ADMIN WELLCOME ROUTE
  fastify.get("/", {
    handler: async (request, reply) => {
      // Your route handler logic here
      reply.send("hello admin");
    },
  });
  // ADMIN SIGNUP ROUTE
  fastify.post("/sign-up", {
    schema: {
      body: {
        type: "object",
        required: ["name", "email", "password"],
        properties: {
          name: {
            type: "string",
            pattern: "^[a-zA-Zà-ÿÀ-Ÿ'\\-\\s]+$",
          },
          email: {
            type: "string",
            format: "email",
          },
          password: {
            type: "string",
            minLength: 6,
            maxLength: 100,
          },
        },
      },
    },
    preHandler: require("../hooks/checkSignUp"),
    handler: require("../handler/signUp"),
  });
  // ADMIN SIGNIN ROUTE
  fastify.get("/sign-in", {
    schema: {
      querystring: {
        type: "object",
        properties: {
          email: { type: "string" },
          password: { type: "string", minLength: 6 },
        },
        required: ["email", "password"],
      },
    },
    preHandler: require("../hooks/checkSignIn"),
    handler: require("../handler/signIn"),
  });
  // ADMIN PASS RESET EMAIL VERIFICATION ROUTE
  fastify.get("/reset-email-verify", {
    preHandler: require("../hooks/checkAuthToken"),
    handler: require("../handler/resetEmailVerify"),
  });
  // ADMIN PASS RESET CODE VERIFICATION ROUTE
  fastify.post("/reset-code-verify", {
    schema: {
      body: {
        type: "object",
        required: ["code"],
        properties: {
          code: {
            type: "string",
            maxLength: 6,
            minLength: 6,
          },
        },
      },
    },
    preHandler: require("../hooks/checkAuthToken"),
    handler: require("../handler/resetCodeVerify"),
  });
  // ADMIN PASSWORD RESET
  fastify.post("/reset-pass", {
    schema: {
      body: {
        type: "object",
        required: ["newPassword"],
        properties: {
          newPassword: {
            type: "string",
            minLength: 6,
            maxLength: 100,
          },
        },
      },
    },
    preHandler: require("../hooks/checkAuthToken"),
    handler: require("../handler/resetPassword"),
  });
  // fastify.
  // call done function
  done();
}
module.exports = adminRouter;
//
