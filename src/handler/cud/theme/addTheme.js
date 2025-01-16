const Theme = require("../../../model/theme/theme.model");
//
module.exports = async function (request, reply) {
  //
  const { email } = request.headers;
  const {
    name,
    isActive,
    primaryColor,
    secondaryColor,
    backgroundColor,
    textColor,
  } = request.body;
  //
  try {
    const findExistTheme = await Theme.findOne({
      user: email,
      name: name,
    });
    if (findExistTheme !== null) {
      return reply.status(400).send({
        success: false,
        msg: "Theme Already Exist",
      });
    }
    const newTheme = new Theme({
      name: name,
      isActive: isActive,
      primaryColor: primaryColor,
      secondaryColor: secondaryColor,
      backgroundColor: backgroundColor,
      textColor: textColor,
      user: email,
    });
    await newTheme.save();
    return reply
      .status(201)
      .send({ success: true, msg: "Theme Add Successfully" });
  } catch (error) {
    return reply
      .status(500)
      .send({ success: false, msg: "Internal Server Error" });
  }
};
