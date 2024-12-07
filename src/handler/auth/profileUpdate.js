const Admin = require("../../model/admin/admin.model");

module.exports = async function (request, reply) {
  const { email } = request.headers;
  const { name, title, age, about, subTitle } = request.body;
  try {
    // FIND ADMIN
    const findAdmin = await Admin.findOne({
      email: email,
    });
    if (findAdmin === null) {
      return reply.status(400).send({
        success: false,
        msg: "Invalid Credential",
      });
    }
    await Admin.updateOne(
      {
        email: email,
      },
      {
        $set: {
          name: name,
          title: title,
          subTitle: subTitle,
          age: age,
          about: about,
        },
      }
    );
    return reply.status(200).send({
      success: true,
      msg: "Profile Update Successfully",
    });
  } catch (error) {
    return reply.status(500).send({
      success: false,
      msg: "Internal Server Error",
    });
  }
};
