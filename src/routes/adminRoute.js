const Cv = require("../model/cv/cv.model.js");
const upload = require("../utils/multer/multer.js");
//
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
  fastify.patch("/forgot-email-verify", {
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
  fastify.post("/forgot-code-verify", {
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
      upload.array("profiles", 3),
    ],
    handler: require("../handler/auth/profileUpload.js"),
  });
  // ADMIN PROFILE UPDATE
  fastify.patch("/profile-update", {
    schema: {
      body: {
        type: "object",
        required: ["name", "title", "age", "about", "subTitle"],
        properties: {
          name: {
            type: "string",
            pattern: "^[a-zA-Zà-ÿÀ-Ÿ'\\-\\s]+$",
          },
          title: {
            type: "string",
            pattern: "^[a-zA-Zà-ÿÀ-Ÿ'\\-\\s]+$",
          },
          subTitle: {
            type: "string",
          },
          age: {
            type: "string",
          },
          about: {
            type: "string",
          },
        },
      },
    },

    preHandler: require("../hooks/auth/checkAuth.js"),
    handler: require("../handler/auth/profileUpdate.js"),
  });
  // admin route end
  //  ADMIN SKILL ADD ROUTE
  fastify.post("/add-skill", {
    schema: {
      body: {
        type: "object",
        required: ["skill", "description"],
        properties: {
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
        required: ["skill", "description"],
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
  // skill route end
  // ADMIN PROJECT ADD ROUTE
  fastify.post("/add-project", {
    preHandler: [
      require("../hooks/auth/checkAuth.js"),
      upload.array("projects", 10),
    ],
    handler: require("../handler/cud/project/addProject.js"),
  });
  // ADMIN PROJECT UPDATE ROUTE
  fastify.put("/update-project", {
    preHandler: [
      require("../hooks/auth/checkAuth.js"),
      upload.array("projects", 10),
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
  // project route end
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
    handler: require("../handler/cud/footer/deleteFooter.js"),
  });
  // footer route end
  // ADMIN EXPERIENCE ADD ROUTE
  fastify.post("/add-experience", {
    schema: {
      body: {
        type: "object",
        required: ["companyName", "position", "duration", "description"],
        properties: {
          companyName: { type: "string" },
          position: {
            type: "array",
            items: { type: "string" },
          },
          duration: { type: "string" },
          description: { type: "string" },
        },
      },
    },
    preHandler: require("../hooks/auth/checkAuth.js"),
    handler: require("../handler/cud/experience/addExperience.js"),
  });
  // ADMIN EXPERIENCE UPDATE ROUTE
  fastify.put("/update-experience", {
    schema: {
      body: {
        type: "object",
        required: ["companyName", "position", "duration", "description"],
        properties: {
          companyName: { type: "string" },
          position: {
            type: "array",
            items: { type: "string" },
          },
          duration: { type: "string" },
          description: { type: "string" },
        },
      },
    },
    preHandler: require("../hooks/auth/checkAuth.js"),
    handler: require("../handler/cud/experience/updateExperience.js"),
  });
  // ADMIN EXPERIENCE DELETE ROUTE
  fastify.delete("/delete-experience", {
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
    handler: require("../handler/cud/experience/deleteExperience.js"),
  });
  // experience route end
  // ADMIN EDUCATION ADD ROUTE
  fastify.post("/add-education", {
    preHandler: [
      require("../hooks/auth/checkAuth.js"),
      upload.single("education-image"),
    ],
    handler: require("../handler/cud/education/addEducation.js"),
  });
  // ADMIN EDUCATION UPDATE ROUTE
  fastify.put("/update-education", {
    preHandler: [
      require("../hooks/auth/checkAuth.js"),
      upload.single("education-image"),
    ],
    handler: require("../handler/cud/education/updateEducation.js"),
  });
  // ADMIN EDUCATION DELETE ROUTE
  fastify.delete("/delete-education", {
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
    handler: require("../handler/cud/education/deleteEducation.js"),
  });
  // education route end
  // ADMIN BLOG ADD ROUTE
  fastify.post("/add-blog", {
    preHandler: [
      require("../hooks/auth/checkAuth.js"),
      upload.single("blog-image"),
    ],
    handler: require("../handler/cud/blog/addBlog.js"),
  });
  // ADMIN  BLOG UPDATE ROUTE
  fastify.put("/update-blog", {
    preHandler: [
      require("../hooks/auth/checkAuth.js"),
      upload.single("blog-image"),
    ],
    handler: require("../handler/cud/blog/updateBlog.js"),
  });
  //ADMIN BLOG DELETE ROUTE
  fastify.delete("/delete-blog", {
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
    handler: require("../handler/cud/blog/deleteBlog.js"),
  });
  // blog router end
  // ADMIN THEME ADD ROUTE
  fastify.post("/add-theme", {
    schema: {
      body: {
        type: "object",
        required: [
          "name",
          "isActive",
          "primaryColor",
          "secondaryColor",
          "backgroundColor",
          "textColor",
        ],
        properties: {
          name: { type: "string" },
          isActive: {
            type: "string",
          },
          primaryColor: { type: "string" },
          secondaryColor: {
            type: "string",
          },
          backgroundColor: { type: "string" },
          textColor: {
            type: "string",
          },
        },
      },
    },
    preHandler: require("../hooks/auth/checkAuth.js"),
    handler: require("../handler/cud/theme/addTheme.js"),
  });
  // ADMIN THEME UPDATE ROUTE
  fastify.put("/update-theme", {
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
        required: [
          "name",
          "isActive",
          "primaryColor",
          "secondaryColor",
          "textColor",
          "backgroundColor",
        ],
        properties: {
          name: {
            type: "string",
          },
          isActive: {
            type: "string",
          },
          primaryColor: {
            type: "string",
          },
          secondaryColor: {
            type: "string",
          },
          backgroundColor: {
            type: "string",
          },
          textColor: {
            type: "string",
          },
        },
      },
    },
    preHandler: require("../hooks/auth/checkAuth.js"),
    handler: require("../handler/cud/theme/updateTheme.js"),
  });
  // ADMIN THEME DELETE
  fastify.delete("/delete-theme", {
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
    handler: require("../handler/cud/theme/deleteTheme.js"),
  });
  // theme route end
  //  ADMIN HOBBIE ADD ROUTE
  fastify.post("/add-hobbie", {
    schema: {
      body: {
        type: "object",
        required: ["name", "iconClass", "description"],
        properties: {
          name: {
            type: "string",
          },
          iconClass: {
            type: "string",
          },
          description: {
            type: "string",
          },
        },
      },
    },
    preHandler: require("../hooks/auth/checkAuth.js"),
    handler: require("../handler/cud/hobbie/addHobbie.js"),
  });
  // ADMIN HOBBIE UPDATE ROUTE
  fastify.put("/update-hobbie", {
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
        required: ["name", "iconClass", "description"],
        properties: {
          name: {
            type: "string",
          },
          iconClass: {
            type: "string",
          },
          description: {
            type: "string",
          },
        },
      },
    },
    preHandler: require("../hooks/auth/checkAuth.js"),
    handler: require("../handler/cud/hobbie/updateHobbie.js"),
  });
  // ADMIN HOBBIE DELETE ROUTE
  fastify.delete("/delete-hobbie", {
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
    handler: require("../handler/cud/hobbie/deleteHobbie.js"),
  });
  // hobbie route end

  // ADMIN META ROUTE
  fastify.post("/add-meta", {
    preHandler: [
      require("../hooks/auth/checkAuth.js"),
      upload.single("meta-image"),
    ],
    handler: require("../handler/cud/meta/addMeta.js"),
  });
  // ADMIN META UPDATE ROUTE
  fastify.put("/update-meta", {
    preHandler: [
      require("../hooks/auth/checkAuth.js"),
      upload.single("meta-image"),
    ],
    handler: require("../handler/cud/meta/updateMeta.js"),
  });
  // ADMIN META DELETE
  fastify.delete("/delete-meta", {
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
    handler: require("../handler/cud/meta/deleteMeta.js"),
  });
  // meta route end
  // ADMIN CV ADD
  fastify.post("/add-cv", {
    preHandler: [
      require("../hooks/auth/checkAuth.js"),
      upload.single("cv-pdf"),
    ],
    handler: require("../handler/cud/cv/addCv.js"),
  });
  // ADMIN CV UPDATE
  fastify.put("/update-cv", {
    preHandler: [
      require("../hooks/auth/checkAuth.js"),
      upload.single("cv-pdf"),
    ],
    handler: require("../handler/cud/cv/updateCv.js"),
  });
  // ADMIN CV DELETE
  fastify.delete("/delete-cv", {
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
    handler: require("../handler/cud/cv/deleteCv.js"),
  });

  //   const cv = await Cv.find();
  //   return reply.send(cv);
  // });

  //
  done();
}
module.exports = adminRouter;
//

//
