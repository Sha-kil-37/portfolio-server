const Admin = require("../model/admin/admin.model");
module.exports = async function (request, reply) {
  try {
    const newAdmin = new Admin(request.body);
    await newAdmin.save();
    return reply
      .status(201)
      .send({ success: true, msg: "Admin Created Successfully" });
  } catch (error) {
    if (error.code === 11000) {
      return reply
        .status(400)
        .send({ success: false, msg: "Duplicate Email Error" });
    } else {
      return reply
        .status(500)
        .send({ success: false, msg: "Internal Server Error" });
    }
  }
};
