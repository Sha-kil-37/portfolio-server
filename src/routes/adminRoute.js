const upload = require("../utils/multer/multer.js");

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
    preHandler: require("../hooks/auth/checkSignUp.js"),
    handler: require("../handler/auth/signUp.js"),
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
    preHandler: require("../hooks/auth/checkSignIn.js"),
    handler: require("../handler/auth/signIn.js"),
  });
  // ADMIN FORGOT PASS EMAIL VERIFICATION ROUTE
  fastify.patch("/forgot-pass-email-verify", {
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
    preHandler: require("../hooks/auth/checkForgotPassEmailVerify.js"),
    handler: require("../handler/auth/forgotPasswordEmailVerify.js"),
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
    preHandler: require("../hooks/auth/checkForgotPassCodeVerification.js"),
    handler: require("../handler/auth/forgotPassCodeVerification.js"),
  });
  // ADMIN PASS CHANGE ROUTE
  fastify.patch("/change-pass", {
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
    preHandler: require("../hooks/auth/checkAuth.js"),
    handler: require("../handler/auth/changePass.js"),
  });
  // ADMIN PROFILE CHANGE
  fastify.patch("/profile-upload", {
    preHandler: [
      require("../hooks/auth/checkAuth.js"),
      upload.single("profile"),
    ],
    handler: require("../handler/auth/profileUpload.js"),
  });
  //  ADMIN SKILL ADD ROUTE
  fastify.post("/add-skill", {
    schema: {
      body: {
        type: "object",
        required: ["category", "skill", "description"],
        properties: {
          category: {
            type: "string",
          },
          skill: {
            type: "string",
          },
          description: {
            type: "string",
          },
        },
      },
    },
    preHandler: require("../hooks/auth/checkAuth.js"),
    handler: require("../handler/cud/skill/addSkill.js"),
  });
  // ADMIN SKILL UPDATE ROUTE
  fastify.put("/update-skill", {
    schema: {
      querystring: {
        type: "object",
        properties: {
          id: { type: "string" },
        },
        required: ["id"], // Ensure 'id' is provided
      },
      body: {
        type: "object",
        required: ["category", "skill", "description"],
        properties: {
          category: {
            type: "string",
          },
          skill: {
            type: "string",
          },
          description: {
            type: "string",
          },
        },
      },
    },
    preHandler: require("../hooks/auth/checkAuth.js"),
    handler: require("../handler/cud/skill/updateSkill.js"),
  });
  // ADMIN SKILL DELETE ROUTE
  fastify.delete("/delete-skill", {
    schema: {
      querystring: {
        type: "object",
        properties: {
          id: { type: "string" },
        },
        required: ["id"], // Ensure 'id' is provided
      },
    },
    preHandler: require("../hooks/auth/checkAuth.js"),
    handler: require("../handler/cud/skill/deleteSkill.js"),
  });
  // ADMIN PROJECT ADD ROUTE
  fastify.post("/add-project", {
    preHandler: [
      require("../hooks/auth/checkAuth.js"),
      upload.single("project-image"),
    ],
    handler: require("../handler/cud/project/addProject.js"),
  });
  // ADMIN PROJECT UPDATE ROUTE
  fastify.put("/update-project", {
    preHandler: [
      require("../hooks/auth/checkAuth.js"),
      upload.single("project-image"),
    ],
    handler: require("../handler/cud/project/updateProject.js"),
  });
  // ADMIN PROJECT DELETE ROUTE
  fastify.delete("/delete-project", {
    schema: {
      querystring: {
        type: "object",
        properties: {
          id: { type: "string" },
        },
        required: ["id"], // Ensure 'id' is provided
      },
    },
    preHandler: require("../hooks//auth/checkAuth.js"),
    handler: require("../handler/cud/project/deleteProject.js"),
  });
  // ADMIN FOOTER ADD ROUTE
  fastify.post("/add-footer", {
    schema: {
      body: {
        type: "object",
        required: [
          "contactInfo",
          "socialLinks",
          "navigationLinks",
          "copyrightText",
        ],
        properties: {
          contactInfo: {
            type: "object",
            required: ["email", "phone", "address"],
            properties: {
              email: { type: "string", format: "email" },
              phone: { type: "string" },
              address: { type: "string" },
            },
          },
          socialLinks: {
            type: "array",
            items: {
              type: "object",
              required: ["platform", "url", "iconClass"],
              properties: {
                platform: { type: "string" },
                url: { type: "string", format: "uri" },
                iconClass: { type: "string" },
              },
            },
          },
          navigationLinks: {
            type: "array",
            items: {
              type: "object",
              required: ["name", "url"],
              properties: {
                name: { type: "string" },
                url: { type: "string" },
              },
            },
          },
          copyrightText: { type: "string" },
        },
      },
    },
    preHandler: require("../hooks/auth/checkAuth.js"),
    handler: require("../handler/cud/footer/addFooter.js"),
  });
  // ADMIN FOOTER UPDATE ROUTE
  fastify.put("/update-footer", {
    schema: {
      body: {
        type: "object",
        required: [
          "contactInfo",
          "socialLinks",
          "navigationLinks",
          "copyrightText",
        ],
        properties: {
          contactInfo: {
            type: "object",
            required: ["email", "phone", "address"],
            properties: {
              email: { type: "string", format: "email" },
              phone: { type: "string" },
              address: { type: "string" },
            },
          },
          socialLinks: {
            type: "array",
            items: {
              type: "object",
              required: ["platform", "url", "iconClass"],
              properties: {
                platform: { type: "string" },
                url: { type: "string", format: "uri" },
                iconClass: { type: "string" },
              },
            },
          },
          navigationLinks: {
            type: "array",
            items: {
              type: "object",
              required: ["name", "url"],
              properties: {
                name: { type: "string" },
                url: { type: "string" },
              },
            },
          },
          copyrightText: { type: "string" },
        },
      },
    },
    preHandler: require("../hooks/auth/checkAuth.js"),
    handler: require("../handler/cud/footer/updateFooter.js"),
  });
  // ADMIN FOOTER DELETE
  fastify.delete("/delete-footer", {
    schema: {},
    preHandler: require("../hooks/auth/checkAuth.js"),
    handler:require("../handler/cud/footer/deleteFooter.js")
  });
  done();
}
module.exports = adminRouter;
//
