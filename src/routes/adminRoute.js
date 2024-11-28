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
    preHandler: require("../hooks/checkSignUp.js"),
    handler: require("../handler/signUp.js"),
  });
  // ADMIN SIGNIN ROUTE
  fastify.post("/sign-in", {
    schema: {
      body: {
        type: "object",
        required: ["email", "password"],
        properties: {
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
    preHandler: require("../hooks/checkSignIn.js"),
    handler: require("../handler/signIn.js"),
  });
  // ADMIN FORGOT PASS EMAIL VERIFICATION ROUTE
  fastify.post("/forgot-pass-email-verify", {
    schema: {
      body: {
        type: "object",
        required: ["email"],
        properties: {
          email: {
            type: "string",
            format: "email",
          },
        },
      },
    },
    preHandler: require("../hooks/checkForgotPassEmailVerify.js"),
    handler: require("../handler/forgotPasswordEmailVerify.js"),
  });
  // ADMIN FORGOT PASS CODE VERIFICATION ROUTE
  fastify.post("/forgot-pass-code-verify", {
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
    preHandler: require("../hooks/checkForgotPassCodeVerification.js"),
    handler: require("../handler/forgotPassCodeVerification.js"),
  });
  // ADMIN PASS CHANGE ROUTE
  fastify.post("/change-pass", {
    schema: {
      body: {
        type: "object",
        required: ["password"],
        properties: {
          password: {
            type: "string",
            maxLength: 100,
            minLength: 6,
          },
        },
      },
    },
    preHandler: require("../hooks/checkAuth.js"),
    handler: require("../handler/changePass.js"),
  });
  done();
}
module.exports = adminRouter;
//
