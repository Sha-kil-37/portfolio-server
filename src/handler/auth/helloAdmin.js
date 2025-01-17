'use strict'
module.exports = async function (request, reply) {
  try {
    return reply.status(200).send({
      success: true,
      msg: "hello admin",
    });
  } catch (error) {
    return reply.status(500).send({
      success: false,
      msg: "Internal Server Error",
    });
  }
};
