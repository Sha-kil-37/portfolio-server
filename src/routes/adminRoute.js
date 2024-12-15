const upload = require("../utils/multer/multer.js");
const checkSignUp = require("../hooks/auth/checkSignUp.js");
const signUp = require("../handler/auth/signUp.js");
const checkSignIn = require("../hooks/auth/checkSignIn.js");
const signIn = require("../handler/auth/signIn.js");
const checkForgotPassEmailVerify = require("../hooks/auth/checkForgotPassEmailVerify.js");
const forgotPasswordEmailVerify = require("../handler/auth/forgotPasswordEmailVerify.js");
const checkForgotPassCodeVerification = require("../hooks/auth/checkForgotPassCodeVerification.js");
const forgotPassCodeVerification = require("../handler/auth/forgotPassCodeVerification.js");
const checkAuth = require("../hooks/auth/checkAuth.js");
const changePass = require("../handler/auth/changePass.js");
const changeProfile = require("../handler/auth/profileUpload.js");
const profileUpdate = require("../handler/auth/profileUpdate.js");
const addSkill = require("../handler/cud/skill/addSkill.js");
const updateSkill = require("../handler/cud/skill/updateSkill.js");
const deleteSkill = require("../handler/cud/skill/deleteSkill.js");
const addProject = require("../handler/cud/project/addProject.js");
const updateProject = require("../handler/cud/project/updateProject.js");
const deleteProject = require("../handler/cud/project/deleteProject");
const addFooter = require("../handler/cud/footer/addFooter.js");
const updateFooter = require("../handler/cud/footer/updateFooter.js");
const deleteFooter = require("../handler/cud/footer/deleteFooter.js");
const addExperience = require("../handler/cud/experience/addExperience.js");
const updateExperience = require("../handler/cud/experience/updateExperience.js");
const deleteExperience = require("../handler/cud/experience/deleteExperience.js");
const addEducation = require("../handler/cud/education/addEducation.js");
const updateEducation = require("../handler/cud/education/updateEducation.js");
const deleteEducation = require("../handler/cud/education/deleteEducation.js");
const addBlog = require("../handler/cud/blog/addBlog.js");
const updateBlog = require("../handler/cud/blog/updateBlog.js");
const deleteBlog = require("../handler/cud/blog/deleteBlog.js");
const addTheme = require("../handler/cud/theme/addTheme.js");
const updateTheme = require("../handler/cud/theme/updateTheme.js");
const deleteTheme = require("../handler/cud/theme/deleteTheme.js");
const addHobbie = require("../handler/cud/hobbie/addHobbie.js");
const updateHobbie = require("../handler/cud/hobbie/updateHobbie.js");
const deleteHobbie = require("../handler/cud/hobbie/deleteHobbie.js");
const addMeta = require("../handler/cud/meta/addMeta.js");
const updateMeta = require("../handler/cud/meta/updateMeta.js");
const deleteMeta = require("../handler/cud/meta/deleteMeta.js");
const addCv = require("../handler/cud/cv/addCv.js");
const updateCv = require("../handler/cud/cv/updateCv.js");
const deleteCv = require("../handler/cud/cv/deleteCv.js");
const helloAdmin = require("../handler/auth/helloAdmin.js");
//
function adminRouter(fastify, options, done) {
  // ADMIN WELCOME ROUTE
  fastify.get("/", helloAdmin);

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
    preHandler: checkSignUp,
    handler: signUp,
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
    preHandler: checkSignIn,
    handler: signIn,
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
    preHandler: checkForgotPassEmailVerify,
    handler: forgotPasswordEmailVerify,
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
    preHandler: checkForgotPassCodeVerification,
    handler: forgotPassCodeVerification,
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
    preHandler: checkAuth,
    handler: changePass,
  });
  // ADMIN PROFILE CHANGE
  fastify.patch("/profile-upload", {
    preHandler: [checkAuth, upload.array("profiles", 3)],
    handler: changeProfile,
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
    preHandler: checkAuth,
    handler: profileUpdate,
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
    preHandler: checkAuth,
    handler: addSkill,
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
    preHandler: checkAuth,
    handler: updateSkill,
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
    preHandler: checkAuth,
    handler: deleteSkill,
  });
  // skill route end
  // ADMIN PROJECT ADD ROUTE
  fastify.post("/add-project", {
    preHandler: [checkAuth, upload.array("projects", 10)],
    handler: addProject,
  });
  // ADMIN PROJECT UPDATE ROUTE
  fastify.put("/update-project", {
    preHandler: [checkAuth, upload.array("projects", 10)],
    handler: updateProject,
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
    preHandler: checkAuth,
    handler: deleteProject,
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
    preHandler: checkAuth,
    handler: addFooter,
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
    preHandler: checkAuth,
    handler: updateFooter,
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
    preHandler: checkAuth,
    handler: deleteFooter,
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
    preHandler: checkAuth,
    handler: addExperience,
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
    preHandler: checkAuth,
    handler: updateExperience,
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
    preHandler: checkAuth,
    handler: deleteExperience,
  });
  // experience route end
  // ADMIN EDUCATION ADD ROUTE
  fastify.post("/add-education", {
    preHandler: [checkAuth, upload.single("education-image")],
    handler: addEducation,
  });
  // ADMIN EDUCATION UPDATE ROUTE
  fastify.put("/update-education", {
    preHandler: [checkAuth, upload.single("education-image")],
    handler: updateEducation,
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
    preHandler: checkAuth,
    handler: deleteEducation,
  });
  // education route end
  // ADMIN BLOG ADD ROUTE
  fastify.post("/add-blog", {
    preHandler: [checkAuth, upload.single("blog-image")],
    handler: addBlog,
  });
  // ADMIN  BLOG UPDATE ROUTE
  fastify.put("/update-blog", {
    preHandler: [checkAuth, upload.single("blog-image")],
    handler: updateBlog,
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
    preHandler: checkAuth,
    handler: deleteBlog,
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
    preHandler: checkAuth,
    handler: addTheme,
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
    preHandler: checkAuth,
    handler: updateTheme,
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
    preHandler: checkAuth,
    handler: deleteTheme,
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
    preHandler: checkAuth,
    handler: addHobbie,
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
    preHandler: checkAuth,
    handler: updateHobbie,
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
    preHandler: checkAuth,
    handler: deleteHobbie,
  });
  // hobbie route end

  // ADMIN META ROUTE
  fastify.post("/add-meta", {
    preHandler: [checkAuth, upload.single("meta-image")],
    handler: addCv,
  });
  // ADMIN META UPDATE ROUTE
  fastify.put("/update-meta", {
    preHandler: [checkAuth, upload.single("meta-image")],
    handler: updateMeta,
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
    preHandler: checkAuth,
    handler: deleteMeta,
  });
  // meta route end
  // ADMIN CV ADD
  fastify.post("/add-cv", {
    preHandler: [checkAuth, upload.single("cv-pdf")],
    handler: addCv,
  });
  // ADMIN CV UPDATE
  fastify.put("/update-cv", {
    preHandler: [checkAuth, upload.single("cv-pdf")],
    handler: updateCv,
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
    preHandler: checkAuth,
    handler: deleteCv,
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
