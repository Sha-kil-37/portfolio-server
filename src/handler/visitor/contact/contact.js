// contact handler
"use strict";
require("dotenv").config();
const {
  contactFormSubmitTemplate,
} = require("../../../config/mail/mailTemplate");
const {
  sendContactFormSubmitEmail,
} = require("../../../utils/mailSender/mailSender");
//
module.exports = async function (request, reply) {
  //
  const { name, email, message } = request.body;
  try {
    const html = contactFormSubmitTemplate
      .replace("{name}", name)
      .replace("{email}", email)
      .replace("{message}", message)
      .replace(/{portfolioLink}/g, "http://localhost:8000/portfolio/api/v1");
    await sendContactFormSubmitEmail(
      process.env.OWNER_GMAIL,
      "New Message from Portfolio",
      "Hello text",
      html
    );
    return reply
      .status(200)
      .send({ success: true, msg: "Form Submit Successfully" });
  } catch (error) {
    return reply.status(500).send({
      success: false,
      msg: "Internal Server Error",
    });
  }
};
