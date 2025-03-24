"use strict";
// 
const { version } = require("mongoose");

//
function adminRouter(fastify, options, done) {
  // ADMIN WELCOME ROUTE
  fastify.get("/", require("../handler/admin/auth/helloAdmin.js"));

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
    preHandler: require("../hooks/admin/auth/checkSignUp.js"),
    handler: require("../handler/admin/auth/signUp.js"),
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
    preHandler: require("../hooks/admin/auth/checkSignIn.js"),
    handler: require("../handler/admin/auth/signIn.js"),
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
    preHandler: require("../hooks/admin/auth/checkForgotPassEmailVerify.js"),
    handler: require("../handler/admin/auth/forgotPasswordEmailVerify.js"),
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
    preHandler: require("../hooks/admin/auth/checkForgotPassCodeVerification.js"),
    handler: require("../handler/admin/auth/forgotPassCodeVerification.js"),
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
    preHandler: require("../hooks/admin/auth/checkAuth.js"),
    handler: require("../handler/admin/auth/changePass.js"),
  });
  // ADMIN PROFILE CHANGE
  fastify.patch("/profile-upload", {
    preHandler: [
      require("../hooks/admin/auth/checkAuth.js"),
      require("../utils/multer/multer.js").array("profiles", 6),
    ],
    handler: require("../handler/admin/auth/profileUpload.js"),
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
            type: "array",
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
    preHandler: require("../hooks/admin/auth/checkAuth.js"),
    handler: require("../handler/admin/auth/profileUpdate.js"),
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
    preHandler: require("../hooks/admin/auth/checkAuth.js"),
    handler: require("../handler/admin/cud/skill/addSkill.js"),
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
    preHandler: require("../hooks/admin/auth/checkAuth.js"),
    handler: require("../handler/admin/cud/skill/updateSkill.js"),
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
    preHandler: require("../hooks/admin/auth/checkAuth.js"),
    handler: require("../handler/admin/cud/skill/deleteSkill.js"),
  });
  // skill route end
  // ADMIN PROJECT ADD ROUTE
  fastify.post("/add-project", {
    preHandler: [
      require("../hooks/admin/auth/checkAuth.js"),
      require("../utils/multer/multer.js").array("projects", 10),
    ],
    handler: require("../handler/admin/cud/project/addProject.js"),
  });
  // ADMIN PROJECT UPDATE ROUTE
  fastify.put("/update-project", {
    preHandler: [
      require("../hooks/admin/auth/checkAuth.js"),
      require("../utils/multer/multer.js").array("projects", 10),
    ],
    handler: require("../handler/admin/cud/project/updateProject.js"),
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
    preHandler: require("../hooks/admin/auth/checkAuth.js"),
    handler: require("../handler/admin/cud/project/deleteProject"),
  });
  // project route end
  // ADMIN FOOTER ADD ROUTE
  fastify.post("/add-footer", {
    schema: {
      body: {
        type: "object",
        required: ["contactInfo", "addressMap", "socialLinks", "copyrightText","version","releaseDate"],
        properties: {
         version: { type: "string" },
         releaseDate: { type: "string" },
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
          addressMap: { type: "string" },
          copyrightText: { type: "string" },
        },
      },
    },
    preHandler: require("../hooks/admin/auth/checkAuth.js"),
    handler: require("../handler/admin/cud/footer/addFooter.js"),
  });
  // ADMIN FOOTER UPDATE ROUTE
  fastify.put("/update-footer", {
    schema: {
      body: {
        type: "object",
        required: ["contactInfo", "socialLinks", "addressMap", "copyrightText","version","releaseDate"],
        properties: {
          version: { type: "string" },
          releaseDate: { type: "string" },
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
          addressMap: { type: "string" },
          copyrightText: { type: "string" },
        },
      },
    },
    preHandler: require("../hooks/admin/auth/checkAuth.js"),
    handler: require("../handler/admin/cud/footer/updateFooter.js"),
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
    preHandler: require("../hooks/admin/auth/checkAuth.js"),
    handler: require("../handler/admin/cud/footer/deleteFooter.js"),
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
    preHandler: require("../hooks/admin/auth/checkAuth.js"),
    handler: require("../handler/admin/cud/experience/addExperience.js"),
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
    preHandler: require("../hooks/admin/auth/checkAuth.js"),
    handler: require("../handler/admin/cud/experience/updateExperience.js"),
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
    preHandler: require("../hooks/admin/auth/checkAuth.js"),
    handler: require("../handler/admin/cud/experience/deleteExperience.js"),
  });
  // experience route end
  // ADMIN EDUCATION ADD ROUTE
  fastify.post("/add-education", {
    preHandler: [
      require("../hooks/admin/auth/checkAuth.js"),
      require("../utils/multer/multer.js").single("education-image"),
    ],
    handler: require("../handler/admin/cud/education/addEducation.js"),
  });
  // ADMIN EDUCATION UPDATE ROUTE
  fastify.put("/update-education", {
    preHandler: [
      require("../hooks/admin/auth/checkAuth.js"),
      require("../utils/multer/multer.js").single("education-image"),
    ],
    handler: require("../handler/admin/cud/education/updateEducation.js"),
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
    preHandler: require("../hooks/admin/auth/checkAuth.js"),
    handler: require("../handler/admin/cud/education/deleteEducation.js"),
  });
  // education route end
  // ADMIN BLOG ADD ROUTE
  fastify.post("/add-blog", {
    preHandler: [
      require("../hooks/admin/auth/checkAuth.js"),
      require("../utils/multer/multer.js").single("blog-image"),
    ],
    handler: require("../handler/admin/cud/blog/addBlog.js"),
  });
  // ADMIN  BLOG UPDATE ROUTE
  fastify.put("/update-blog", {
    preHandler: [
      require("../hooks/admin/auth/checkAuth.js"),
      require("../utils/multer/multer.js").single("blog-image"),
    ],
    handler: require("../handler/admin/cud/blog/updateBlog.js"),
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
    preHandler: require("../hooks/admin/auth/checkAuth.js"),
    handler: require("../handler/admin/cud/blog/deleteBlog.js"),
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
    preHandler: require("../hooks/admin/auth/checkAuth.js"),
    handler: require("../handler/admin/cud/theme/addTheme.js"),
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
    preHandler: require("../hooks/admin/auth/checkAuth.js"),
    handler: require("../handler/admin/cud/theme/updateTheme.js"),
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
    preHandler: require("../hooks/admin/auth/checkAuth.js"),
    handler: require("../handler/admin/cud/theme/deleteTheme.js"),
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
    preHandler: require("../hooks/admin/auth/checkAuth.js"),
    handler: require("../handler/admin/cud/hobbie/addHobbie.js"),
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
    preHandler: require("../hooks/admin/auth/checkAuth.js"),
    handler: require("../handler/admin/cud/hobbie/updateHobbie.js"),
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
    preHandler: require("../hooks/admin/auth/checkAuth.js"),
    handler: require("../handler/admin/cud/hobbie/deleteHobbie.js"),
  });
  // hobbie route end
  // ADMIN META ROUTE
  fastify.post("/add-meta", {
    preHandler: [
      require("../hooks/admin/auth/checkAuth.js"),
      require("../utils/multer/multer.js").single("meta-image"),
    ],
    handler: require("../handler/admin/cud/meta/addMeta.js"),
  });
  // ADMIN META UPDATE ROUTE
  fastify.put("/update-meta", {
    preHandler: [
      require("../hooks/admin/auth/checkAuth.js"),
      require("../utils/multer/multer.js").single("meta-image"),
    ],
    handler: require("../handler/admin/cud/meta/updateMeta.js"),
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
    preHandler: require("../hooks/admin/auth/checkAuth.js"),
    handler: require("../handler/admin/cud/meta/deleteMeta.js"),
  });
  // meta route end
  // ADMIN CV ADD
  fastify.post("/add-cv", {
    preHandler: [
      require("../hooks/admin/auth/checkAuth.js"),
      require("../utils/multer/multer.js").single("cv-pdf"),
    ],
    handler: require("../handler/admin/cud/cv/addCv.js"),
  });
  // ADMIN CV UPDATE
  fastify.put("/update-cv", {
    preHandler: [
      require("../hooks/admin/auth/checkAuth.js"),
      require("../utils/multer/multer.js").single("cv-pdf"),
    ],
    handler: require("../handler/admin/cud/cv/updateCv.js"),
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
    preHandler: require("../hooks/admin/auth/checkAuth.js"),
    handler: require("../handler/admin/cud/cv/deleteCv.js"),
  });
  //ADMIN TOOL ADD ROUTE
  fastify.post("/add-tool", {
    schema: {
      body: {
        type: "object",
        required: ["toolName", "iconClass"],
        properties: {
          toolName: {
            type: "string",
          },
          iconClass: {
            type: "string",
          },
        },
      },
    },
    preHandler: require("../hooks/admin/auth/checkAuth.js"),
    handler: require("../handler/admin/cud/tool/addTool.js"),
  });
  // ADMIN TOOL UPDATE ROUTE
  fastify.put("/update-tool", {
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
        required: ["toolName", "iconClass"],
        properties: {
          toolName: {
            type: "string",
          },
          iconClass: {
            type: "string",
          },
        },
      },
    },
    preHandler: require("../hooks/admin/auth/checkAuth.js"),
    handler: require("../handler/admin/cud/tool/updateTool.js"),
  });
  // ADMIN TOOL DELETE ROUTE
  fastify.delete("/delete-tool", {
    schema: {
      querystring: {
        type: "object",
        properties: {
          id: { type: "string" },
        },
        required: ["id"], // Ensure 'id' is provided
      },
    },
    preHandler: require("../hooks/admin/auth/checkAuth.js"),
    handler: require("../handler/admin/cud/tool/deleteTool.js"),
  });
  // tool route end
  // ADMIN SERVICE ADD ROUTE
  fastify.post("/add-service", {
    preHandler: [
      require("../hooks/admin/auth/checkAuth.js"),
      require("../utils/multer/multer.js").single("service-image"),
    ],
    handler: require("../handler/admin/cud/service/addService.js"),
  });

  // ADMIN SERVICE UPDATE ROUTE
  fastify.put("/update-service", {
    preHandler: [
      require("../hooks/admin/auth/checkAuth.js"),
      require("../utils/multer/multer.js").single("service-image"),
    ],
    handler: require("../handler/admin/cud/service/updateService.js"),
  });
  // ADMIN SERVICE DELETE ROUTE
  fastify.delete("/delete-service", {
    schema: {
      querystring: {
        type: "object",
        properties: {
          id: { type: "string" },
        },
        required: ["id"], // Ensure 'id' is provided
      },
    },
    preHandler: require("../hooks/admin/auth/checkAuth.js"),
    handler: require("../handler/admin/cud/service/deleteService.js"),
  });

  // service route end

  done();
}
module.exports = adminRouter;
//

//
