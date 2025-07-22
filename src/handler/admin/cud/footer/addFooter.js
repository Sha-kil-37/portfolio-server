"use strict";
const Footer = require("../../../../model/footer/footer.model");
//
module.exports = async function (request, reply) {
  const { email } = request.headers;
  const {
    contactInfo,
    socialLinks,
    copyrightText,
    addressMap,
    version,
    releaseDate,
    logo,
  } = request.body;
  //
  try {
    const findExistFooter = await Footer.findOne({
      user: email,
    });
    if (findExistFooter !== null) {
      return reply.status(400).send({
        success: false,
        msg: "Footer Already Exist",
      });
    }
    const newFooter = new Footer({
      contactInfo: contactInfo,
      socialLinks: socialLinks,
      addressMap: addressMap,
      copyrightText: copyrightText,
      user: email,
      version: version,
      logo: logo,
      releaseDate: releaseDate,
    });
    await newFooter.save();
    return reply.status(201).send({
      success: true,
      msg: "Add Footer Successfully",
    });
  } catch (error) {
    console.log("Error in add footer", error);
    return reply.status(500).send({
      success: false,
      msg: "Internal Server Error",
    });
  }
};
